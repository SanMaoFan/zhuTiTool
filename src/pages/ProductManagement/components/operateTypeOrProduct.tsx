// plugins
import { useState, useRef, useEffect } from 'react'

// components
import { View, SafeAreaView, ScrollView, Text, StyleSheet, Button, Dimensions, TextInput } from 'react-native'
import { Tab, TabView, Icon, Input, CheckBox } from '@rneui/themed'
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'


interface Props {
      setShowModal: (show: boolean) => void
      type: string
      id: string
}


// 操作类型或商品
export default function OperateTypeOrProduct({
      setShowModal,
      type,
      id
}: Props) {

      // ref
      const JFormRef = useRef(null)

      // state
      // 分类数据
      const [typeList, setTypeList] = useState([])
      // 是否禁用类型选择
      const [isTypeDisabled, setIsTypeDisabled] = useState(() => {
            return ['update', 'typeManagement'].includes(type)
      })

      // function
      // 请求分类数据
      function getInfo() {
            switch (type) {
                  // 请求物品数据
                  case 'update':
                        break
                  // 请求分类数据
                  case 'typeManagement':
                        break
            }
            // 设置数据
            JFormRef.current?.setValues({
                  type: 'update' === type ? 'product' : 'typeManagement' === type ? 'type' : '',
                  name: '2', typeItem: 'py', descriptions: '6666'
            })
      }
      // 提交表单
      function handleSubmitForm(values: any) {
            console.log('提交的数据', values)

      }

      // useEffect
      useEffect(() => {
            getInfo()
      }, [])

      return (
            <ScrollView style={styles.container}>

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
                                                                  {/* {
                                                                        typeList.map((item: { name: string, value: string }, index) => {
                                                                              return <Picker.Item label={item.name} value={item.value} key={item.value} />
                                                                        })
                                                                  } */}

                                                                  <Picker.Item label="JavaScript" value="js" />
                                                                  <Picker.Item label="Python" value="py" />
                                                                  <Picker.Item label="Kotlin" value="kt" />
                                                                  <Picker.Item label="Swift" value="swift" />
                                                                  <Picker.Item label="Objective-C" value="objc" />
                                                                  <Picker.Item label="Java" value="java1" />
                                                                  <Picker.Item label="JavaScript" value="js1" />
                                                                  <Picker.Item label="Python" value="py1" />
                                                                  <Picker.Item label="Kotlin" value="kt1" />
                                                                  <Picker.Item label="Swift" value="swift1" />
                                                                  <Picker.Item label="Objective-C" value="objc1" />
                                                                  <Picker.Item label="JavaScript" value="js12" />
                                                                  <Picker.Item label="Python" value="py12" />
                                                                  <Picker.Item label="Kotlin" value="kt12" />
                                                                  <Picker.Item label="Swift" value="swift12" />
                                                                  <Picker.Item label="Objective-C" value="objc12" />



                                                            </Picker>
                                                      </View>
                                                      {/* 简介 -- 物品 */}
                                                      <View style={styles.formItem}>
                                                            <View >
                                                                  <Text style={styles.formItemTitle}>
                                                                        简介
                                                                  </Text>
                                                            </View>
                                                            <TextInput
                                                                  editable
                                                                  multiline
                                                                  numberOfLines={6}
                                                                  rows={6}
                                                                  maxLength={60}
                                                                  onChangeText={handleChange('descriptions')}
                                                                  value={values.descriptions}
                                                                  placeholder='请输入简介'
                                                                  style={styles.formTextarea}
                                                            ></TextInput>

                                                      </View>
                                                </>
                                          }


                                          <Button title="提交" onPress
                                                ={() => handleSubmit()} />
                                    </View>
                              )
                        }
                  </Formik>




                  {/* <View style={[styles.closeBtn]} >
                        <Button onPress={() => setShowModal(false)} title='关闭弹窗' />
                  </View> */}


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