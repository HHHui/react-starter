const path = require('path');
const { injectBabelPlugin, getLoader } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "src/examples": path.resolve(__dirname, 'src/examples')
  }
  config = rewireLess(config, env);
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = injectBabelPlugin(['transform-decorators-legacy'], config);
  return config;
};