// plugin
import { useState, useEffect } from 'react'

// components
import { Modal, View, Text, StyleSheet } from 'react-native'
import OperateTypeOrProduct from './childComponents/operateTypeOrProduct'
import DetailsEle from './childComponents/detailsEle'



// interface 
interface PropsInterface {
    openModal: boolean
    editId: string
    operationType: string
    infoType: 'type' | 'product'
    resetDialogCallback: () => void
    resetRequestCallback: (data: any) => void
    onRequestClose: () => void
}

export default function TypeOrProductOperationModal({
    openModal,
    editId,
    operationType,
    infoType,
    resetDialogCallback,
    resetRequestCallback,
    onRequestClose
}: PropsInterface) {


    return (
        <Modal animationType='slide'
            transparent={false}
            visible={openModal}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalTextView}>
                <Text style={styles.modalTitle}>
                    {
                        'add' === operationType
                            ? '新增' : ['updateType', 'updateProduct'].includes(operationType)
                                ? '编辑' : 'details' === operationType ?
                                    '详情' : ''
                    }
                </Text>

            </View>
            {
                ['add', 'updateType', 'updateProduct'].includes(operationType)
                    ? <OperateTypeOrProduct
                        type={operationType}
                        editId={editId}
                        submitCallback={resetRequestCallback}
                    ></OperateTypeOrProduct>
                    : ['details'].includes(operationType)
                        ? <DetailsEle curType={infoType} curId={editId}
                            resetDialog={resetDialogCallback}></DetailsEle> : <></>
            }
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalTextView: {

    },
    modalTitle: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
        backgroundColor: '#257BB1'

    },
})