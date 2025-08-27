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
                  name: '2', typeDescriptions: '6666'
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
                        initialValues={{ name: '', typeDescriptions: '' }}
                        onSubmit={handleSubmitForm}
                  >
                        {
                              ({ handleChange, handleSubmit, values }) => (
                                    <View style={styles.formContainer}>
                                          {/* 名称 */}
                                          <View style={styles.formItem}>
                                                <View >
                                                      <Text style={styles.formItemTitle}>
                                                            分类名称
                                                      </Text>
                                                </View>
                                                <Input
                                                      onChangeText={handleChange('name')} value={values.name}
                                                      placeholder='请输入名称'
                                                      inputStyle={styles.formItemInput}></Input>
                                          </View>
                                          {/* 简介 -- 分类 */}
                                          <View style={styles.formItem}>
                                                <View >
                                                      <Text style={styles.formItemTitle}>
                                                            分类简介
                                                      </Text>
                                                </View>
                                                <TextInput
                                                      editable
                                                      multiline
                                                      numberOfLines={6}
                                                      rows={6}
                                                      maxLength={60}
                                                      onChangeText={handleChange('typeDescriptions')}
                                                      value={values.typeDescriptions}
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