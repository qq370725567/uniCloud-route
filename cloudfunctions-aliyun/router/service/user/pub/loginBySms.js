module.exports = {
  /**
   * 手机号登陆(手机号+手机验证码)
   * @url user/pub/loginBySms 前端调用的url参数地址
   * @description 手机号登陆(手机号+手机验证码)
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} mobile 手机号
	 * @params {String} code 验证码
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
		res = await uniID.loginBySms(event.data);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}