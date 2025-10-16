// plugins
import { useState, useEffect } from 'react'

// components
import { View, StyleSheet } from 'react-native'

// api
import { getTypeInfo } from '@/api/type'
import { getProductInfo } from '@/api/product'


// interface 
// props
interface PropsInterface {
    type: 'type' | 'product' 
    id: string
}

// formData
interface DetailsDataInterface {
    name: string
    descript: string
    parentName: string
    createData: string
}

export default function DetailsEle({ type, id }: PropsInterface): React.ReactNode {

    // state
    // 数据
    const [detailsData, setDetailsData] = useState<DetailsDataInterface>({
        name: '',
        descript: '',
        parentName: '',
        createData: '',
    })

    // function
    // 请求
    async function getDetails() {
        const requestFn = 'type' === type ? getTypeInfo : getProductInfo


    }

    return (
        <View style={styles.detailsContainer}>
            

        </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1
    }
})