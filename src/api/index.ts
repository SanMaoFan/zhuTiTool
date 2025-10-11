import axios, { AxiosRequestConfig, AxiosResponse } from "axios"


// 创建实例
const axiosInterface = axios.create({
    baseURL: "http://192.168.31.63:8888/api/v1",
    timeout: 30000,
    responseType: "json"
})

// 拦截器
// 请求前
axiosInterface.interceptors.request.use((config) => {
    // console.log('config', config)
    return config
}, (err) => {
    console.log('request before error: ', err)
    return Promise.reject(err)
})


// 请求后
axiosInterface.interceptors.response.use((res) => {
    // console.log('请求的内容', res)
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