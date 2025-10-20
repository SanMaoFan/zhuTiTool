// components
import { View, ActivityIndicator, StyleSheet } from 'react-native'

// plugins
import { useState, useEffect } from 'react'


export default function LoadingEle({ loading }: { loading: boolean }) {
    // loading
    const [showLoading, setShowading] = useState(false)

    useEffect(() => {
        setShowading(loading)
    }, [loading])


    return (
        <>
            {/* loading */}
            {showLoading && <View style={styles.loadingEle}>
                <ActivityIndicator size='large' animating={true} ></ActivityIndicator>
            </View>}
        </>
    )
}


const styles = StyleSheet.create({
    loadingEle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
})