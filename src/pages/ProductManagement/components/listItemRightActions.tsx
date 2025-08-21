
// components
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Reanimated, {
      SharedValue,
      useAnimatedStyle,
} from 'react-native-reanimated';




// 渲染列表右侧按钮
export default function RenderListRightEle(
      setDialog: (type: string, id: string) => void,
      id: string,
      prog: SharedValue<number>,
      drag: SharedValue<number>,
      swipeableMethods: any,) {
      const styleAnimation = useAnimatedStyle(() => {
            return {
                  transform: [{ translateX: drag.value + 96 }],
            }
      })
      return <Reanimated.View style={styleAnimation}>
            {/* 按钮 */}
            <View style={styles.rightActionsContainer}>
                  <View style={[styles.actionItem, styles.updateBtn]}>
                        <Text style={styles.rightActionsText} onPress={() => {
                              setDialog('update', id)
                              console.log(`点击了编辑按钮`);
                              swipeableMethods.close()
                        }}>
                              编辑
                        </Text>
                  </View>
                  <View style={[styles.actionItem, styles.delBtn]}>
                        <Text style={styles.rightActionsText} onPress={() => {
                              setDialog('del', id)
                              console.log(`点击了删除按钮`);
                              swipeableMethods.close()
                        }}>
                              删除
                        </Text>
                  </View>
            </View>
            {/* 删除提示窗 */}

      </Reanimated.View>
}

const styles = StyleSheet.create({
      rightActionsContainer: {
            width: 96,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            height: 50,
            paddingHorizontal: 10,
      },
      actionItem: {
            width: 48,
            alignItems: 'center',
            justifyContent: 'center'
      },
      updateBtn: {
            backgroundColor: '#EBBA66',

      },
      delBtn: {
            backgroundColor: '#E56D57',

      },
      rightActionsText: {
            color: 'white'
      }
})