// const { getDefaultConfig } = require('@expo/metro-config');

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//     },
//   };
// })();

// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
//   },
// };
// const { getDefaultConfig } = require('@expo/metro-config');
// const { resolver: { sourceExts, assetExts } } = getDefaultConfig(__dirname);

// module.exports = async function() {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig(__dirname);
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//     },
//   };
// };
// const { getDefaultConfig } = require('@expo/metro-config');

// getDefaultConfig(__dirname).then(defaultConfig => {
//   module.exports = {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
//     },
//   };
// });

const { getDefaultConfig } = require('@expo/metro-config');

module.exports = ( () => {
  const {
    resolver: { sourceExts, assetExts },
  } =  getDefaultConfig(__dirname);
// console.log(resolver)
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();