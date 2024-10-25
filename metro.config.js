const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const { assetExts, sourceExts } = defaultConfig.resolver;

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      assetExts: [...assetExts, 'png', 'jpg', 'jpeg', 'gif', 'ttf'],
      sourceExts: sourceExts,
    },
  };
})();