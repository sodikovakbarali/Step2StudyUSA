module.exports = function override(config, env) {
  // Disable host checking
  config.devServer = {
    ...config.devServer,
    allowedHosts: 'all'
  };
  return config;
}; 