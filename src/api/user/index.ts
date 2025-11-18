import { AxiosResponse } from 'axios'
import axios from '../index'


// 登录
export function userLogin(data: { userPhone: string, userPwd: string }): Promise<AxiosResponse> {
    return axios({
        url: '/user/login',
        method: 'post',
        data
    })
}