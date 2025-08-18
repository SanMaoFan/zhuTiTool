// plugins
import { useState } from 'react'

// components
import { View, SafeAreaView, ScrollView, Text, StyleSheet, Button, Dimensions } from 'react-native'
import { Tab, TabView, Icon, Input } from '@rneui/themed'


interface Props {
      setShowModal: (show: boolean) => void
}


// 操作类型或商品
export default function OperateTypeOrProduct({
      setShowModal
}: Props) {

      // state
      // 当前 tab
      const [curTabIndex, setCurTabIndex] = useState(0)

      return (
            <View style={styles.container}>
                  {/* <View style={[styles.closeBtn, { paddingTop: 0 }]} >
                        <Button onPress={() => setShowModal(false)} title='关闭弹窗' />
                  </View> */}

                  {/* 内容区域 */}

                  {/* 类型切换 */}

                  <Tab
                        value={curTabIndex}
                        onChange={(e) => {
                              {
                                    console.log('tab 数据', e)
                                    setCurTabIndex(e)
                              }
                        }}
                        // 指示器样式
                        indicatorStyle={{
                              backgroundColor: 'white',
                              height: 3
                        }}
                        variant="primary"
                  >
                        <Tab.Item
                              title="分类"
                              titleStyle={{ fontSize: 14 }}
                              icon={{ name: 'MinusOutlined', type: 'icons', color: '#fff' }}


                        />
                        <Tab.Item
                              title="物品"
                              titleStyle={{ fontSize: 14 }}
                              icon={({ name: 'profileOutlined', type: 'antdesign', color: '#fff' })}
                        />
                  </Tab>

                  <TabView
                        value={curTabIndex} onChange={setCurTabIndex} animationType="spring"
                        containerStyle={styles.tabViewContainer}

                  >
                        <TabView.Item style={[styles.tabViewContainerItem]}>

                              <ScrollView style={styles.tabViewContainerItemContent}>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>
                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Text>分类</Text>

                                    <Input
                                          placeholder='BASIC INPUT'
                                    />
                              </ScrollView>
                        </TabView.Item>
                        <TabView.Item style={[styles.tabViewContainerItem]}>
                              <SafeAreaView style={styles.tabViewContainerItemContent}>

                                    <Text style={{ color: 'black' }}>物品</Text>


                                    <Text style={{ color: 'black' }}>物品</Text>


                                    <Text style={{ color: 'black' }}>物品</Text>


                                    <Text style={{ color: 'black' }}>物品</Text>


                                    <Text style={{ color: 'black' }}>物品</Text>


                                    <Text style={{ color: 'black' }}>物品</Text>
                              </SafeAreaView>
                        </TabView.Item>
                  </TabView>




                  {/* <View style={[styles.closeBtn]} >
                        <Button onPress={() => setShowModal(false)} title='关闭弹窗' />
                  </View>
                  <Text>
                        分类
                  </Text> */}
            </View >
      )
}

const styles = StyleSheet.create({
      container: {
            paddingHorizontal: 10,

      },
      tabViewContainer: {
            height: 400,
      },
      tabViewContainerItem: {
            flex: 1,
            paddingHorizontal: 20,
            height: 200,
            backgroundColor: 'red'

      },
      tabViewContainerItemContent: {
            flex: 1,
            height: 200,
            backgroundColor: 'blue'
      },
      closeBtn: {
            paddingVertical: 20
      }
})