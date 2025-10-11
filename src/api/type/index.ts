import {  AxiosResponse } from 'axios'
import axios from '../index'

// 列表
export const getTypeList = ({data}): Promise<AxiosResponse> => {
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
export const getTypeInfo = ({url,params}): Promise<AxiosResponse> => {
    return axios({
        url,
        params
    })
}

// 修改
export const updateTypeItem = ({url,data}): Promise<AxiosResponse> =>{
    return axios({
        method: "put",
        url,
        data
    })
}


// 删除
export const delTypeItem = ({url}): Promise<AxiosResponse> => {
    return axios({
        method: "delete",
        url
    })
}
