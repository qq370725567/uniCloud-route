module.exports = {
  /**
   * 用户登录(支付宝授权)
   * @url user/pub/loginByAlipay 前端调用的url参数地址
   * @description 用户登录(支付宝授权)
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} code 支付宝登录返回的code
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {String} token 登录成功之后返回的token信息
	 * @params {String} tokenExpired token过期时间
   */
  main: async (event) => {
		let {uniID} = event.util;
    let res = {};
    // 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.loginByAlipay(event.data.code);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}