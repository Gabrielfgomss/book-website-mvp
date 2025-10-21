export default [
  'strapi::logger',
  'strapi::errors',
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
        'http://localhost:5173', // Frontend dev
        'http://localhost:5174', // Frontend dev (alternative port)
        'http://127.0.0.1:5173', // Frontend dev (127.0.0.1)
        'http://127.0.0.1:5174', // Frontend dev (127.0.0.1 alternative port)
        'http://localhost:3000', // Alternative frontend port
        process.env.CLIENT_URL, // Production frontend URL
      ].filter(Boolean), // Remove undefined values
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
