import { Context } from 'koa';

/**
 * Middleware de logging de requisições com IP, endpoint, método e status.
 * 
 * Útil para monitoramento, auditoria e detecção de padrões de ataque.
 * Em produção, integrar com Sentry, Better Stack ou CloudWatch para análise centralizada.
 * 
 * Log structure:
 * {
 *   timestamp: ISO8601,
 *   ip: string,
 *   method: string,
 *   path: string,
 *   status: number,
 *   duration_ms: number,
 *   user_agent: string,
 *   referer: string
 * }
 */

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const startTime = Date.now();

    try {
      // Extrair IP do cliente (suporta proxies como Netlify, Vercel, Cloudflare)
      let forwardedFor = ctx.request.header['x-forwarded-for'];
      const firstForwardedIp = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0]
        : undefined;

      const ip =
        ctx.request.header['cf-connecting-ip'] || // Cloudflare
        firstForwardedIp || // Proxy chain
        ctx.request.header['x-real-ip'] || // Nginx/HAProxy
        ctx.request.ip ||
        ctx.ip ||
        ctx.req.socket.remoteAddress ||
        'UNKNOWN';

      // Dados da requisição
      const method = ctx.method;
      const path = ctx.url;
      const userAgent = ctx.request.header['user-agent'] || 'UNKNOWN';
      const referer = ctx.request.header['referer'] || '-';

      // Executar próximo middleware
      await next();

      // Calcular duração
      const duration = Date.now() - startTime;
      const status = ctx.status || 200;

      // Log estruturado
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info',
        ip,
        method,
        path,
        status,
        duration_ms: duration,
        user_agent: userAgent,
        referer,
      };

      // Log local (console em dev, file em prod)
      if (process.env.NODE_ENV === 'development') {
        // Em dev, usar cores no console
        const color = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
        const reset = '\x1b[0m';
        console.log(
          `${color}[${logEntry.timestamp}] ${logEntry.ip} ${logEntry.method} ${logEntry.path} ${logEntry.status} ${logEntry.duration_ms}ms${reset}`
        );
      } else {
        // Em prod, enviar para serviço de logging centralizado via HTTP
        logToRemoteService(logEntry);
      }

      // Flags para detecção de padrões suspeitos
      detectSuspiciousPatterns(logEntry);
    } catch (err) {
      // Log de erros não capturados
      const duration = Date.now() - startTime;
      console.error(`[${new Date().toISOString()}] UNCAUGHT_ERROR ${ctx.method} ${ctx.url}`, err);

      // Re-throw para deixar erro ser tratado por outro middleware
      throw err;
    }
  };
};

/**
 * Enviar logs para serviço centralizado (Sentry, Better Stack, etc)
 */
function logToRemoteService(logEntry: any) {
  // Exemplo com Sentry (descomente se usar)
  // if (typeof Sentry !== 'undefined') {
  //   Sentry.captureMessage(`[${logEntry.level}] ${logEntry.method} ${logEntry.path}`, logEntry.level);
  // }

  // Exemplo com Better Stack (descomente se usar)
  // const LOGTAIL_SOURCE_TOKEN = process.env.LOGTAIL_SOURCE_TOKEN;
  // if (LOGTAIL_SOURCE_TOKEN) {
  //   fetch('https://in.logtail.com/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ dt: logEntry.timestamp, ...logEntry, source_token: LOGTAIL_SOURCE_TOKEN }),
  //   }).catch(() => {}); // Não falhar a requisição se logging falhar
  // }

  // Exemplo com CloudWatch (AWS - descomente se usar)
  // const cloudwatch = new AWS.CloudWatch();
  // cloudwatch.putMetricData({
  //   Namespace: 'StrapiCloud',
  //   MetricData: [
  //     {
  //       MetricName: 'Requests',
  //       Value: 1,
  //       Unit: 'Count',
  //       Dimensions: [
  //         { Name: 'IP', Value: logEntry.ip },
  //         { Name: 'Method', Value: logEntry.method },
  //         { Name: 'Path', Value: logEntry.path },
  //       ],
  //     },
  //   ],
  // }, (err) => {
  //   if (err) console.error('CloudWatch error:', err);
  // });
}

/**
 * Detectar padrões suspeitos (force brute, scanning, etc)
 */
const ipRequestCounts = new Map<string, { count: number; lastReset: number }>();
const SUSPICIOUS_THRESHOLD = 50; // Requisições por minuto
const WINDOW_MS = 60 * 1000;

function detectSuspiciousPatterns(logEntry: any) {
  const ip = logEntry.ip;
  const now = Date.now();

  // Resetar contador se passou a janela
  let ipData = ipRequestCounts.get(ip);
  if (!ipData || now - ipData.lastReset > WINDOW_MS) {
    ipRequestCounts.set(ip, { count: 1, lastReset: now });
    return;
  }

  // Incrementar contador
  ipData.count += 1;
  ipRequestCounts.set(ip, ipData);

  // Alertar se ultrapassou limite
  if (ipData.count > SUSPICIOUS_THRESHOLD) {
    console.warn(`⚠️  SUSPICIOUS_PATTERN: IP ${ip} excedeu ${SUSPICIOUS_THRESHOLD} req/min (atual: ${ipData.count})`);

    // Opcional: enviar alert para Slack, Discord, email, etc
    // sendAlertToSlack(`⚠️ Possível ataque DDoS de ${ip}`);
  }

  // Detectar tentativas de login falhadas
  if (logEntry.path.includes('/admin') || logEntry.path.includes('/auth') || logEntry.path.includes('login')) {
    if (logEntry.status === 401 || logEntry.status === 403) {
      console.warn(`⚠️  FAILED_AUTH: IP ${ip} tentou acesso a ${logEntry.path} (status ${logEntry.status})`);
    }
  }

  // Detectar uploads bloqueados
  if (logEntry.path.includes('/upload') && logEntry.status === 400) {
    console.warn(`⚠️  BLOCKED_UPLOAD: IP ${ip} tentou upload inválido (${logEntry.duration_ms}ms)`);
  }
}
