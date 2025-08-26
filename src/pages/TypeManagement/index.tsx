// plugins
import { useRef, useState } from 'react'

// components
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { SearchBar } from '@rneui/themed'


// style
import commonStyles from '@/common/styles'

export default function TypeManagement() {


      // ref
      const JSearchBar = useRef(null)

      // state
      // 搜索词
      const [searchVal, setSearchVal] = useState('')
      // loading
      const [showLoading, setShowLoading] = useState(false)
      // 列表数据
      const [listData, setListData] = useState([
            {
                  id: 'x',
                  title: '测2试'
            }, {
                  id: '1x',
                  title: '测1试'
            }, {
                  id: '2x',
                  title: '测1试'
            }
      ])


      return <View style={styles.container}>

            {/* 搜索栏 */}
            <SearchBar

                  ref={JSearchBar}
                  round
                  containerStyle={[commonStyles.basicBackgroundColor, styles.searchContainer]}
                  placeholder='请输入搜索词'
                  onChangeText={setSearchVal}
                  value={searchVal}
                  showLoading={showLoading}
                  onKeyPress={({ nativeEvent: { key } }) => {
                        if ('Enter' === key) {
                              setShowLoading(true)
                              setTimeout(() => {
                                    setShowLoading(false)
                              }, 1000)
                        }

                  }}

            ></SearchBar>
            {/* 列表 */}
            <SafeAreaView>
                  <FlatList
                        data={listData}
                        renderItem={({ item }) => {
                              return <View>
                                    <Text>{item.title}</Text>

                              </View>
                        }}
                        keyExtractor={item => item.id}

                  ></FlatList>
            </SafeAreaView>
      </View>
}



const styles = StyleSheet.create({
      container: {

      },
      searchContainer: {
      }
})