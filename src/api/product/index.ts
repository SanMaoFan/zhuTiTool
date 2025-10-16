import { AxiosResponse } from 'axios'
import axios from '../index'


// 列表
export const getProductList = ({data}): Promise<AxiosResponse> => {
    return axios({
        method: "post",
        url: '/product',
        data
    })
}

// 新增
export const addProductItem = (data): Promise<AxiosResponse> => {
    return axios({
        method: "post",
        url: '/product/add',
        data
    })
}


// 详情
export const getProductInfo = (id: string): Promise<AxiosResponse> => {
    return axios({
        url: `/product/${id}`,

    })
}

// 更改
export const updateProductItem = (data): Promise<AxiosResponse> => {
    return axios({
        method: "put",
        url: `/product/${data.id}`,
        data
    })
}

// 删除
export const delProductItem = (id: string): Promise<AxiosResponse> => {
    return axios({
        method: "delete",
        url: `/product/${id}`
    })
}