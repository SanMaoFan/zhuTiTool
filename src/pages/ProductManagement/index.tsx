// plugins
import React, { useState, useEffect, ReactNode } from 'react'


// components
import { Text, View, ScrollView, Button, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, VirtualizedList, ActivityIndicator, Modal, Pressable, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SpeedDial, Dialog, Icon } from '@rneui/themed'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import RenderListRightEle from './components/listItemRightActions'

// custom components
import LoadingEle from '@/components/CustomLoadingEle'
import HandleRootView from '@/components/CustomHandleRootView'
import AndroidToastEle from '@/components/CustomAndroidToastEle'

import TypeOrProductOperationModal from '@/components/CustomTypeOrProductOperationModal'

// style
import commonStyles from '@/common/styles'
import { basicBackgroundColor } from '@/common/styles'

// data
import {
      WINDOW_WIDTH,
      WINDOW_HEIGHT
} from '../../utils'
// import {

// } from './js/data'
import { IconNode } from '@rneui/base';

// api
import { getTypeList } from '@/api/type'
import { getProductList, delProductItem } from '@/api/product'

// interface 
import { type TypeInterface, type ProductInterface } from '@/utils'



export default function Home({ navigation }) {
      // 是否显示loading
      const [showLoading, setShowLoading] = useState(false)
      // 列表顶部下拉刷新的状态
      const [isRefreshing] = useState(false)
      // 是否第一次渲染
      const [isFirstReload, setIsFirstReload] = useState(true)
      // 是否显示 modal
      const [showModal, setShowModal] = useState(false)
      // 浮动按钮是否展开
      const [openSpeedDial, setOpenSpeedDial] = useState(false)
      // 当前弹窗的操作类型
      const [curModalType, setCurModalType] = useState<'' | 'add' | 'updateType' | 'updateProduct' | 'details'>('')

      // 分类列表
      const [assortList, setAssortList] = useState<TypeInterface[]>([])
      // 当前分类/物品 id
      const [curTypeId, setCurTypeId] = useState("")

      // 商品列表
      const [productList, setProductList] = useState<ProductInterface[]>([])
      // 商品列表分页
      const [curProductPage, setProductPage] = useState(1)
      // 是否空列表
      const [isEmptyList, setIsEmptyList] = useState(false)
      // 是否已经请求回了所有数据
      const [isPageEnd, setIsPageEnd] = useState<boolean>(false)

      // 当前 dialog 作用的类型
      const [curDialogType, setCurDialogType] = useState<'del' | ''>('')
      // 确认删除的弹窗
      const [showDelDialog, setShowDelDialog] = useState<boolean>(false)
      // 当前删除的物品 id
      const [curEditId, setCurEditId] = useState<string>('')

      // function
      // 初始化页面获取数据
      function initPageData() {
            getTypeListFn(function (list) {
                  const { typeId = void 0 } = list?.[0]
                  setProductPage(1)
                  setCurTypeId(list?.[0]?.typeId)
                  typeId ? getProudctListFn({ parentId: typeId }) : setIsEmptyList(true)
            })
      }

      // 获取分类
      async function getTypeListFn(callback: (list: TypeInterface[]) => void) {
            try {
                  setShowLoading(true)
                  const { data: { list }, status } = await getTypeList({ data: { pageNo: 100 } })
                  // console.log('getTypeListFn request data:',list, status)
                  if (200 === status) {
                        setAssortList(() => {
                              return [...(list as TypeInterface[])]
                        })
                        callback?.(list)
                  } else {
                        AndroidToastEle('请求失败！')
                  }
            } catch (e) {
                  AndroidToastEle('网络出错，请稍后再试！')
                  console.log('get type list error:', e)
            } finally {
                  setShowLoading(false)

            }

      }

      // 获取物品
      async function getProudctListFn(searchParams: { page?: number, pageNo?: number, parentId?: string }) {
            try {
                  setShowLoading(true)
                  const { data: { list, total = 0, count = 0 }, status } = await getProductList({ data: searchParams })
                  // console.log('product 请求的数据,', list, status)
                  if (200 === status) {
                        setIsFirstReload(false)
                        setProductList((oldList) => {
                              if (!searchParams.page || searchParams.page === 1) {
                                    return [...list]
                              } else {
                                    return oldList.concat([...list])
                              }
                        })
                        // 是否空数据
                        setIsEmptyList(list.length === 0)
                        // 判断是否请求回了所有数据
                        setIsPageEnd((curProductPage * 10 + count) >= total)
                  } else {
                        AndroidToastEle('请求失败！')
                  }
            } catch (e) {
                  AndroidToastEle('网络出错，请稍后再试！')
                  console.log('get product list error:', e)
            } finally {
                  setShowLoading(false)

            }
      }


      // 设置 dialog
      function setDialog(type: string, id: string) {
            switch (type) {
                  case 'add':
                        setCurModalType(type)
                        setShowModal(true)
                        setOpenSpeedDial(false)
                        break
                  case 'del':
                        setCurDialogType('del')
                        setShowDelDialog(true)
                        break
                  case 'update':
                        setCurModalType('updateProduct')
                        setShowModal(true)
                        break
            }
            setCurEditId(id)
      }

      // 重置 dialog
      function resetDialog() {
            // 新增、编辑、详情 弹窗恢复
            setShowModal(false)
            // 删除 弹窗恢复
            setShowDelDialog(false)
            setCurEditId('')
      }

      // 列表顶部下拉刷新
      function onListRefresh() {
            setProductPage(1)
            getProudctListFn({ parentId: curTypeId })
      }
      // 列表底部刷新
      function onListEndReached() {
            if (!isPageEnd && !isEmptyList && !isFirstReload) {
                  setProductPage(page => {
                        const curPage = page + 1
                        setProductPage(2)
                        getProudctListFn({ page: curPage, parentId: curTypeId })
                        return curPage
                  })
            }

      }

      // 查询物品
      function clickTypeItem(id: string) {
            if (id === curTypeId) return
            setCurTypeId(id)
            setProductPage(1)
            getProudctListFn({ parentId: id })
      }

      // 重新请求当前数据
      function resetRequestCurData(submitData: any, isAddType: boolean) {
            setCurDialogType("")
            // 是否新增了分类
            if (isAddType) {
                  setShowModal(false)
                  initPageData()
            } else if (curTypeId === submitData.parentId) {
                  // 更新当前分类下的物品数据
                  setShowModal(false)
                  setProductPage(1)
                  getProudctListFn({ parentId: curTypeId })
            } else {
                  // 不请求
                  resetDialog()
            }
      }

      // 删除物品
      async function handleDelProduct() {
            try {
                  setShowLoading(true)
                  const { status } = await delProductItem(curEditId)
                  if (200 === status) {
                        AndroidToastEle('删除成功！')
                        setProductPage(1)
                        getProudctListFn({ parentId: curTypeId })
                        resetDialog()
                  } else {
                        AndroidToastEle('请求失败！')
                  }
            } catch (e) {
                  AndroidToastEle('网络出错，请稍后再试！')
                  console.log('del product error:', e)
            } finally {
                  setShowLoading(false)
            }
      }


      // effect
      useEffect(() => {
            initPageData()
      }, [])



      return (
            <View style={styles.container}>

                  {/* 路由跳转 */}
                  {/* <Button title="点击" onPress={() => navigation.navigate('User')} /> */}

                  {/* loading */}
                  <LoadingEle loading={showLoading}></LoadingEle>


                  {/* 左侧分类 */}
                  <ScrollView style={styles.assortContainer}>
                        {
                              assortList.map(item => {
                                    return <TouchableOpacity
                                          key={item.typeId}
                                          style={[styles.assortItem, item.typeId === curTypeId && styles.assortItemActive]}
                                          onPress={() => clickTypeItem(item.typeId)}
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

                                                <Text style={styles.typeName}>{item.typeName}</Text>
                                          </View>
                                          {/* </Pressable> */}
                                    </TouchableOpacity>

                              })
                        }
                  </ScrollView>


                  {/* 右侧物品栏 */}
                  <SafeAreaView style={styles.productsContainer}>
                        <VirtualizedList
                              renderItem={(info: any) => {
                                    // console.log('数据', info)
                                    return <HandleRootView rootKey={info.item.key}
                                          ReanimatedSwipeableConfig={{
                                                friction: 2,
                                                rightThreshold: 20,
                                                renderRightActions: (...item) => RenderListRightEle(setDialog, info.item.key, ...item)
                                          }}
                                    >
                                          <TouchableOpacity onPress={() => {
                                                setShowModal(true)
                                                // 点击物品展示详情
                                                setCurModalType('details')
                                                setCurEditId(info.item.key)
                                          }}>

                                                <View style={styles.productItem} key={info.item.key}>
                                                      <Text style={styles.productItemText}>{info.item.name}</Text>
                                                      <Text style={styles.productItemDesc}
                                                            ellipsizeMode="tail"
                                                            numberOfLines={2}
                                                      >{info.item.desc}</Text>
                                                      <Text style={(styles.productItemDate)}>{new Date(info.item.date).toLocaleString('zh')}</Text>
                                                </View>

                                          </TouchableOpacity>
                                    </HandleRootView>
                              }}
                              getItemCount={() => productList.length}
                              data={productList}
                              getItem={(data, index) => {
                                    return {
                                          name: data[index].productName,
                                          key: data[index].productId,
                                          date: data[index].createDate,
                                          desc: data[index].productDescript
                                    }
                              }}
                              ListEmptyComponent={() => <View style={styles.productEmptyOrPageEnd}>
                                    <Text>暂无数据</Text>
                              </View>}
                              ListFooterComponent={(): any => {
                                    return isPageEnd && !isEmptyList ?
                                          <Text>没有更多数据了~</Text> : <></>
                              }}
                              ListFooterComponentStyle={styles.productEmptyOrPageEnd}
                              // 顶部下拉刷新的状态
                              refreshing={isRefreshing}
                              // 顶部下拉刷新事件
                              onRefresh={onListRefresh}
                              // 滚动到底部的事件
                              onEndReached={onListEndReached}
                              // 距离底部的距离--在范围内会触发 onEndReached 事件
                              onEndReachedThreshold={0.5}
                        />

                  </SafeAreaView>

                  {/* 弹窗 -- 新增、物品编辑  */}
                  <TypeOrProductOperationModal
                        openModal={showModal}
                        editId={curEditId}
                        operationType={curModalType}
                        infoType='product'
                        resetDialogCallback={resetDialog}
                        resetRequestCallback={resetRequestCurData}
                        onRequestClose={() => {
                              setShowModal(false)
                        }}
                  ></TypeOrProductOperationModal>


                  {/* 浮动按钮 */}
                  <SpeedDial
                        isOpen={openSpeedDial}
                        color={basicBackgroundColor}
                        icon={{ name: 'edit', color: '#fff' }}
                        openIcon={{ name: 'close', color: '#fff' }}
                        onOpen={() => setOpenSpeedDial(!openSpeedDial)}
                        onClose={() => setOpenSpeedDial(!openSpeedDial)}
                  >
                        <SpeedDial.Action
                              icon={
                                    <AntDesignIcon
                                          name='plus'
                                          size={20}
                                          color='#fff'
                                    />
                              }
                              color={basicBackgroundColor}
                              title='新增'
                              onPress={() => setDialog('add', '')}

                        />
                        <SpeedDial.Action
                              icon={
                                    <AntDesignIcon
                                          name='appstore-o'
                                          size={20}
                                          color='#fff'
                                    />
                              }
                              color={basicBackgroundColor}
                              title='分类与物品'
                              onPress={() => {
                                    navigation.navigate('TypeManagement')
                                    setOpenSpeedDial(false)
                              }}

                        />

                  </SpeedDial>

                  {/* 确认删除弹窗 */}
                  <Dialog
                        isVisible={showDelDialog}
                        onBackdropPress={resetDialog}
                  >
                        <Dialog.Title title={'del' === curDialogType ? '确认删除吗？' : ''} />
                        <View><Text>删除该物品吗？</Text></View>
                        <Dialog.Actions>
                              <Dialog.Button title="确定" onPress={() => handleDelProduct()
                              }></Dialog.Button>
                              <Dialog.Button title="取消" onPress={() => {
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
      assortContainer: {
            width: WINDOW_WIDTH * (3 / 11),
            borderRightColor: '#75ABD1',
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
            borderBottomColor: '#75ABD1'
      },
      assortItemActive: {
            backgroundColor: '#75ABD1'
      },
      typeName: {
            fontSize: 24,
            marginHorizontal: 10
      },
      productsContainer: {
            // backgroundColor: 'tomato',
            width: WINDOW_WIDTH * (8 / 11),
            flexBasis: WINDOW_WIDTH * (8 / 11),
            flexGrow: 1,
            flexShrink: 0,
            overflow: 'hidden'
      },
      productItem: {
            height: 125,
            padding: 10,
            borderBottomColor: '#75ABD1',
            borderBottomWidth: StyleSheet.hairlineWidth,
            // justifyContent: 'flex-start',
            // alignItems: 'center'
      },
      productItemText: {
            fontSize: 20,
            marginBottom: 8
      },
      productItemDesc: {
            height: 46,
            fontSize: 16,
            color: "gray",
            marginBottom: 8
      },
      productItemDate: {
            fontSize: 12,
            color: "gray"
      },
      // 物品列表为空
      productEmptyOrPageEnd: {
            padding: 20,
            fontSize: 16,
            color: "#717171",
            alignItems: 'center'
      },
      fabIconItem: {
            fontSize: 10
      }
})
