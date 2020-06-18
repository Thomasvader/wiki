/**
 * 
 */

class Aftersoil {

  constructor() {
    
  }

  /**
   * 设置 setCookie
   * @param {String} key cookie 名称
   * @param {String} value cookie 值
   * @param {String} path cookie 路径
   * @param {String} cycle cookie 的生命周期，单位天
   * @example 用法
   * 设置名为 _token 值为 tokenValue 到域名根路径，过期时间为1-9天
   * setCookie('_token', demo, '/', 3)
   */
  setCookie({ key, value, path = '/', cycle = 1 }) {
    // 获取当前时间
    let date = new Date();
    // 将 date 设置为 n 天后的时间
    date.setDate(date.getDate() + cycle);
    
    path = path ? ';path=' + path : '';
    // 对英文数字汉字进行加密
    value = window.btoa(window.encodeURIComponent(value));

    // 设置 cookie
    document.cookie = `${key}=${value};expires=${date.toGMTString()}path${path}`;

    return {
      name: key,
      path: path,
      day: cycle,
      active: `${key} 设置成功`
    }
  }

  /**
   * 获取 getCookie 值
   * @param {String} key cookie 名称
   */
  getCookie(key) {
    let set = document.cookie.split(";");

    // 先判断 key 传入的值是否 undefined 如果为 undefined 则返回全部的 cookie，其余则返回传入的值
    if (key !== undefined) {
      
      // 遍历切割
      for (const iterator of set) {
        // 以 = 号进行切割
        let tempKey = iterator.split("=");

        // 判断是否有与 key 相等的值
        if (tempKey[0].trim() === key) {
          // 返回对象 值和数据
          return {
            key: tempKey[0].trim(),
            // 解密
            value: window.decodeURIComponent(window.atob(tempKey[1]))
          }
        }
        
      }
    }
    
    // 返回去全部 cookie 数据
    return set
  }

  /**
   * 删除 removeCookie
   * @param {String} key cookie 名称
   * @param {String} path cookie 路径
   */
  removeCookie(key, path) {
    
    this.setCookie({
      key,
      value: "",
      path,
      cycle: -1
    })

    return {
      message: `${key} cookie 删除成功`
    }
  }
}

export default new Aftersoil;
