// plugins
import { useRef, useState, useEffect } from 'react'

// components
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { SearchBar, SpeedDial, Dialog } from '@rneui/themed'
import HandleRootView from '@/components/HandleRootView'
import RenderListRightEle from '../ProductManagement/components/listItemRightActions'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import TypeOrProductOperationModal from '@/components/TypeOrProductOperationModal'
import { IconNode } from '@rneui/base';
import LoadingEle from '@/components/LoadingEle'
import AndroidToastEle from '@/components/AndroidToastEle'

// api
import { getTypeList, delTypeItem } from '@/api/type'
import { getProductList, delProductItem } from '@/api/product'

// style
import commonStyles, { basicBackgroundColor } from '@/common/styles'

// interface
import { type TypeInterface, type ProductInterface } from '@/utils'


/**
 * 
 * 开发任务
 * 完善删除时的提示
 */

export default function TypeManagement() {

      // ref
      const JSearchBar = useRef(null)

      // state
      // 搜索词
      const [searchVal, setSearchVal] = useState('')
      // loading
      const [showLoading, setShowLoading] = useState(false)
      // 当前查看列表的类型
      const [curListType, setCurListType] = useState<'type' | 'product'>('type')
      // 列表数据
      const [listData, setListData] = useState<{ name: string, key: string, date: string, desc: string, type: boolean }[]>([])
      // 商品/物品列表分页
      const [curProductPage, setProductPage] = useState(1)
      // 是否空列表
      const [isEmptyList, setIsEmptyList] = useState(false)
      // 是否已经请求回了所有数据
      const [isPageEnd, setIsPageEnd] = useState<boolean>(false)
      // 当前浮动按钮点击的操作类型
      const [curOperationType, setCurOperationType] = useState<'' | 'add' | 'updateType' | 'updateProduct' | 'details'>('')
      // 浮动按钮是否展开
      const [openSpeedDial, setOpenSpeedDial] = useState(false)
      // 是否显示弹窗
      const [showModal, setShowModal] = useState(false)
      // 当前 dialog 作用的类型
      const [curDialogType, setCurDialogType] = useState<string>('')
      // 当前分类/物品 id
      const [curTypeId, setCurTypeId] = useState("")
      // 确认删除的弹窗
      const [showDelDialog, setShowDelDialog] = useState<boolean>(false)
      // 当前删除的分类 id
      const [curEditId, setCurEditId] = useState<string>('')


      // function
      // 设置 dialog
      function setDialog(type: string, id: string) {
            switch (type) {
                  case 'del':
                        setCurDialogType('del')
                        setShowDelDialog(true)
                        break
                  case 'update':
                        setCurOperationType(() => {
                              return 'type' === curListType ? 'updateType' : 'updateProduct'
                        })
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

      // 进行搜索
      function handleSearch() {
            setProductPage(1)
            getListData({ page: 1, name: searchVal, listType: curListType })
      }

      // 获取列表
      async function getListData(
            searchParams:
                  { page?: number, pageNo?: number, name?: string, listType?: 'type' | 'product' } =
                  { listType: 'type', page: 1 }
      ) {
            try {
                  setShowLoading(true)
                  const requestFn = 'type' === searchParams.listType ? getTypeList : getProductList
                  const { data: { list, total = 0, count = 0 }, status } = await requestFn({
                        data: {
                              ['type' === searchParams.listType ? 'typeName' : 'productName']: searchParams.name?.trim(),
                              page: searchParams.page
                        }
                  })
                  if (200 === status) {
                        const isType = 'type' === searchParams.listType
                        console.log('获取数据', list)

                        const newData = list.map(item => {
                              const {
                                    typeId,
                                    productId,
                                    typeName,
                                    typeDescript,
                                    productName,
                                    productDescript,
                                    createDate } = item
                              return {
                                    type: isType,
                                    key: isType ? typeId : productId,
                                    name: isType ? typeName : productName,
                                    desc: isType ? typeDescript : productDescript,
                                    date: createDate
                              }
                        })

                        setListData((oldList) => {
                              if (!searchParams.page || searchParams.page === 1) {
                                    return [...newData]
                              } else {
                                    return oldList.concat([...newData])
                              }
                        })
                        // 是否空数据
                        setIsEmptyList(list.length === 0)
                        // 判断是否请求回了所有数据
                        setIsPageEnd(((curProductPage - 1) * 10 + count) >= total)
                  } else {
                        AndroidToastEle('请求失败！')
                  }
            } catch (e) {
                  AndroidToastEle('网络出错，请稍后再试！')
                  console.log('get list error:', e)
            } finally {
                  setShowLoading(false)
            }
      }

      // 删除数据
      async function handleDelData() {
            try {
                  const requestFn = 'type' === curListType ? delTypeItem : delProductItem
                  const { status } = await requestFn(curEditId)
                  if (200 === status) {
                        AndroidToastEle('删除成功！')
                        resetRequestCurData()
                  } else {

                  }
            } catch (e) {
                  AndroidToastEle('网络出错，请稍后再试！')
                  console.log('del data error:', e)
            } finally {
                  setShowLoading(false)
            }

      }
      // 重新请求当前数据
      function resetRequestCurData() {
            setOpenSpeedDial(false)
            setShowModal(false)
            setShowDelDialog(false)
            setCurDialogType("")
            setProductPage(1)
            getListData({ page: 1, name: searchVal, listType: curListType })
      }


      // effect
      useEffect(() => {
            getListData({})
      }, [])


      return <View style={styles.container}>
            {/* loading */}
            <LoadingEle loading={showLoading}></LoadingEle>
            {/* 搜索栏 */}
            <SearchBar
                  ref={JSearchBar}
                  round
                  containerStyle={[commonStyles.basicBackgroundColor, styles.searchContainer]}
                  placeholder='请输入搜索词'
                  onChangeText={setSearchVal}
                  value={searchVal}
                  showLoading={showLoading}
                  onKeyPress={({ nativeEvent: { key } }) => {
                        if ('Enter' === key) {
                              handleSearch()
                        }
                  }}

            ></SearchBar>
            {/* 列表 */}
            <SafeAreaView style={styles.listContainer}>
                  <FlatList
                        renderItem={({ item }) => {
                              // console.log('数据', info)
                              return <HandleRootView rootKey={item.key}
                                    ReanimatedSwipeableConfig={{
                                          friction: 2,
                                          rightThreshold: 20,
                                          renderRightActions: (...params) => RenderListRightEle(setDialog, item.key, ...params)
                                    }}
                              >
                                    <TouchableOpacity
                                          onPress={() => {
                                                setShowLoading(true)
                                                setTimeout(() => {
                                                      setShowLoading(false)
                                                      setShowModal(true)
                                                }, 2000)
                                          }}>


                                          <View style={styles.listItem} key={item.key}>
                                                <Text style={styles.listItemTitle}>{item.name}</Text>
                                                <Text style={styles.listItemText}>类型：{item.type ? '分类' : '物品'}</Text>
                                                <Text style={styles.listItemDesc}
                                                      ellipsizeMode="tail"
                                                      numberOfLines={2}
                                                >{item.desc}</Text>
                                                <Text style={(styles.listItemDate)}>{new Date(item.date).toLocaleString('zh')}</Text>
                                          </View>

                                    </TouchableOpacity>
                              </HandleRootView>
                        }}
                        data={listData}
                        keyExtractor={item => item.key}
                        ListEmptyComponent={() => <View style={styles.productEmptyOrPageEnd}>
                              <Text>暂无数据</Text>
                        </View>}
                        ListFooterComponent={(): any => {
                              return isPageEnd && !isEmptyList ?
                                    <Text>没有更多数据了~</Text> : <></>
                        }}
                        ListFooterComponentStyle={styles.productEmptyOrPageEnd}
                  ></FlatList>
            </SafeAreaView>

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
                        icon={(): () => IconNode => {
                              return <AntDesignIcon
                                    name='plus'
                                    size={20}
                                    color='#fff'
                              />
                        }}
                        color={basicBackgroundColor}
                        title='新增'
                        onPress={() => {
                              // setCurOperationType('add')
                              // setShowModal(true)
                        }}

                  />
                  <SpeedDial.Action
                        icon={(): () => IconNode => {
                              return <AntDesignIcon
                                    name='appstore-o'
                                    size={20}
                                    color='#fff'
                              />
                        }}
                        color={basicBackgroundColor}
                        title={`切换成${'type' === curListType ? '物品' : '分类'}`}
                        onPress={() => {
                              setCurListType(type => {
                                    const newType = 'type' === type ? 'product' : 'type'
                                    // 关闭浮窗
                                    setOpenSpeedDial(!openSpeedDial)
                                    // 请求
                                    getListData({ page: 1, name: searchVal, listType: newType })
                                    return newType
                              })

                        }}

                  />

            </SpeedDial>

            {/* 弹窗 -- 新增、编辑  */}
            <TypeOrProductOperationModal
                  openModal={showModal}
                  editId={curEditId}
                  typeId={curTypeId}
                  operationType={curOperationType}
                  infoType='product'
                  resetDialogCallback={resetDialog}
                  resetRequestCallback={resetRequestCurData}
                  onRequestClose={() => {
                        setShowModal(false)
                  }}
            ></TypeOrProductOperationModal>

            {/* 确认删除弹窗 */}
            <Dialog
                  isVisible={showDelDialog}
                  onBackdropPress={resetDialog}
            >
                  <Dialog.Title title={'del' === curDialogType ? '确认删除吗？' : ''} />
                  <View><Text>删除该数据吗？</Text></View>
                  <Dialog.Actions>
                        <Dialog.Button title="确定" onPress={() => handleDelData()
                        }></Dialog.Button>
                        <Dialog.Button title="取消" onPress={() => {
                              resetDialog()
                        }}></Dialog.Button>

                  </Dialog.Actions>
            </Dialog>

      </View>
}



const styles = StyleSheet.create({
      container: {
            flex: 1,
            // flexDirection: 'row'
      },
      searchContainer: {
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
      },
      listContainer: {
            height: Dimensions.get('window').height - 192,
            // backgroundColor: 'red'
      },
      listItem: {
            height: 168,
            padding: 10,
            borderBottomColor: 'tomato',
            borderBottomWidth: StyleSheet.hairlineWidth,
            // justifyContent: 'flex-start',
            // alignItems: 'center'
      },
      listItemTitle: {
            fontSize: 22,
            marginBottom: 8
      },
      listItemText: {
            fontSize: 18,
            marginBottom: 8,
            color: "gray",
      },
      listItemDesc: {
            height: 46,
            fontSize: 16,
            color: "gray",
            marginBottom: 8
      },
      listItemDate: {
            fontSize: 12,
            color: "gray"
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