// plugins
import { Text, View, ScrollView, Button, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, VirtualizedList, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useEffect, ReactNode } from 'react'

// components
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import RenderListRightEle from './components/listItemRightActions'
import HandleRootView from '../../components/HandleRootView'


// data
import {
      WINDOW_WIDTH,
      WINDOW_HEIGHT
} from '../../utils'




/**
 * 开发计划
 * - 完成列表中下拉、上拉刷新功能
 * - 完善点击分类切换列表功能
 * - 开发点击列表展示详情功能
 * - 完善列表删除功能（删除后，怎么恢复数据共条数和分页的关系？）
 */

export default function Home({ navigation }) {

      // 是否显示loading
      const [showLoading, setShowLoading] = useState(false)
      // 是否显示 modal
      const [showModal, setShowModal] = useState(false)

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
                  {/* 路由跳转 */}
                  {/* <Button title="点击" onPress={() => navigation.navigate('User')} /> */}

                  {/* loading */}
                  {showLoading && <View style={styles.loadingEle}>
                        <ActivityIndicator size='large' animating={true} ></ActivityIndicator>
                  </View>}


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


                  {/* 右侧物品栏 */}
                  <SafeAreaView style={styles.productsContainer}>
                        <VirtualizedList
                              renderItem={(info) => {
                                    // console.log('数据', info)
                                    return <HandleRootView rootKey={info.item.key}
                                          ReanimatedSwipeableConfig={{
                                                friction: 2,
                                                rightThreshold: 20,
                                                renderRightActions: RenderListRightEle
                                          }}
                                    >
                                          <TouchableOpacity onPress={() => {
                                                setShowLoading(true)
                                                setTimeout(() => {
                                                      setShowLoading(false)
                                                      setShowModal(true)
                                                }, 2000)
                                          }}>
                                                <View style={styles.productItem} key={info.item.key}>
                                                      <Text style={styles.productItem_text}>{info.item.name}</Text>
                                                </View>
                                          </TouchableOpacity>
                                    </HandleRootView>
                              }}
                              getItemCount={() => productList.length}
                              data={productList}
                              getItem={(data, index) => {
                                    return {
                                          name: data[index].name,
                                          key: data[index].key
                                    }
                              }}
                        />
                  </SafeAreaView>

                  {/* 弹窗 */}
                  <Modal animationType='slide'
                        transparent={false}
                        visible={showModal}
                  >
                        <View>
                              <Button onPress={() => setShowModal(false)} title='关闭弹窗' />

                        </View>
                  </Modal>

            </View>
      )


}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            flexDirection: 'row'
      },
      loadingEle: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
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
