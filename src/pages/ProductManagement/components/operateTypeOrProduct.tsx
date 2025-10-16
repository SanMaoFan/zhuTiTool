// plugins
import { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

// components
import { View, SafeAreaView, ScrollView, Text, StyleSheet, Button, Dimensions, TextInput, ToastAndroid } from 'react-native'
import { Tab, TabView, Icon, Input, CheckBox } from '@rneui/themed'
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import LoadingEle from '@/components/LoadingEle'

// api
import { getTypeList, addTypeItem, updateTypeItem, getTypeInfo } from '@/api/type'
import { getProductInfo, addProductItem, updateProductItem } from '@/api/product'


interface Props {
      resetRequest: () => void
      resetDialog: () => void
      type: string
      editId: string
      curTypeId: string
}

interface FormData {
      name: string
      descript?: string 
      parentId?: string 
      id?: string 
}

interface FormValues {
      descriptions?: string
      name: string
      type: 'type' | 'product'
      typeItem?: string
}


// 操作类型或商品
// type 分为： updateProduct, updateType, add 分别代表 编辑物品、编辑分类、新增
export default function OperateTypeOrProduct({
      resetRequest,
      resetDialog,
      type: curDialogType,
      editId,
      curTypeId,
}: Props) {

      // navigation
      const navigation = useNavigation()

      // ref
      const JFormRef = useRef(null)

      // state
      // loading
      const [showLoading, setShowLoading] = useState(false)
      // 分类数据
      const [typeList, setTypeList] = useState([])
      // 是否禁用类型选择
      const [isTypeDisabled, setIsTypeDisabled] = useState(() => {
            return ['updateProduct', 'updateType'].includes(curDialogType)
      })

      // 当前要改动的物品 id
      const [curEditId, setEditId] = useState<null | string>(null)

      // function
      // 请求数据
      async function getInfo() {
            try {
                  // console.log('当前类型和数据：', type, editId)
                  setShowLoading(true)
                  let name, descriptions, typeItem
                  switch (curDialogType) {
                        // 请求物品详情、分类列表
                        case 'updateProduct':
                              await getTypeListData()
                              await getProductDetail((detailData: {
                                    name: string
                                    descriptions: string
                                    typeItem: string
                              }) => {
                                    const { name: productName,
                                          descriptions: productDescript,
                                          typeItem: productParentId } = detailData
                                    name = productName
                                    descriptions = productDescript
                                    typeItem = productParentId
                              })
                              break
                        // 请求分类详情
                        case 'updateType':
                              await getTypeDetail()
                              break
                        case 'add':
                              await getTypeListData()
                              break
                  }
                  // 设置数据
                  ['updateProduct', 'updateType'].includes(curDialogType) && JFormRef.current?.setValues({
                        type: 'updateProduct' === curDialogType ? 'product' : 'updateType' === curDialogType ? 'type' : 'type',
                        name, typeItem, descriptions
                  })
            } catch (e) {
                  console.log('getInfo error: ', e)
                  ToastAndroid.showWithGravity('网络出错，请稍后再试', ToastAndroid.SHORT, ToastAndroid.TOP)
            } finally {
                  setShowLoading(false)
            }

      }

      // 请求物品详情
      async function getProductDetail(callback) {
            try {
                  const { data, status: productResultStatus } = await getProductInfo(curEditId as string)
                  if (200 === productResultStatus) {
                        const { parentId, productDescript, productName } = data
                        callback?.({
                              name: productName,
                              descriptions: productDescript,
                              typeItem: parentId
                        })

                  } else {
                        ToastAndroid.show('请求失败！', ToastAndroid.SHORT)
                  }
            } catch (e) {
                  ToastAndroid.showWithGravity('网络出错，请稍后再试', ToastAndroid.SHORT, ToastAndroid.TOP)

            }


      }

      // 请求分类详情
      async function getTypeDetail(callback) {
            try {
                  const { data, status } = await getTypeInfo(curEditId as string)
                  if (200 === status) {
                        const { typeName, typeDescript } = data
                        callback?.({
                              name: typeName,
                              descriptions: typeDescript,
                              typeItem: ''
                        })
                  } else {
                        ToastAndroid.show('请求失败！', ToastAndroid.SHORT)
                  }
            } catch (e) {
                  ToastAndroid.showWithGravity('网络出错，请稍后再试', ToastAndroid.SHORT, ToastAndroid.TOP)

            }
      }

      // 请求分类列表
      async function getTypeListData() {
            try {
                  // 请求分类数据
                  const { data: { list }, status: typeResultStatus } = await getTypeList({ pageNo: 100 })
                  if (200 === typeResultStatus) {
                        // console.log('分类数据列表, ', list)
                        setTypeList(() => {
                              return list.map(item => {
                                    return {
                                          value: item.typeId,
                                          name: item.typeName
                                    }
                              })
                        })
                  } else {
                        ToastAndroid.show('分类列表请求失败！', ToastAndroid.SHORT)
                  }
            } catch (e) {
                  console.log('getInfo error: ', e)
                  ToastAndroid.showWithGravity('网络出错，请稍后再试', ToastAndroid.SHORT, ToastAndroid.TOP)
            }
      }
      // 提交表单
      async function handleSubmitForm(values: FormValues) {
            try {
                  setShowLoading(true)
                  let objParams: FormData = {
                        name: "默认名称"
                  }
                  let requestFn = ('updateProduct' === curDialogType) ? updateProductItem : ('updateType' === curDialogType) ? updateTypeItem : ('add' === curDialogType ? ('type' === values.type ? addTypeItem : addProductItem) : '')
                  const { descriptions,
                        name,
                        type = 'type',
                        typeItem } = values
                  if ('type' === type) {
                        objParams = Object.assign({
                              name,
                              descript: descriptions
                        }, 'updateType' === curDialogType && {
                              id: curEditId
                        })
                  } else {
                        objParams = Object.assign({
                              name,
                              descript: descriptions,
                              parentId: typeItem
                        }, 'updateProduct' === curDialogType && {
                              id: curEditId
                        })
                  }
                  console.log('请求的方法：', requestFn)
                  const { status, message } = await requestFn(objParams)
                  if (200 === status) {
                        ToastAndroid.showWithGravity((['updateProduct', 'updateType'].includes(curDialogType) ? '修改' : '新增') + '成功！', ToastAndroid.SHORT, ToastAndroid.TOP)
                        if (curTypeId === objParams?.parentId) {
                              resetRequest()
                        } else {
                              resetDialog()
                        }
                  } else {
                        ToastAndroid.showWithGravity('请求失败！', ToastAndroid.SHORT, ToastAndroid.TOP)
                        console.log('message: ', message)
                  }
            } catch (e) {
                  console.log("submit form error: ", e)
                  ToastAndroid.showWithGravity('提交失败！', ToastAndroid.SHORT, ToastAndroid.TOP)
            } finally {
                  setShowLoading(false)
            }


      }

      // useEffect
      useEffect(() => {
            setEditId(editId || null)
            getInfo()
      }, [])


      return (
            <ScrollView style={styles.container}>
                  {/* loading */}
                  <LoadingEle loading={showLoading}></LoadingEle>

                  {/* 表单内容 */}
                  <Formik
                        innerRef={JFormRef}
                        initialValues={{ type: '', name: '', typeItem: '', descriptions: '' }}
                        onSubmit={handleSubmitForm}
                  >
                        {
                              ({ handleChange, handleSubmit, values }) => (
                                    <View style={styles.formContainer}>
                                          {/* 类型 */}
                                          <View style={styles.formItem}>
                                                <View >
                                                      <Text style={styles.formItemTitle}>
                                                            选择类型
                                                      </Text>
                                                </View>
                                                <View style={styles.formItemCheckbox}>
                                                      <CheckBox
                                                            title="分类"
                                                            checked={'type' === values.type}
                                                            onPress={() => {
                                                                  handleChange('type')('type')
                                                            }}
                                                            checkedIcon="dot-circle-o"
                                                            uncheckedIcon="circle-o"
                                                            disabled={isTypeDisabled}
                                                      ></CheckBox>
                                                      <CheckBox
                                                            title="物品"
                                                            checked={'product' === values.type}
                                                            onPress={() => {
                                                                  handleChange('type')('product')
                                                            }}
                                                            checkedIcon="dot-circle-o"
                                                            uncheckedIcon="circle-o"
                                                            disabled={isTypeDisabled}
                                                      ></CheckBox>
                                                </View>

                                          </View>
                                          {/* 名称 */}
                                          <View style={styles.formItem}>
                                                <View >
                                                      <Text style={styles.formItemTitle}>
                                                            {('type' === values.type ? '分类' : '物品') + '名称'}
                                                      </Text>
                                                </View>
                                                <Input
                                                      onChangeText={handleChange('name')} value={values.name}
                                                      placeholder='请输入名称'
                                                      inputStyle={styles.formItemInput}></Input>
                                          </View>
                                          {
                                                'product' === values.type &&
                                                <>
                                                      {/* 选择分类 */}

                                                      <View style={styles.formItem}>
                                                            <View >
                                                                  <Text style={styles.formItemTitle}>
                                                                        所属分类
                                                                  </Text>
                                                            </View>
                                                            <Picker
                                                                  mode='dialog'
                                                                  style={styles.formPicker}
                                                                  selectedValue={values.typeItem}
                                                                  onValueChange={(itemValue, itemIndex) => {
                                                                        handleChange('typeItem')(itemValue)
                                                                  }}
                                                            >
                                                                  {
                                                                        typeList.map((item: { name: string, value: string }, index) => {
                                                                              return <Picker.Item label={item.name} value={item.value} key={item.value} />
                                                                        })
                                                                  }
                                                            </Picker>
                                                      </View>

                                                </>
                                          }
                                          {/* 简介 -- 物品 */}
                                          <View style={styles.formItem}>
                                                <View >
                                                      <Text style={styles.formItemTitle}>
                                                            {'product' === values.type ? "物品" : "分类"}简介
                                                      </Text>
                                                </View>
                                                <TextInput
                                                      editable
                                                      multiline
                                                      numberOfLines={6}
                                                      rows={6}
                                                      maxLength={100}
                                                      onChangeText={handleChange('descriptions')}
                                                      value={values.descriptions}
                                                      placeholder='请输入简介'
                                                      style={styles.formTextarea}
                                                ></TextInput>

                                          </View>


                                          <Button title="提交" onPress
                                                ={() => handleSubmit()} />
                                    </View>
                              )
                        }
                  </Formik>


            </ScrollView>
      )
}

const styles = StyleSheet.create({
      container: {
            padding: 12
      },
      formContainer: {

      },
      formItem: {
            marginBottom: 16,
      },
      formItemTitle: {
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold'
      },
      formItemInput: {
            fontSize: 16
      },
      formItemCheckbox: {
            flexDirection: 'row'
      },
      formPicker: {
      },
      formTextarea: {
            borderColor: '#666',
            borderWidth: StyleSheet.hairlineWidth,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 5,
            textAlignVertical: 'top'
      },
      closeBtn: {
            paddingVertical: 20
      }
})