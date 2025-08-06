import { NativeModules, Dimensions, Platform, StatusBar } from 'react-native';

// 获取状态栏管理数据
const { StatusBarManager } = NativeModules;

// 获取窗口尺寸
const WINDOW_DIMENSIONS = Dimensions.get('window');

// 获取窗口宽度与高度
export const WINDOW_WIDTH = WINDOW_DIMENSIONS.width;
export const WINDOW_HEIGHT = WINDOW_DIMENSIONS.height;

// 根据当前环境获取状态栏高度
export const STATUS_BAR_HEIGHT =
  'android' === Platform.OS ? StatusBar.currentHeight : StatusBarManager.HEIGHT;
