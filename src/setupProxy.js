const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://comwooauthsystem.herokuapp.com',
      changeOrigin: true,
    })
  );
};
