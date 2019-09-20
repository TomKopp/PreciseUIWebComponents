module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV === 'production');

  const presets = [
    '@babel/env'
    , '@babel/typescript'
  ];
  const plugins = [
    '@babel/plugin-proposal-numeric-separator'
    , ['@babel/plugin-proposal-decorators', { 'decoratorsBeforeExport': true }]
    , '@babel/plugin-proposal-class-properties'
    , '@babel/plugin-proposal-object-rest-spread'
  ];

  return {
    presets
    , plugins
  };
}
