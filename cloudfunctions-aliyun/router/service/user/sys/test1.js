module.exports = {
  /**
   * 此函数名称
   * @url user/sys/test1 前端调用的url参数地址
   * @description 此函数描述
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {String} userInfo 当前登录用户信息(同理,是可信任的)(只有kh函数才带此参数)
   * @params {Object} util 公共工具包
   * @params {Object} originalParam 原始请求参数(包含了原始event和context)
   * data 请求参数 说明
   * @params {String} uid  当前登录用户id,若用户已登录且token有效,则data中会带uid参数
   * (此参数是后端过滤器通过token获取并添加到data中的,是可信任的)(只有kh函数才带此参数)
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
    let { data = {}, userInfo, util, originalParam } = event;
    let { uniID, pubFun, db, _ } = util;
    let { uid } = data;
    let res = {code : -1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
    // 可写与数据库的交互逻辑等等
    
    
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}