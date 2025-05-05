module.exports = {
  devServer: {
    allowedHosts: 'all',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4500',
        changeOrigin: true,
      },
    },
  },
};