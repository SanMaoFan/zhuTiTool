// 手势处理 -- 官方文档提示该引入需要放在最顶部
import 'react-native-gesture-handler'

import { View, Text, StyleSheet, Dimensions, StatusBar, Switch, ActivityIndicator, Platform, TextInput, Button, TouchableHighlight, ScrollView, safeAreaView, Image, Alert, TouchableOpacity } from 'react-native'
import { useState, useEffect, useRef } from 'react'

// components
// 轮播第三方组件
import Swiper from 'react-native-swiper'
// 存储的第三方组件
import AsyncStorage from '@react-native-async-storage/async-storage'
// 定位的第三方组件
import Geolocation from '@react-native-community/geolocation'
// 相机的第三方组件
import { RNCamera } from 'react-native-camera'
// 图片的第三方组件---用于选择相册中图片的组件
import ImagePicker from 'react-native-image-picker'
// 图标组件库,安装时安装 react-native-vector-icons 即可，使用时应选择具体图标库
import Ionicons from 'react-native-vector-icons/Ionicons'


// 路由
import { NavigationContainer } from '@react-navigation/native'
// RN 中默认没有类似的浏览器的 history 对象，在 RN 中跳转之前，先将路由声明在 Stack 数组中（类似于微信小程序使用路由）
// 先安装 stack 的依赖
import { createStackNavigator } from '@react-navigation/stack'
// 关于底部选项卡导航的路由, 只可点击按钮进行切换，不能滑动切换，需要滑动切换，则选择 MaterialTopTap
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// Drawer 导航
import { createDrawerNavigator } from '@react-navigation/drawer'
// MaterialTopTap 导航
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'


// data
import StorageData from '../../utils/storage'



// components
// 路由页面使用到的组件
function HomeScreen({ navigation }) {
      return <Button
            // Stack、BottomTab、MaterTopTap 方案可使用以下方式直接跳转页面
            // onPress={() => navigation.navigate('Details')}
            // 如果要传递路由参数，则可以在其 navigation.navigator 方法的第二个参数中传入，在目标路由页面中要获取路由参数时，使用 props.route.params.age 即可获取（需要尝试）
            onPress={() => navigation.navigate('Details', { age: 18 })}
            title='跳转到详情页'
      // Drawer 方案使用以下方法可以直接打开弹窗
      // onPress={() => navigation.openDrawer()}
      // 使用以下方案可以打开/关闭弹窗
      // onPress={() => navigation.toggleDrawer()}
      // title='打开弹窗'
      />
}
function DetailsScreen({ navigation }) {
      return <Button onPress={() => navigation.navigate('Home')} title='跳转到首页' />
}





