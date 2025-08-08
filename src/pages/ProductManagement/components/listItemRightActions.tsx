import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Reanimated, {
      SharedValue,
      useAnimatedStyle,
} from 'react-native-reanimated';


// 渲染列表右侧按钮
export default function RenderListRightEle(prog: SharedValue<number>, drag: SharedValue<number>, swipeableMethods: any) {
      const styleAnimation = useAnimatedStyle(() => {
            return {
                  transform: [{ translateX: drag.value + 48 }],
            }
      })
      return <Reanimated.View style={styleAnimation}>
            <View style={styles.rightActionsContainer}>
                  <Text style={styles.rightActionsText} onPress={() => { console.log(`点击了按钮`); swipeableMethods.close() }}>
                        删除
                  </Text>

            </View>
      </Reanimated.View>
}

const styles = StyleSheet.create({
      rightActionsContainer: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            paddingHorizontal: 10
      },
      rightActionsText: {
            color: 'white'
      }
})