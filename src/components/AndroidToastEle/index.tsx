// components
import {ToastAndroid} from 'react-native'



export default function AndroidToastEle(title: string){
    return ToastAndroid.showWithGravity(title, ToastAndroid.SHORT, ToastAndroid.TOP)
}