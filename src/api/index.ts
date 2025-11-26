

import axios, { AxiosRequestConfig, AxiosResponse, type CancelTokenSource, type InternalAxiosRequestConfig } from "axios"
// utils
import Storage from '@/utils/storage'
import { resetLoginHandle, simpleUUID } from '@/utils'



// 创建实例
const axiosInterface = axios.create({
    baseURL: "http://192.168.31.63:8888/api/v1",
    timeout: 30000,
    responseType: "json"
})

const CancelToken = axios.CancelToken
// 请求收集器
const cancelTokensMap: any = new Map()

// 拦截器
// 请求前
axiosInterface.interceptors.request.use(async (config: InternalAxiosRequestConfig<any> & { [key: string]: any }) => {
    // 设置 token
    const token = await Storage.get('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    const source = CancelToken.source()
    // 获取 UUID 
    const UUID = simpleUUID()
    config.UUID = UUID
    config.cancelToken = source.token
    cancelTokensMap.set(UUID, source)
    return config
}, (err) => {
    console.log('request before error: ', err)
    return Promise.reject(err)
})


// 请求后
axiosInterface.interceptors.response.use((res) => {
    const { data } = res
    const { status } = data
    if (401 === status) {
        // 取消所有请求
        cancelTokensMap.forEach((source: CancelTokenSource) => source.cancel("所有请求取消"))
        // 跳转登录页并提示 token 失效
        resetLoginHandle()
    } else {
        cancelTokensMap.delete(res.config.UUID)
    }
    return res.data
}, (err) => {
    console.log("response after error:", err)
    return Promise.reject(err)
})

const axiosRequestFn = ({
    method = 'get',
    url,
    params,
    data,
    ...other
}: AxiosRequestConfig): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        return axiosInterface({
            method,
            url,
            params,
            data,
            ...other
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}







export default axiosRequestFn