import {  AxiosResponse } from 'axios'
import axios from '../index'

// 列表
export const getTypeList = (data): Promise<AxiosResponse> => {
    return axios({
        method: "post",
        url: "/type",
        data
    })
}

// 新增
export const addTypeItem = ({data}): Promise<AxiosResponse> => {
    return axios({
        method: "post",
        url: '/type/add',
        data
    })
}

// 详情
export const getTypeInfo = (params): Promise<AxiosResponse> => {
    return axios({
        url: `/type/${params.id}`,
        params
    })
}

// 修改
export const updateTypeItem = (data): Promise<AxiosResponse> =>{
    return axios({
        method: "put",
        url: `/type/${data.id}`,
        data
    })
}


// 删除
export const delTypeItem = (id: string): Promise<AxiosResponse> => {
    return axios({
        method: "delete",
        url: `/type/${id}`
    })
}
