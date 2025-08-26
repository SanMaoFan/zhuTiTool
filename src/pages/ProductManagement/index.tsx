// plugins
import React, { useState, useEffect, ReactNode } from 'react'


// components
import { Text, View, ScrollView, Button, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, VirtualizedList, ActivityIndicator, Modal, Pressable } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SpeedDial, Dialog, Icon } from '@rneui/themed'
import RenderListRightEle from './components/listItemRightActions'
import HandleRootView from '../../components/HandleRootView'
import OperateTypeOrProduct from './components/operateTypeOrProduct'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'


// data
import {
      WINDOW_WIDTH,
      WINDOW_HEIGHT
} from '../../utils'
import {
      typeData,
      products
} from './js/data'
import { IconNode } from '@rneui/base';




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
      // 浮动按钮是否展开
      const [openSpeedDial, setOpenSpeedDial] = useState(false)
      // 当前浮动按钮点击的操作类型
      const [curOperationType, setCurOperationType] = useState<'' | 'add' | 'typeManagement' | 'update' | 'details'>('')

      // 分类列表
      const [assortList, setAssortList] = useState(typeData)

      // 商品列表
      const [productList, setProductList] = useState(products)

      // 当前 dialog 作用的类型
      const [curDialogType, setCurDialogType] = useState<string>('')
      // 确认删除的弹窗
      const [showDelDialog, setShowDelDialog] = useState<boolean>(false)
      // 当前删除的物品 id
      const [curEditId, setCurEditId] = useState<string>('')



      // function
      // 点击操作浮动按钮
      function clickSpeedDialAction(type: string) {
            setCurOperationType(type)
            setShowModal(true)
            setOpenSpeedDial(false)
      }

      // 设置 dialog
      function setDialog(type: string, id: string) {
            switch (type) {
                  case 'del':
                        setCurDialogType('del')
                        setShowDelDialog(true)
                        break
                  case 'update':
                        setCurOperationType('update')
                        setShowModal(true)
                        break
            }
            setCurEditId(id)
      }

      // 重置 dialog
      function resetDialog() {
            setShowDelDialog(false)
            setCurEditId('')
      }

      // 删除物品
      function handleDelProduct() {
            const id = curEditId
            console.log('要删除的id', id)
            resetDialog()
      }



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
                                    return <TouchableOpacity
                                          key={item.key}
                                          style={styles.assortItem}
                                          onPress={() => {
                                                console.log('点击了', item.name)
                                          }}
                                    >

                                          {/* <Pressable
                                          delayLongPress={1000}
                                          pressRetentionOffset={{ bottom: 30, left: 20, right: 20, top: 20 }}
                                          android_ripple={{ color: 'black', borderless: true, radius: 50 }}
                                          onPress={() => {
                                                console.log('点击了', item.name)
                                          }}
                                          onLongPress={() => {
                                                setCurEditId(item.key)
                                                console.log('长按了', item.name)
                                          }}
                                    > */}
                                          <View>

                                                <Text>{item.name}</Text>
                                          </View>
                                          {/* </Pressable> */}
                                    </TouchableOpacity>

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
                                                renderRightActions: (...item) => RenderListRightEle(setDialog, info.item.key, ...item)
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
                                                      <Text style={styles.productItemText}>{info.item.name}</Text>
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

                  {/* 弹窗 -- 新增、物品编辑  */}
                  <Modal animationType='slide'
                        transparent={false}
                        visible={showModal}
                        onRequestClose={() => setShowModal(false)}
                  >
                        <View style={styles.modalTextView}>
                              <Text style={styles.modalTitle}>{'add' === curOperationType ? '新增' : ['update', 'typeManagement'].includes(curOperationType) ? '编辑' : 'details' === curOperationType ? '详情' : ''}</Text>

                        </View>
                        {
                              ['add', 'update', 'typeManagement'].includes(curOperationType) ? <OperateTypeOrProduct setShowModal={setShowModal} type={curOperationType}
                                    id={curEditId}
                              ></OperateTypeOrProduct>
                                    : <></>
                        }
                        {/* <Button onPress={() => setShowModal(false)} title="关闭弹窗"></Button> */}

                  </Modal>

                  {/* 浮动按钮 */}
                  <SpeedDial
                        isOpen={openSpeedDial}
                        icon={{ name: 'edit', color: '#fff' }}
                        openIcon={{ name: 'close', color: '#fff' }}
                        onOpen={() => setOpenSpeedDial(!openSpeedDial)}
                        onClose={() => setOpenSpeedDial(!openSpeedDial)}
                  >
                        <SpeedDial.Action
                              icon={(): () => IconNode => {
                                    return <AntDesignIcon
                                          name='plus'
                                          size={20}
                                          color='#fff'
                                    />
                              }}
                              title='新增'
                              onPress={() => clickSpeedDialAction('add')}

                        />
                        <SpeedDial.Action
                              icon={(): () => IconNode => {
                                    return <AntDesignIcon
                                          name='appstore-o'
                                          size={20}
                                          color='#fff'
                                    />
                              }}

                              title='分类管理'
                              onPress={() => {
                                    navigation.navigate('TypeManagement')
                                    // clickSpeedDialAction('typeManagement')
                              }}

                        />

                  </SpeedDial>

                  {/* 确认删除弹窗 */}
                  <Dialog
                        isVisible={showDelDialog}
                        onBackdropPress={resetDialog}
                  >
                        <Dialog.Title title={'del' === curDialogType ? '确认删除吗？' : ''} />
                        <View><Text>删除这里的东西</Text></View>
                        <Dialog.Actions>
                              <Dialog.Button title="确定" onPress={() => {
                                    console.log('删除', curEditId)
                                    handleDelProduct()


                              }}></Dialog.Button>
                              <Dialog.Button title="取消" onPress={() => {
                                    console.log('取消删除')
                                    resetDialog()
                              }}></Dialog.Button>

                        </Dialog.Actions>
                  </Dialog>

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
      productItemText: {
            fontSize: 18,

      },
      modalTextView: {

      },
      modalTitle: {
            paddingVertical: 20,
            paddingHorizontal: 10,
            fontSize: 24,
            fontWeight: '500',
            color: 'white',
            backgroundColor: '#257BB1'

      },
      fabIconItem: {
            fontSize: 10
      }
})
