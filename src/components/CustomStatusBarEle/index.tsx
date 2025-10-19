// components
import { StatusBar } from 'react-native'

export default function CustomStatusBarEle() {
    return <StatusBar
        translucent={true}
        backgroundColor="#1D5E87"
        barStyle={'dark-content'} // 设置文字颜色
    />
}