import { View, StyleSheet, Button } from 'react-native'


export default function User({ navigation }) {
      return <View style={styles.container}>

            <Button title="返回" onPress={() => navigation.navigate('Home')} />

      </View>
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
      }
})