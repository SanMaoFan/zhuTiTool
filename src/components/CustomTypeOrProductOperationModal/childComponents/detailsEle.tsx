// plugins
import { useState, useEffect } from 'react'

// components
import { View, Text, StyleSheet, Button } from 'react-native'
import LoadingEle from '@/components/CustomLoadingEle'
import AndroidToastEle from '@/components/CustomAndroidToastEle'

// api
import { getTypeInfo } from '@/api/type'
import { getProductInfo } from '@/api/product'


// interface 
// props
interface PropsInterface {
    curType: 'type' | 'product'
    curId: string
    resetDialog: () => void
}

// formData
interface DetailsDataInterface {
    createDate: string,
    parentName: string,
    productDescript: string,
    productName: string,
    typeName: string,
    typeDescript: string
}

export default function DetailsEle({ curType, curId, resetDialog }: PropsInterface): React.ReactNode {

    // state
    // 数据对象
    const [detailsData, setDetailsData] = useState<Partial<DetailsDataInterface>>({})
    // loading
    const [isLoading, setLoading] = useState(false)
    // 渲染用的数据
    const [reloadData] = useState<{ name: string, key: string, fn?: () => string }[]>(() => {
        const typeColumnList = [
            {
                key: 'typeName',
                name: "分类名称"
            },
            {
                key: 'typeDescript',
                name: "分类介绍"

            }
        ]
        const productColumnList = [
            {
                key: 'productName',
                name: "物品名称"
            },
            {
                key: 'parentName',
                name: '所属分类'
            },
            {
                key: 'productDescript',
                name: "物品介绍"
            },

        ]
        const list = [
            {
                key: 'createDate',
                name: '创建时间',
                fn(data: string) {
                    return new Date(data).toLocaleString('zh')
                }
            }
        ]
        list.unshift('type' === curType ? typeColumnList : productColumnList)
        return list.flat(Infinity)
    })

    // function
    // 请求
    async function getDetails() {
        try {
            setLoading(true)
            const requestFn = 'type' === curType ? getTypeInfo : getProductInfo
            const { status, data, message } = await requestFn(curId)
            if (200 === status) {
                const {
                    createDate,
                    parentName,
                    productDescript,
                    productName,
                    typeName,
                    typeDescript
                } = data
                const dataObj = Object.assign({
                    createDate
                }, 'type' === curType ? {
                    typeName,
                    typeDescript
                } : {
                    parentName,
                    productDescript,
                    productName,
                })
                setDetailsData(dataObj)
            } else {
                console.log("请求失败：", message)
                AndroidToastEle('请求失败！')
            }
        } catch (e) {
            AndroidToastEle('网络出错，请稍后再试！')
            console.log('get details error:', e)
        } finally {
            setLoading(false)
        }



    }

    // effect
    useEffect(() => {
        getDetails()
    }, [])


    return (
        <View style={styles.container}>
            {/* loading */}
            <LoadingEle loading={isLoading}></LoadingEle>
            <View style={styles.item}>
                <Text>类型：{'type' === curType ? '分类' : '物品'}</Text>
            </View>
            {
                reloadData.map(item => {
                    return <View key={item.key} style={styles.item}>
                        <Text>{item.name}：{item.fn ? item.fn(detailsData[item.key]) : detailsData[item.key]}</Text>
                    </View>
                })
            }

            {/* 关闭 */}
            <View style={styles.btn}>
                <Button title="关闭" onPress={resetDialog} />
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    item: {
        padding: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    btn: {
        marginTop: 30
    }
})