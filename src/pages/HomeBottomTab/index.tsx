// plugins
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet } from 'react-native'

// components
import ProductManagement from '../ProductManagement'
import User from '../User'


export default function HomeBottomTab() {

      // 创建底部导航
      const BottomTabNavigationCom = createBottomTabNavigator()

      return <View style={styles.container}>
            <BottomTabNavigationCom.Navigator initialRouteName='ProductManagement'>
                  <BottomTabNavigationCom.Screen name="ProductManagement" component={ProductManagement} options={{
                        tabBarLabel: '物品管理',
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