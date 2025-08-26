// plugins
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet } from 'react-native'

// components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

import ProductManagementRouter from '../ProductManagementRouter'
import User from '../User'


export default function HomeBottomTab() {

      // 共用数据
      // 导航底部文字设置
      const tabBarLabelStylePublish = {
            fontSize: 16,
            fontFamily: 'Georgia',
            fontWeight: 300,
      }
      // 导航图标设置
      const tabBarIconStyle = {
            fontSize: 20,

      }
      // 图标未选中颜色
      const iconDefaultColor = 'gray'
      // 图标选中颜色
      const activeIconColor = '#387AA8'


      // 导航渲染
      const tabBarRenderData = [
            {
                  name: "ProductManagementRouter",
                  component: ProductManagementRouter,
                  options: {
                        tabBarLabel: '物品管理',
                        tabBarLabelStyle: tabBarLabelStylePublish,
                        tabBarIcon: ({ focused }) => {
                              return <MaterialCommunityIcons name='warehouse' size={24} color={focused ? activeIconColor : iconDefaultColor} />
                        },
                        tabBarIconStyle: tabBarIconStyle,
                        tabBarActiveTintColor: activeIconColor,
                        headerShown: false
                  }
            }, {
                  name: "User",
                  component: User,
                  options: {
                        tabBarLabel: '用户中心',
                        tabBarLabelStyle: tabBarLabelStylePublish,
                        tabBarIcon: ({ focused }) => {
                              return <Feather name='user' size={24} color={focused ? activeIconColor : iconDefaultColor} />
                        },
                        tabBarIconStyle: tabBarIconStyle,
                        tabBarActiveTintColor: activeIconColor,
                        headerShown: false
                  }
            }
      ]


      // 创建底部导航
      const BottomTabNavigationCom = createBottomTabNavigator()

      return <View style={styles.container}>
            <BottomTabNavigationCom.Navigator initialRouteName='ProductManagementRouter'>
                  {
                        tabBarRenderData.map(item => {
                              return <BottomTabNavigationCom.Screen {...item} key={item.name} />
                        })
                  }

            </BottomTabNavigationCom.Navigator>
      </View>
}
const styles = StyleSheet.create({
      container: {
            flex: 1,
      }
})