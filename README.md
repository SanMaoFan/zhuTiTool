## 项目简介

使用 react-native 开发的移动端项目，命名为猪蹄工具，当前包含以下功能：

- 个人物品收纳

## nodejs 开发版本

v18.19.1

## 遇到的问题

- <del>在想使用滑动列表出现删除按钮的组件 react-native-gesture-handler 时，想一起安装 react-native-reanimated 依赖，如果没有设置 react-native-reanimated 版本号，默认安装了 2.x 版本，当前开发 react-native 版本为 0.80.2，在启动项目时，启动会提示失败，如果把 react-native-reanimated 依赖升级为 3.18.0 版本，启动就没问题</del>

- 推翻第一条问题，当使用 GestureHandlerRootView（react-native-gesture-handler）、
  ReanimatedSwipeable（react-native-gesture-handler/ReanimatedSwipeable）、
  Reanimated（react-native-reanimated）
  来做滑动条时，会提示：cannot read property makemutable of undefined，当前按解决方案来做：https://github.com/software-mansion/react-native-reanimated/discussions/5511
  具体版本为： "react-native-gesture-handler": "^2.16.2", "react-native-reanimated": "3.18.0"。

## 开发计划

- 给分类添加编辑功能
- 给删除弹窗加入动画