export default function TestPage() {

      // data
      // 更新头像的设置
      const imagePickerOptions = {
            title: "选择头像",
            // 自定义按钮
            customButtons: [{ name: 'fb', title: '从脸书选择图片' }],
            // 存储相关设置
            storageOptions: {
                  skipBackup: true,
                  path: 'images'
            },
            // 取消按钮
            cancelButtonTitle: '取消',
            // 调用摄像头拍照
            takePhotoButtonTitle: '去拍照',
            // 在相册中选择图片
            chooseFromLibraryButtonTitle: '从相册中选择'

      }

      // 创建 Stack
      const Stack = createStackNavigator()
      // 创建底部导航
      const BottomTabNav = createBottomTabNavigator()
      // Drawer 导航
      const DrawerRouter = createDrawerNavigator()
      // materialTopTap 导航
      const MaterialTopTap = createMaterialTopTabNavigator()

      // state
      // 是否显示顶部状态栏
      const [hiddenStatusBar, setHiddenStatusBar] = useState(true)
      // 输入框内容
      const [curValue, setCurValue] = useState('')
      // 密码框内容
      const [curPsd, setCurPsd] = useState('')
      // 头像内容
      const [curImagePickerData, setCurImagePickerData] = useState({})

      // 判断当前环境
      if ('android' === Platform.OS) {

      } else if ('ios' === Platform.OS) {

      }

      // ref
      const cameraRef = useRef(null)

      // function
      // 存储数据
      async function storeData(value) {
            try {
                  await AsyncStorage.setItem('testStorageKey', value)
            } catch (e) {
                  console.log('storeData:', e)
            }
      }
      // 获取存储数据
      async function getData() {
            try {
                  const data = await AsyncStorage.getItem('testStorageKey')
                  if (null != data) {
                        console.log('获取的数据', data)
                  }
            } catch (e) {
                  console.log('storeData:', e)
            }
      }

      // 获取地理信息
      async function getGeolocation() {
            const latData = await StorageData.get('latData')
            if (latData) {
                  return latData
            } else {

                  Geolocation.getCurrentPosition(
                        // 成功回调
                        info => {
                              const { cords: { lat, lng } }: { cords: { lat: number, lng: number } } = info
                              console.log(info)
                              StorageData.set('latData', { lat, lng })
                        },
                        // 报错信息
                        error => Alert.alert(JSON.stringify(error)),
                        // 设置其他配置
                        {
                              // 获取的超时时间
                              timeout: 2000
                        }
                  )
            }
      }

      // 更新头像
      function changeImage() {
            ImagePicker.showImagePicker(imagePickerOptions, (res: any) => {
                  console.log('response', res)
                  if (res.disCancel) {
                        console.log('用户取消选择')
                  } else if (res.error) {
                        console.log('选择出错', res.error)
                  } else if (res.customButton) {
                        console.log('用户点击了自定义按钮', res.customButton)
                  } else {
                        const source = { uri: res.uri }
                        // 设置图片内容
                        setCurImagePickerData(source)
                  }
            })
      }


      // 路由嵌套的组件
      function FeedCom() {
            return <Button title='feed' />
      }
      function MessageCom() {
            return <Button title='Message' />
      }
      function HomeTestScreen() {
            return <NavigationContainer>
                  <Stack.Navigator>
                        <Stack.Screen name='Children' component={Children1Screen}></Stack.Screen>
                        <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
                  </Stack.Navigator>
            </NavigationContainer>
      }
      function Children1Screen() {
            return <BottomTabNav.Navigator>
                  <BottomTabNav.Screen name='Feed' component={FeedCom}></BottomTabNav.Screen>
                  <BottomTabNav.Screen name='Message' component={MessageCom}></BottomTabNav.Screen>
            </BottomTabNav.Navigator>
      }


      // useEffect
      useEffect(() => {
            getGeolocation()
      })

      return <View>
            {/* 关于 Dimensions */}
            <View style={[styles.dimensionsContainer]}>
                  <View style={[styles.dimensionsItemBase]}>
                        <Text>测试</Text>
                  </View>
                  <View style={[styles.dimensionsItemBase]}>
                        <Text>测试</Text>
                  </View>
                  <View style={[styles.dimensionsItemBase]}>
                        <Text>测试</Text>
                  </View>
                  <View style={[styles.dimensionsItemBase]}>
                        <Text>测试</Text>
                  </View>
            </View>

            {/* 顶部状态栏 */}
            <StatusBar
                  hidden={hiddenStatusBar} // 是否隐藏
                  backgroundColor='red' // 仅在 Android 应用有效
                  barStyle={'light-content'} // 关于状态栏中图标的颜色
            />

            {/* 开关 */}
            <Switch
                  trackColor={{ false: 'red', true: 'green' }} // 状态颜色
                  thumbColor={'blue'}
                  onValueChange={() => setHiddenStatusBar(!hiddenStatusBar)}
            />

            {/* 加载 */}
            <ActivityIndicator color='blue' size='large' />
            <ActivityIndicator color='blue' size='small' />
            {/* 数字指定大小只在 Android 环境下生效 */}
            <ActivityIndicator color='blue' size={70} />

            {/* 输入框 */}
            <TextInput
                  style={[styles.input]}
                  placeholder='请输入内容'
                  value={curValue}
                  onChangeText={(e) => setCurValue(e)}
            />
            <View>
                  <Button title='获取输入框内容' onPress={() => { console.log('当前输入框内容', curValue) }} />
            </View>
            {/* 密码框 */}
            <TextInput
                  // 安全文本输入控制
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder='请输入密码'
                  value={curPsd}
                  onChangeText={(e) => setCurPsd(e)}
            />
            {/* 手机号输入框 */}
            <TextInput
                  style={[styles.input]}
                  placeholder='请输入手机号'
                  keyboardType='number-pad'
            />
            {/* 文本域 */}
            <TextInput
                  style={[styles.input]}
                  placeholder='多行文本框'
                  // 启用多行
                  multiline={true}
                  // 启用多少行
                  numberOfLines={5}
                  // 文字对齐方向，在安卓版本中默认是居中对齐，iOS中顶部对齐
                  textAlignVertical='top'
            />

            {/* 点击后高亮组件 */}
            <TouchableHighlight
                  onPress={() => { console.log('触碰后高亮') }}
            >
                  <View style={[styles.touchableItem]}>
                        <Text>触碰高亮</Text>
                  </View>
            </TouchableHighlight>

            {/* 滚动视图 */}
            <ScrollView
                  style={[styles.scrollView]}
                  // 有继承性的样式
                  contentContainerStyle={{ margin: 30 }}
                  // 隐藏垂直滚动条
                  showsVerticalScrollIndicator={false}
                  // 设置成水平滚动
                  horizontal={true}

            >
                  <Text style={[styles.scrollViewText]}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maiores consectetur laboriosam quasi sit ducimus voluptas praesentium dignissimos ut cum! Alias ad delectus ipsa pariatur vel molestiae illum repellendus quam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maiores consectetur laboriosam quasi sit ducimus voluptas praesentium dignissimos ut cum! Alias ad delectus ipsa pariatur vel molestiae illum repellendus quam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maiores consectetur laboriosam quasi sit ducimus voluptas praesentium dignissimos ut cum! Alias ad delectus ipsa pariatur vel molestiae illum repellendus quam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maiores consectetur laboriosam quasi sit ducimus voluptas praesentium dignissimos ut cum! Alias ad delectus ipsa pariatur vel molestiae illum repellendus quam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maiores consectetur laboriosam quasi sit ducimus voluptas praesentium dignissimos ut cum! Alias ad delectus ipsa pariatur vel molestiae illum repellendus quam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maiores consectetur laboriosam quasi sit ducimus voluptas praesentium dignissimos ut cum! Alias ad delectus ipsa pariatur vel molestiae illum repellendus quam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maiores consectetur laboriosam quasi sit ducimus voluptas praesentium dignissimos ut cum! Alias ad delectus ipsa pariatur vel molestiae illum repellendus quam?
                  </Text>
                  {/* 在 Android 环境下可能产生底部内容未展示完全的问题，可以根据判断环境来决定是否需要增加一个有高度的 View */}
                  <View style={{ height: 'android' === Platform.OS ? 100 : 0 }}></View>


            </ScrollView>

            {/* 安全区域可视视图 */}
            {/* 如果屏幕上有刘海屏，那么使用 safeAreaView 会避开刘海屏，从而不会被遮挡任何内容，这是 View、ScollView 没有的功能 */}
            {/* <safeAreaView></safeAreaView> */}

            {/* 分组列表 */}
            <SectionList></SectionList>


            {/* 轮播图组件，因为其轮播图是超出视图区域的，所以应该使用 ScrollView 组件来包裹，如果使用 View 组件包裹，则会不显示内容 */}
            <ScrollView>
                  <Swiper
                        style={[styles.wrapper]}
                        // 是否显示左右切换按钮
                        showsButtons={true}
                        // 是否自动播放，默认为 false
                        autoplay={true}
                  >
                        <Image style={[styles.swiperItemImage]} source={require('./images/o1.jpg')} />
                        <Image style={[styles.swiperItemImage]} source={require('./images/o1.jpg')} />
                        <Image style={[styles.swiperItemImage]} source={require('./images/o1.jpg')} />
                  </Swiper>
            </ScrollView>

            {/* 相机 */}
            <RNCamera
                  ref={cameraRef}
                  // 摄像头前置后置摄像头配置，这里选择后置, 后面将 back 设置为 front 便是前置摄像头
                  type={RNCamera.Constants.Type.back}
                  // 是否开启闪光灯
                  flashMode={RNCamera.Constants.FlashMode.on}
                  // 关于相机授权许可配置
                  androidCameraPermissionOptions={{
                        title: '是否允许使用摄像头',
                        message: '我们想使用您的摄像头，是否允许授权？',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel'
                  }}
                  // 关于麦克风的授权配置
                  androidRecordAudioPermissionOptions={{
                        title: "是否允许使用麦克风",
                        message: '我们想使用您的麦克风，是否允许授权？',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel'
                  }}
                  // 调用 Google 的条形检测
                  onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes)
                  }}
            />
            <Button title='拍照' onPress={async () => {
                  if (cameraRef) {
                        const options = { quality: 0.5, base64: true }
                        const data = await cameraRef.current?.takePictureAsync(options)
                        Alert.alert(data.uri)
                  } else {
                        console.log('未获取到对象')
                  }
            }} />
            <View style={[styles.imagePickerContainer]}>
                  <TouchableOpacity onPress={changeImage}>
                        <View style={[styles.avatarImage]}>
                              <Image source={curImagePickerData} />
                        </View>
                  </TouchableOpacity>
            </View>

            {/* 存放路由内容，一般来说，该组件放到项目中主组件，也就是 main.tsx 中作为根组件 */}
            <NavigationContainer>
                  {/* Stack 路由方案 */}
                  <Stack.Navigator
                        // 初始化路由，标识默认加载的路由
                        initialRouteName='Details'
                  // headerMode 头部效果，相当于页面顶部的提示，类似于浏览器页面名称
                  // float: IOS 头部效果
                  // screen: Android 头部效果
                  // node: 不显示头部
                  >
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                  </Stack.Navigator>

                  {/* BottomTab 方案 */}
                  {/* <BottomTabNav.Navigator
                        // 设置底部导航内容
                        screenOptions={({ route }) => ({
                              tabBarIcon: ({ focused, color, size }) => {
                                    const iconName = 'Home' === route.name ? (focused ? 'add-circle' : 'add-circle-outline') : (focused ? 'person' : 'person-outline')
                                    return <Ionicons name={iconName} size={size} color={color} />
                              }
                        })}
                        tabBarOptions={{
                              activeTintColor: 'tomato',
                              inactiveTintColor: 'gray'
                        }}
                  >
                        <BottomTabNav.Screen name="Home" component={HomeScreen} />
                        <BottomTabNav.Screen name="Details" component={DetailsScreen} />
                  </BottomTabNav.Navigator> */}

                  {/* Drawer 导航方案 */}
                  {/* <DrawerRouter.Navigator
                        // 菜单显示位置，left(默认) | right
                        drawerPosition='left'
                        // 菜单动画效果： front | back | slide |permanent, 如果使用 slide，那么在弹窗弹出时，页面会随着弹出方向移动；如果使用 permanent ，那么菜单会一直存在，
                        drawerType='front'
                        // 菜单样式
                        drawerStyle={{ backgroundColor: 'gray' }}
                        // 选中菜单项样式
                        drawerContentOptions={{
                              // 当前选中菜单字体颜色
                              activeTintColor: 'red',
                              // 所有菜单项样式
                              itemStyle: {}
                        }}
                  > */}
                  {/* 以下为弹窗中出现的内容 */}
                  {/* <DrawerRouter.Screen
                              options={{
                                    // 菜单标题
                                    title: '首页',
                                    // 替代 title，返回复杂的组件{focuesed: boolean, color: string}
                                    drawerLabel: ({ focused, color }) => { return ''},
                                    // 返回图标的函数 {focused: boolean, color: string, size: number}
                                    drawerIcon: ({ focused, color, size }) => {return <></> },
                                    // 是否显示header。布尔型，默认 false 不显示
                                    headerShown: false,
                                    // 函数，声明 header 左侧的显示内容
                                    headerLeft: () => { },
                                    // 函数，声明 header 右侧的显示内容
                                    headerRight: () => { },
                              }}
                              name="Home" component={HomeScreen} />
                        <DrawerRouter.Screen name="Details" component={DetailsScreen} />
                  </DrawerRouter.Navigator> */}

                  {/* materialTopTap 导航 */}
                  {/* <MaterialTopTap.Navigator
                        // tab 显示位置。默认 top，可以设置 bottom
                        tabBarPosition={'top'}
                        // 包含 tabBar 组件属性的对象
                        tabBarOptions={{
                              // 当前菜单的标题或者图标颜色
                              activeTintColor: 'red',
                              // 非当前菜单的标题或图标颜色
                              inactiveTintColor: 'blue',
                              // 是否显示图标，默认为 false
                              showIcon: false,
                              // 是否显示文字，默认 true
                              showLabel: true,
                              // 标签样式对象
                              tabStyle: {},
                              // 标签文字样式对象，这里指定的颜色，会覆盖 activeTintColor 和 inactiveTintColor 的值
                              labelStyle: {},
                              // 图标样式对象
                              iconStyle: {}
                        }}
                  >
                        <MaterialTopTap.Screen
                              name='首页'
                              component={HomeScreen}
                              options={{
                                    // 标题
                                    title: '首页',
                                    // 设置标签图标（需要先在 Navigator 中指定 showIcon 为 true）
                                    // 函数，包含两个参数： focused: boolean 、color: string
                                    tabBarIcon: ({ focused, color }){

                                    },
                                    // 设置标签文字内容（当未定义时，会使用 title 值）
                                    // 函数，包含两个参数： focused: boolean 、color: string
                                    tabBarLabel: ({ focused, color }){

                                    }
                              }}
                        ></MaterialTopTap.Screen>
                        <MaterialTopTap.Screen
                              name='详情页'
                              component={DetailsScreen}
                              options={{
                                    // 标题
                                    title: '详情',
                                    // 设置标签图标（需要先在 Navigator 中指定 showIcon 为 true）
                                    // 函数，包含两个参数： focused: boolean 、color: string
                                    tabBarIcon: ({ focused, color }){

                                    },
                                    // 设置标签文字内容（当未定义时，会使用 title 值）
                                    // 函数，包含两个参数： focused: boolean 、color: string
                                    tabBarLabel: ({ focused, color }){

                                    }
                              }}
                        ></MaterialTopTap.Screen>
                  </MaterialTopTap.Navigator> */}

            </NavigationContainer>
      </View>
}


const styles = StyleSheet.create({
      dimensionsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap'
      },
      dimensionsItemBase: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00b38a',
            // 获取屏幕宽度，然后分成四等份，这样能适配所有手机
            width: Dimensions.get('window').width / 4,
            height: 90,
            // 边框不符合复合写法，需要单独写
            borderWidth: 2,
            borderColor: 'red',
            // rn 样式不会有继承性，只能单独设置样式在 text 标签上
            fontSize: 18
      },
      input: {
            width: Dimensions.get('window').width - 20,
            margin: 10,
            borderWidth: 1,
            borderColor: 'red',
            paddingHorizontal: 5
      },
      touchableItem: {
            margin: 10,
            padding: 6,
            borderColor: 'green',
            borderWidth: 1
      },
      scrollView: {

      },
      scrollViewText: {
            fontSize: 30
      },
      wrapper: {
            height: 200,
      },
      swiperItemImage: {
            height: 200,
            width: Dimensions.get('window').width
      },
      imagePickerContainer: {
            margin: 10
      },
      avatarImage: {
            borderRadius: 50,
            height: 200,
            width: 200
      }
})