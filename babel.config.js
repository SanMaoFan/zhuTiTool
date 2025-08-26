module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'], // 设置根目录
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'], // 支持的文件扩展名
        alias: {
          '@': './src', // 定义别名
        },
      },
    ],
  ],
};
