
// plugins
import { StatusBar, StyleSheet, useColorScheme, View, Text, SafeAreaView, } from 'react-native';
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// components
import LoginPage from '@/pages/Login'
import HomeBottomTab from '@/pages/HomeBottomTab'
import Home from '@/pages/ProductManagement'
import User from '@/pages/User'

// custom -- components
import CustomStatusBarEle from '@/components/CustomStatusBarEle'

// data
import { navigationRef,WINDOW_HEIGHT, STATUS_BAR_HEIGHT } from './src/utils'

function App() {

  // 获取暗黑、明亮模式
  const isDarkMode = useColorScheme() === 'dark';

  // 创建 Stack
  const Stack = createNativeStackNavigator()




  useEffect(() => {
    // console.log('相关数据',
    //   WINDOW_WIDTH,
    //   WINDOW_HEIGHT,
    //   STATUS_BAR_HEIGHT)
  }, [])

  return (
    <View style={styles.container}>
      {/* 顶部导航栏 -- 还需要设置展示内容的高度，不然其内容实际上占满了整屏高度 */}
      <CustomStatusBarEle />
      <View style={styles.routerContainer}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName='HomeBottomTab'>
            <Stack.Screen component={LoginPage} name="LoginPage" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen component={HomeBottomTab} name='HomeBottomTab' options={{ headerShown: false }} />
            {/* <Stack.Screen component={Home} name='Home' options={{ title: 'Home' }} /> */}
            {/* <Stack.Screen component={User} name='User' options={{ title: 'User' }} /> */}
          </Stack.Navigator>

        </NavigationContainer>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  routerContainer: {
    flex: 1,
    paddingTop:  STATUS_BAR_HEIGHT
  }
});

export default App;
