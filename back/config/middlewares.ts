export default [
  'strapi::logger',
  'strapi::errors',
  // Request logging middleware: captura IP, endpoint, status, duração
  {
    name: 'global::request-logger',
    config: {
      enabled: true,
    },
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'localhost:1337',
            'http://localhost:1337',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'localhost:1337',
            'http://localhost:1337',
          ],
          'frame-ancestors': [
            "'self'",
            'localhost:5173',
            'localhost:5174',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5174',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        // Development (localhost)
        'http://localhost:5173', // Frontend dev (Vite default)
        'http://localhost:5174', // Frontend dev (alternative port)
        'http://127.0.0.1:5173', // Frontend dev (127.0.0.1)
        'http://127.0.0.1:5174', // Frontend dev (127.0.0.1 alternative port)
        'http://localhost:3000', // Alternative frontend port
        
        // Production - Vercel
        'https://seu-projeto.vercel.app',
        'https://www.seu-projeto.vercel.app',
        
        // Production - Netlify (se usar)
        'https://book-mvp.netlify.app',
        'https://seu-projeto.netlify.app',
        'https://seu-projeto.netlify.com',
        
        // Production - Domínio customizado (se tiver)
        'https://seudominio.com',
        'https://www.seudominio.com',
        
        // Environment variable para URLs dinâmicas
        process.env.CLIENT_URL,
        process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
      ].filter(Boolean), // Remove undefined values
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // Rate limiting: bloqueia ataques de força bruta e abusos por IP
  {
    name: 'global::rate-limit',
    config: {
      enabled: true,
    },
  },
  // Upload validation: bloqueia tipos e tamanhos não permitidos
  {
    name: 'global::upload-validate',
    config: {
      enabled: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
