// plugins
import { useRef, useState } from 'react'

// components
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { SearchBar, SpeedDial } from '@rneui/themed'
import HandleRootView from '@/components/HandleRootView'
import RenderListRightEle from '../ProductManagement/components/listItemRightActions'
import { Dialog } from '@rneui/themed'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import OperateTypeOrProduct from './components/operateTypeOrProduct'




// style
import commonStyles from '@/common/styles'

export default function TypeManagement() {


      // ref
      const JSearchBar = useRef(null)

      // state
      // 搜索词
      const [searchVal, setSearchVal] = useState('')
      // loading
      const [showLoading, setShowLoading] = useState(false)
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
                  title: '测1试'
            }
      ])
      // 当前浮动按钮点击的操作类型
      const [curOperationType, setCurOperationType] = useState<'' | 'add' | 'typeManagement' | 'update' | 'details'>('')
      // 是否显示弹窗
      const [showModal, setShowModal] = useState(false)
      // 当前 dialog 作用的类型
      const [curDialogType, setCurDialogType] = useState<string>('')
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

      // 删除分类
      function handleDelType() {
            const id = curEditId
            console.log('要删除的id', id)
            resetDialog()
      }


      return <View style={styles.container}>

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

                  ></FlatList>
            </SafeAreaView>

            {/* 浮动按钮 */}
            <TouchableOpacity style={[styles.floatBtn, commonStyles.basicBackgroundColor]} onPress={() => {
                  setCurOperationType('add')
                  setShowModal(true)
            }}>
                  <AntDesignIcon
                        name='plus'
                        size={20}
                        color='#fff'
                  />
            </TouchableOpacity>

            {/* 弹窗 -- 新增、编辑  */}
            <Modal animationType='slide'
                  transparent={false}
                  visible={showModal}
                  onRequestClose={() => setShowModal(false)}
            >
                  <View style={styles.modalTextView}>
                        <Text style={styles.modalTitle}>{'add' === curOperationType ? '新增' : 'update' === curOperationType ? '编辑' : 'details' === curOperationType ? '详情' : ''}</Text>

                  </View>
                  {
                        ['add', 'update'].includes(curOperationType) ? <OperateTypeOrProduct setShowModal={setShowModal} type={curOperationType}
                              id={curEditId}
                        ></OperateTypeOrProduct>
                              : <></>
                  }
                  {/* <Button onPress={() => setShowModal(false)} title="关闭弹窗"></Button> */}

            </Modal>

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

      },
      searchContainer: {
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
      },
      listContainer: {
            height: Dimensions.get('window').height - 170,
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
      floatBtn: {
            position: 'absolute',
            bottom: 10,
            right: 20,
            height: 56,
            width: 56,
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center'
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