module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

/*
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
*/