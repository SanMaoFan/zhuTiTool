import { AxiosResponse } from 'axios'
import axios from '../index'


// 列表
export const getProductList = ({ data }): Promise<AxiosResponse> => {
    return axios({
        method: "post",
        url: '/product',
        data
    })
}

// 新增
export const addProductItem = ({data}): Promise<AxiosResponse> => {
    return axios({
        url: '/product/add',
        data
    })
}


// 详情
export const getProductInfo = ({ url, params }): Promise<AxiosResponse> => {
    return axios({
        url,
        params
    })
}

// 更改
export const updateProductItem = ({ data, url }): Promise<AxiosResponse> => {
    return axios({
        method: "put",
        url,
        data
    })
}

// 删除
export const delProductItem = ({ url }): Promise<AxiosResponse> => {
    return axios({
        method: "delete",
        url
    })
}