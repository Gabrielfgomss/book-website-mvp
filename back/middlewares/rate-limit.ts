import { Context } from 'koa';
import LRU from 'lru-cache';

// Simple in-memory rate limiter using LRU cache.
// Suitable for single-instance deployments (Strapi Cloud manages scaling).

const windowMs = 60 * 1000; // 1 minute
const maxRequests = 60; // 60 requests per IP per window

const cache = new LRU<string, { count: number; resetTime: number }>({
  max: 5000,
  ttl: windowMs * 5,
});

export default (config, { strapi }) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      const ip = ctx.request.ip || ctx.ip || ctx.request.header['x-forwarded-for'] || ctx.req.socket.remoteAddress;
      if (!ip) return await next();

      const key = String(ip);
      const entry = cache.get(key);
      const now = Date.now();

      if (!entry || entry.resetTime < now) {
        cache.set(key, { count: 1, resetTime: now + windowMs });
      } else {
        entry.count += 1;
        cache.set(key, entry);
        if (entry.count > maxRequests) {
          ctx.set('Retry-After', String(Math.ceil((entry.resetTime - now) / 1000)));
          ctx.status = 429;
          ctx.body = { error: 'Too many requests. Please try again later.' };
          return;
        }
      }

      await next();
    } catch (err) {
      // if anything goes wrong, don't block legit traffic
      await next();
    }
  };
};
