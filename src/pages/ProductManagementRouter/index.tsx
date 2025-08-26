
// plugins
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from 'react'

// components
// 物品管理组件
import ProductManagement from '../ProductManagement'
// 分类管理
import TypeManagement from '../TypeManagement'




export default function ProductManagementRouter() {

      // 创建 Stack
      const Stack = createNativeStackNavigator()

      // 路由数据
      const [routerData] = useState([
            {
                  // 物品管理首页
                  name: 'ProductManagement',
                  component: ProductManagement,
                  options: {
                        headerShown: false
                  }

            },
            {
                  // 分类管理页面
                  name: 'TypeManagement',
                  component: TypeManagement,
                  options: {
                        headerShown: false
                  }
            }

      ])


      return (
            <>
                  <Stack.Navigator initialRouteName="ProductManagement">
                        {
                              routerData.map(item => {
                                    return <Stack.Screen
                                          key={item.name}
                                          {...item}
                                          component={item.component}
                                          name={item.name}
                                    ></Stack.Screen>
                              })
                        }
                  </Stack.Navigator>
            </>
      )
}