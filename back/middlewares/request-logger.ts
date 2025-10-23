import { Context } from 'koa';

export default (config, { strapi }) => {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now();

    await next();

    const ms = Date.now() - start;
    const status = ctx.status;
    const method = ctx.method;
    const url = ctx.url;

    // Loga requisições no console e no Strapi logger
    strapi.log.info(`[${status}] ${method} ${url} - ${ms}ms`);
  };
};
