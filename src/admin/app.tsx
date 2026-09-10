import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
  },
  register(app: StrapiApp) {
    // Intercept and remove marketplace permissions to completely remove it from admin navigation
    app.addRBACMiddleware(() => (next) => async (permissions) => {
      const nextPermissions = await next(permissions);
      return nextPermissions.filter(
        (perm) => !perm.action?.includes('marketplace')
      );
    });
  },
};
