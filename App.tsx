
// plugins
import { StatusBar, StyleSheet, useColorScheme, View, Text, SafeAreaView, } from 'react-native';
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// components
import HomeBottomTab from './src/pages/HomeBottomTab'
import Home from './src/pages/Home'
import User from './src/pages/User'

// data
import { STATUS_BAR_HEIGHT } from './src/utils'

function App() {

  // 获取暗黑、明亮模式
  const isDarkMode = useColorScheme() === 'dark';

  // 创建 Stack
  const Stack = createNativeStackNavigator()




  // useEffect(() => {
  //   console.log('相关数据', WINDOW_WIDTH,
  //     WINDOW_HEIGHT,
  //     STATUS_BAR_HEIGHT)

  // }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={[styles.safeArea]}>

      </SafeAreaView>


      {/* <Text style={{ backgroundColor: 'red' }}>测试文字</Text> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeBottomTab'>
          <Stack.Screen component={HomeBottomTab} name='HomeBottomTab' options={{ headerShown: false }} />
          {/* <Stack.Screen component={Home} name='Home' options={{ title: 'Home' }} /> */}
          {/* <Stack.Screen component={User} name='User' options={{ title: 'User' }} /> */}
        </Stack.Navigator>

      </NavigationContainer>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    marginTop: STATUS_BAR_HEIGHT,
    // borderBottomColor: 'red',
    // borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default App;
