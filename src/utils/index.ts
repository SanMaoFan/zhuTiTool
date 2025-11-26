import { createRef } from 'react'
import { CommonActions, type NavigationContainerRef } from '@react-navigation/native';
import Storage from './storage';

// components
import AndroidToastEle from '@/components/CustomAndroidToastEle'


import { NativeModules, Dimensions, Platform, StatusBar } from 'react-native';

// 获取状态栏管理数据
const { StatusBarManager } = NativeModules;

// 获取窗口尺寸
const WINDOW_DIMENSIONS = Dimensions.get('window');

// 路由导航 ref
export const navigationRef = createRef<NavigationContainerRef>()

// 获取窗口宽度与高度
export const WINDOW_WIDTH = WINDOW_DIMENSIONS.width;
export const WINDOW_HEIGHT = WINDOW_DIMENSIONS.height;

// 根据当前环境获取状态栏高度
export const STATUS_BAR_HEIGHT =
  'android' === Platform.OS ? StatusBar.currentHeight : StatusBarManager.HEIGHT;

// 跳转到登录页并清除相关数据
export function resetLoginHandle() {
  AndroidToastEle('用户凭证失效！')
  Storage.delete()
  setTimeout(() => {
    navigationRef.current?.dispatch(
      CommonActions.navigate({
        name: 'LoginPage'
      })
    )
  }, 1500)

}

// 产生 uuid
export const simpleUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
