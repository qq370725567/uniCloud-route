module.exports = {
  /**
   * 用户注册(账号+密码)
   * @url user/pub/register 前端调用的url参数地址
   * @description 用户注册(账号+密码)
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} username 用户名，唯一
	 * @params {String} password 密码
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {String} token 注册完成自动登录之后返回的token信息
	 * @params {String} tokenExpired token过期时间
   */
  main: async (event) => {
		let {uniID} = event.util;
    let res = {};
    // 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.register(event.data);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}