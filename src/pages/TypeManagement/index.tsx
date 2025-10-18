// plugins
import { useRef, useState, useEffect } from 'react'

// components
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Modal, Dimensions, ToastAndroid } from 'react-native'
import { SearchBar, SpeedDial, Dialog } from '@rneui/themed'
import HandleRootView from '@/components/HandleRootView'
import RenderListRightEle from '../ProductManagement/components/listItemRightActions'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import TypeOrProductOperationModal from '@/components/TypeOrProductOperationModal'
import { IconNode } from '@rneui/base';
import LoadingEle from '@/components/LoadingEle'

// api
import { getTypeList } from '@/api/type'
import { getProductList, delProductItem } from '@/api/product'

// style
import commonStyles, { basicBackgroundColor } from '@/common/styles'



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
      const [curListType, setCurListType] = useState('type')
      // 列表数据
      const [listData, setListData] = useState([
            {
                  key: 'x',
                  title: '测2试'
            }, {
                  key: '1x',
                  title: '测1试'
            }, {
                  key: '21x',
                  title: '测1试'
            }, {
                  key: '1x2',
                  title: '测2试'
            }, {
                  key: '11x',
                  title: '测1试'
            }, {
                  key: '23x',
                  title: '测1试'
            }, {
                  key: 'x3',
                  title: '测2试'
            }, {
                  key: '13x',
                  title: '测1试'
            }, {
                  key: '24x',
                  title: '测1试'
            }, {
                  key: '4x',
                  title: '测2试'
            }, {
                  key: '41x',
                  title: '测1试'
            }, {
                  key: '26x',
                  title: 'adfasdfasdfasd'
            }
      ])
      // 商品/物品列表分页
      const [curProductPage, setProductPage] = useState(1)
      // 是否空列表
      const [isEmptyList, setIsEmptyList] = useState(false)
      // 是否已经请求回了所有数据
      const [isPageEnd, setIsPageEnd] = useState<boolean>(false)
      // 当前浮动按钮点击的操作类型
      const [curOperationType, setCurOperationType] = useState<'' | 'add' | 'typeManagement' | 'update' | 'details'>('')
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

      // 获取列表
      async function getListData(searchParams:{ page?: number, pageNo?: number, name?:string }) {
            try {
                  setShowLoading(true)
                  const requestFn = 'type' === curListType ? getTypeList : getProductList
                  const { data: { list, total = 0, count = 0 }, status } = await requestFn({data: {name: searchParams.name?.trim()}})
                  if (200 === status) {
                        setListData([])
                        console.log('获取数据', list)
                        // setListData((oldList) => {
                        //       if (!searchParams.page || searchParams.page === 1) {
                        //             return [...list]
                        //       } else {
                        //             return oldList.concat([...list])
                        //       }
                        // })
                        // 是否空数据
                        setIsEmptyList(list.length === 0)
                        // 判断是否请求回了所有数据
                        setIsPageEnd((curProductPage * 10 + count) >= total)
                  } else {
                        ToastAndroid.show('请求失败！', ToastAndroid.SHORT)
                  }
            } catch (e) {
                  ToastAndroid.showWithGravity('网络出错，请稍后再试', ToastAndroid.SHORT, ToastAndroid.TOP)
                  console.log('get list error:', e)
            } finally {
                  setShowLoading(false)
            }
      }

      // 删除分类
      function handleDelType() {
            const id = curEditId
            console.log('要删除的id', id)
            resetDialog()
      }
      // 重新请求当前数据
      function resetRequestCurData() {
            setShowModal(false)
            setCurDialogType("")
            setProductPage(1)
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
                              setShowLoading(true)
                              setTimeout(() => {
                                    setShowLoading(false)
                              }, 1000)
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

                                          <View style={styles.typeItem}>
                                                <View>
                                                      <Text style={styles.typeItemTitle}>{item.title}</Text>
                                                </View>
                                                <View style={styles.typeItemDescView}>
                                                      <View style={styles.descViewItem}>
                                                            <Text style={styles.typeItemDesc}>柜子</Text>
                                                      </View>
                                                      <View style={[styles.descViewItem, styles.typeItemDateView]}>
                                                            <Text style={styles.typeItemDesc}>2025-07-07</Text>
                                                      </View>
                                                </View>


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
                        title='切换成分类'
                        onPress={() => {

                              // 其他

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
                  <Dialog.Title title={'del' === curDialogType ? '删除' : ''} />
                  <View><Text>确认删除吗？</Text></View>
                  <Dialog.Actions>
                        <Dialog.Button title="确定" onPress={() => {
                              console.log('删除', curEditId)
                              handleDelType()


                        }}></Dialog.Button>
                        <Dialog.Button title="取消" onPress={() => {
                              console.log('取消删除')
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

      typeItem: {
            padding: 10,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: 'gray',
      },
      typeItemTitle: {
            fontSize: 18,
            paddingVertical: 20
      },
      typeItemDescView: {
            flexDirection: 'row',
      },
      descViewItem: {
            flex: 1
      },
      typeItemDesc: {
            fontSize: 14,
            color: 'gray'

      },
      typeItemDateView: {
            alignItems: 'flex-end'
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