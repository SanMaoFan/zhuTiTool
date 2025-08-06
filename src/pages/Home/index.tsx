// plugins
import { Text, View, ScrollView, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, ReactNode } from 'react'

// components
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
      SharedValue,
      useAnimatedStyle,
} from 'react-native-reanimated';


// data
import {
      WINDOW_WIDTH,
      WINDOW_HEIGHT
} from '../../utils'

// 渲染列表右侧按钮
function RenderListRightEle(prog: SharedValue<number>, drag: SharedValue<number>) {
      const styleAnimation = useAnimatedStyle(() => {
            return {
                  transform: [{ translateX: drag.value + 48 }],
            }
      })
      return <Reanimated.View style={styleAnimation}>
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', paddingHorizontal: 10 }}>
                  <TouchableOpacity>
                        <Text style={{ color: 'white' }} onPress={() => { console.log(`点击了按钮`) }}>
                              删除
                        </Text>
                  </TouchableOpacity>
            </View>
      </Reanimated.View>
}


export default function Home({ navigation }) {


      // 分类列表
      const [assortList, setAssortList] = useState([
            {
                  name: '测试1',
                  key: 'test1'
            }, {
                  name: '测试2',
                  key: 'test2'
            }, {
                  name: '测试3',
                  key: 'test3'
            }, {
                  name: '测试4',
                  key: 'test4'
            }, {
                  name: '测试5',
                  key: 'test5'
            }, {
                  name: '测试6',
                  key: 'test6'
            }, {
                  name: '测试7',
                  key: 'test7'
            }, {
                  name: '测试8',
                  key: 'test8'
            }, {
                  name: '测试9',
                  key: 'test9'
            }, {
                  name: '测试10',
                  key: 'test10'
            }, {
                  name: '测试11',
                  key: 'test11'
            }, {
                  name: '测试12',
                  key: 'test12'
            }, {
                  name: '测试13',
                  key: 'test13'
            }
      ])

      // 商品列表
      const [productList, setProductList] = useState([{
            name: '测试1',
            key: 'test1'
      }, {
            name: '测试2',
            key: 'test2'
      }, {
            name: '测试3',
            key: 'test3'
      }, {
            name: '测试4',
            key: 'test4'
      }, {
            name: '测试5',
            key: 'test5'
      }, {
            name: '测试6',
            key: 'test6'
      }, {
            name: '测试7',
            key: 'test7'
      }, {
            name: '测试8',
            key: 'test8'
      }, {
            name: '测试9',
            key: 'test9'
      }, {
            name: '测试10',
            key: 'test10'
      }, {
            name: '测试11',
            key: 'test11'
      }, {
            name: '测试12',
            key: 'test12'
      }, {
            name: '测试13',
            key: 'test13'
      }])



      return (
            <View style={styles.container}>

                  {/* 左侧分类 */}
                  <ScrollView style={styles.assortContainer}>
                        {
                              assortList.map(item => {
                                    return <View style={styles.assortItem} key={item.key}>
                                          <Text>{item.name}</Text>
                                    </View>
                              })
                        }
                  </ScrollView>
                  {/* <Button title="点击" onPress={() => navigation.navigate('User')} /> */}
                  {/* <Text style={{ backgroundColor: 'red' }}>Home页面</Text> */}

                  {/* 右侧物品栏 */}
                  <ScrollView style={styles.productsContainer}>
                        {
                              productList.map(item => (<GestureHandlerRootView key={item.key}>
                                    <ReanimatedSwipeable
                                          friction={2}
                                          rightThreshold={20}
                                          renderRightActions={RenderListRightEle}
                                    >
                                          <View style={styles.productItem} key={item.key}>
                                                <Text style={styles.productItem_text}>{item.name}</Text>
                                          </View>
                                    </ReanimatedSwipeable>
                              </GestureHandlerRootView>))
                        }



                  </ScrollView>

            </View>
      )


}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            flexDirection: 'row'
      },
      assortContainer: {
            width: WINDOW_WIDTH * (3 / 11),
            borderRightColor: 'gray',
            borderRightWidth: StyleSheet.hairlineWidth
      },
      assortItem: {
            height: 100,
            width: WINDOW_WIDTH * (3 / 11),
            flexBasis: WINDOW_WIDTH * (3 / 11),
            flexGrow: 0,
            flexShrink: 0,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 16,
            color: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: 'gray'
      },
      productsContainer: {
            // backgroundColor: 'tomato',
            width: WINDOW_WIDTH * (8 / 11),
            flexBasis: WINDOW_WIDTH * (8 / 11),
            flexGrow: 1,
            flexShrink: 0,
      },
      productItem: {
            height: 50,
            borderBottomColor: 'tomato',
            borderBottomWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
            alignItems: 'center'
      },
      'productItem_text': {
            fontSize: 18,

      }
})
