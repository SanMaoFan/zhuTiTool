// plugins
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet } from 'react-native'

// components
import Home from '../Home'
import User from '../User'


export default function HomeBottomTab() {

      // 创建底部导航
      const BottomTabNavigationCom = createBottomTabNavigator()

      return <View style={styles.container}>
            <BottomTabNavigationCom.Navigator initialRouteName='Home'>
                  <BottomTabNavigationCom.Screen name="Home" component={Home} options={{
                        tabBarLabel: '首页',
                        headerShown: false
                  }} />
                  <BottomTabNavigationCom.Screen name="User" component={User} options={{
                        tabBarLabel: '用户中心',
                        headerShown: false
                  }} />
            </BottomTabNavigationCom.Navigator>
      </View>
}
const styles = StyleSheet.create({
      container: {
            flex: 1,
      }
})