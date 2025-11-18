// 关于存储第三方组件的封装

// 存储的第三方组件
import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  /**
   * @description 存储数据
   * @param {string} key
   * @param {mixed} value
   * @returns {Promise}
   */
  public set(key: string, value: unknown) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @description 获取数据
   * @param {string} key
   * @returns {Promise}
   */
  public get(key: string) {
    return AsyncStorage.getItem(key)
      .then((value: any) => {
        if (value && '' !== value) {
          return JSON.parse(value);
        }
      })
      .catch(() => null);
  }

  /**
   * @description 更新数据
   * @param {string} key
   * @param {mixed} value
   * @returns {Promise}
   */
  public updateData(key: string, value: unknown) {
    // 获取数据
    this.get(key).then((oldData: unknown) => {
      // 存储数据
      const newValue =
        typeof value === 'string' ? value : Object.assign({}, oldData, value);
      return this.set(key, newValue);
    });
  }

  /**
   * @description 删除数据
   * @param {string} key
   * @returns {Promise}
   */
  public delete(key: string) {
    if (null == key) {
      // 如果没有 key，则一次性清空数据
      return AsyncStorage.clear();
    } else {
      // 有 key，则清除对应指定数据
      return AsyncStorage.removeItem(key);
    }
  }
}

export default new Storage()
