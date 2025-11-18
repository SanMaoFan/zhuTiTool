// plugins
import { useState, useRef } from 'react'
import MD5 from 'react-native-md5';

// components
import { View, Text, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import { Input } from '@rneui/themed'

// customComponent
import CustomLoadingEle from '@/components/CustomLoadingEle'
import CustomAndroidEle from '@/components/CustomAndroidToastEle'

// utils
import Storage from '@/utils/storage'


// api
import { userLogin } from '@/api/user'


export default function LoginPage({navigation}) {

    // ref
    const JFormRef = useRef(null)

    // state
    // loading
    const [isLoading, setLoading] = useState(false)

    // function 
    // 提交表单
    async function handleSubmit(values: {
        userPhone: string
        userPwd: string
    }) {
        try {
            const newPwd = MD5.hex_md5(values.userPwd)
            setLoading(true)
            const { status, data, message } = await userLogin({
                ...values,
                userPwd: newPwd
            })
            if (200 === status) {
                // 设置数据在本地中
                Storage.set('token', data.token)
                Storage.set('userPhone', data.userPhone)
                CustomAndroidEle('登录成功')
                setTimeout(() =>{
                    navigation.navigate('HomeBottomTab')
                }, 1500)
            } else {
                CustomAndroidEle(message)
                console.log(message)
            }
        } catch (e) {
            CustomAndroidEle('请求失败')
            console.log('user login error:', e)
        } finally {
            setLoading(false)
        }
    }



    return <View style={styles.container}>

        {/* loading */}
        <CustomLoadingEle loading={isLoading} />

        <Formik
            innerRef={JFormRef}
            initialValues={{ userPhone: '', userPwd: '' }}
            onSubmit={handleSubmit}
        >
            {
                ({ handleChange, handleSubmit }) => (
                    <View>
                        {/* 用户名 */}
                        <View style={styles.formItem}>
                            <View style={styles.formItemTitleView}>
                                <Text style={styles.formItemTitle}>账号：</Text>
                            </View>
                            <View style={styles.formItemInputView}>
                                <Input style={styles.input} onChangeText={handleChange('userPhone')} />
                            </View>

                        </View>
                        {/* 密码 */}
                        <View style={styles.formItem}>
                            <View style={styles.formItemTitleView}>
                                <Text style={styles.formItemTitle}>密码：</Text>
                            </View>
                            <View style={styles.formItemInputView}>
                                <Input secureTextEntry={true} style={styles.input} onChangeText={handleChange('userPwd')} />
                            </View>

                        </View>
                        {/* 提交按钮 */}
                        <Button title="登录" onPress={() => { handleSubmit() }}></Button>
                    </View>
                )
            }


        </Formik>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    formItemTitleView: {
        flexBasis: 74,
        flexShrink: 0,
        flexGrow: 0
    },
    formItemTitle: {
        fontSize: 24,

    },
    formItemInputView: {
        flex: 1
    },
    input: {
        borderColor: 'gray'
    }
})