// 关于存储第三方组件的封装

// 存储的第三方组件
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  /**
   * @description 存储数据
   * @param {string} key
   * @param {mixed} value
   * @returns {Promise}
   */
  static set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @description 获取数据
   * @param {string} key
   * @returns {Promise}
   */
  static get(key) {
    return AsyncStorage.getItem(key)
      .then(value => {
        if (value && '' !== value) {
          return JSON.parse(value);
        }
      })
      .cathc(() => null);
  }

  /**
   * @description 更新数据
   * @param {string} key
   * @param {mixed} value
   * @returns {Promise}
   */
  static updateData(key, value) {
    // 获取数据
    this.get(key).then(oldData => {
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
  static delete(key) {
    if (null == key) {
      // 如果没有 key，则一次性清空数据
      return AsyncStorage.clear();
    } else {
      // 有 key，则清除对应指定数据
      return AsyncStorage.removeItem(key);
    }
  }
}
