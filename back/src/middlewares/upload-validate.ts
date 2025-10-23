/**
 * Middleware factory para validação de uploads
 * Exporta uma função que retorna o middleware (padrão Strapi)
 */
const ALLOWED_MIMES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const MAX_BYTES = 64 * 1024 * 1024; // 64MB

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Only intercept multipart/form-data uploads
    const contentType = ctx.request.header['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return await next();
    }

    // Strapi exposes uploaded files in ctx.request.files (busboy / koa-body)
    const files = (ctx.request as any).files || (ctx.request as any).body?.files;

    if (!files) return await next();

    const iterateFiles = (f: any) => {
      if (Array.isArray(f)) return f;
      return [f];
    };

    for (const key of Object.keys(files)) {
      const fileList = iterateFiles(files[key]);
      for (const file of fileList) {
        const mime = file.type || file.mimetype || file.mime;
        const size = file.size || file.sizeBytes || file.fileSize;

        if (!mime || !ALLOWED_MIMES.has(mime)) {
          ctx.status = 400;
          ctx.body = { error: 'Invalid file type. Allowed: pdf, jpg, png, webp.' };
          return;
        }

        if (size && size > MAX_BYTES) {
          ctx.status = 413;
          ctx.body = { error: 'File too large. Max size is 64MB.' };
          return;
        }
      }
    }

    await next();
  };
};
