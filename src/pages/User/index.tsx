// plugins
import { useState, useEffect, useRef } from 'react'
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera'
import { useAppState } from '@react-native-community/hooks'
import { useIsFocused } from '@react-navigation/native'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'


// components
import { View, StyleSheet, Button, Image, Text, TouchableOpacity, PermissionsAndroid, Platform, Alert, Pressable, Dimensions } from 'react-native'
import { Icon } from '@rneui/themed'


export default function User({ navigation }) {

      // data
      const { hasPermission } = useCameraPermission()
      // 启动后置摄像头
      const cameraDevice = useCameraDevice('back', {
            physicalDevices: ['ultra-wide-angle-camera']
      })
      // useIsFocused：根据屏幕当前的焦点状态呈现不同内容，例如导航到新屏幕时
      const isFocused = useIsFocused()
      // useAppState：当应用程序关闭或置于后台时，将在“活动”、“后台”或 iOS 的“非活动”状态之一间改变
      const appState = useAppState()
      const isActive = isFocused && 'active' === appState

      // ref
      // 相机元素
      const cameraRef = useRef<Camera>(null)

      // state
      // 列表渲染
      const [otherList] = useState([
            {
                  name: '更改密码',
                  key: 'updatePsd',
                  click: () => {
                        console.log('更改密码')

                  }
            }, {
                  name: '关于猪蹄',
                  key: 'about',
                  click: () => {

                  }
            }, {
                  name: '退出登录',
                  key: 'logout',
                  click: () => {

                  }
            },
      ])
      // 是否开始照相
      const [startCamera, setStartCamera] = useState(false)

      // 头像
      const [avatarData, setAvatar] = useState('https://static.jyshare.com/images/JYSHARE-COM.png')

      // function

      // 点击头像
      function clickAvatar() {
            if (!hasPermission) {
                  requestCameraPermission()
                  return
            } else {
                  setStartCamera(true)
            }
      }


      // 提示用户相机权限 - Android
      async function requestCameraPermission() {
            try {
                  // 环境为 安卓
                  if ('android' === Platform.OS) {
                        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                              title: '相机权限',
                              message: '需要您授权相机权限，方可替换头像',
                              buttonNeutral: '下次再说',
                              buttonNegative: '拒绝',
                              buttonPositive: '同意'
                        })
                        if (PermissionsAndroid.RESULTS.GRANTED === granted) {
                              console.log('相机已授权')
                              setStartCamera(true)
                        } else {
                              console.log('相机未授权')
                              setStartCamera(false)
                        }
                  } else {
                        //  iOS 环境
                  }
            } catch (e) {
                  console.log('requestCameraPermission error: ', e)
            }
      }

      // 拍照
      async function takePhoto() {
            try {
                  const photo = await cameraRef.current?.takePhoto({
                        // 模拟器上会报错
                        // flash: 'auto'
                  })
                  const path = `file://${photo?.path}`
                  await CameraRoll.saveAsset(path, {
                        type: 'photo'
                  })
                  setAvatar((path))
                  console.log('拍照成功 photo: ', photo)
                  setStartCamera(false)
            } catch (e) {
                  console.log('拍照失败:', e)
            }

      }

      // useEffect
      // useEffect(() => {
      //       // 判断是否有相机权限
      //       if (!hasPermission) {
      //             // 启动授权提示
      //             requestCameraPermission()
      //       }
      // }, [hasPermission])


      return <View style={styles.container}>

            {
                  startCamera ?
                        <>
                              <Camera ref={cameraRef} style={styles.cameraContainer} device={cameraDevice} isActive={isActive} photo={true} />
                              <Pressable style={styles.cameraBtn} onPress={takePhoto} />
                        </>
                        :
                        <>
                              {/* 头像和用户名 */}
                              <View style={styles.userInfoContainer}>
                                    <View style={styles.userAvatarContainer} >
                                          <TouchableOpacity onPress={clickAvatar}>
                                                <Image style={styles.userAvatar} source={{ uri: avatarData }} />
                                          </TouchableOpacity>
                                    </View>
                                    <View style={styles.userNameContainer}>
                                          <Text style={styles.userName}>用户名</Text>
                                    </View>
                              </View>
                              {/* 其他操作 */}

                              {
                                    otherList.map(item => {
                                          return (
                                                <TouchableOpacity key={item.key} onPress={item.click}>
                                                      <View style={styles.item}>
                                                            <View style={styles.itemTextContainer}>
                                                                  <Text style={styles.itemText}>{item.name}</Text>
                                                            </View>
                                                            <View style={styles.itemIcon}>
                                                                  <Icon
                                                                        name='chevron-thin-right'
                                                                        size={20}
                                                                        type='entypo'
                                                                        color='#808080'
                                                                  />
                                                            </View>
                                                      </View>
                                                </TouchableOpacity>
                                          )
                                    })
                              }
                              {/* <Button title="返回" onPress={() => navigation.navigate('Home')} />  */}
                        </>

            }



      </View>
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      cameraContainer: {
            flex: 1
      },
      cameraBtn: {
            position: 'absolute',
            bottom: 30,
            left: Dimensions.get('window').width / 2 - 50,
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: 'red',
            zIndex: 1
      },
      userInfoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 20,
      },
      userAvatarContainer: {
            flexBasis: 130,
            width: 130,
            flexGrow: 0,
            flexShrink: 0,
            alignItems: 'center',
      },
      userAvatar: {
            width: 110,
            height: 110,
            borderRadius: 55,
      },
      userNameContainer: {
      },
      userName: {
            fontSize: 26
      },
      item: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomColor: '#808080',
            borderBottomWidth: StyleSheet.hairlineWidth
      },
      itemTextContainer: {
            flexGrow: 9,
      },
      itemText: {
            fontSize: 20,
            color: '#808080'
      },
      itemIcon: {
            flexGrow: 1,

      }
})