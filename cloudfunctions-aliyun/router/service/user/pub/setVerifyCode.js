module.exports = {
  /**
   * 设置验证码
   * @url user/pub/setVerifyCode 前端调用的url参数地址
   * @description 设置验证码
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
   * @params {String} email  邮箱  
	 * @params {String} mobile 手机号  
	 * @params {String} type  验证码类型
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {String} email 邮箱  
	 * @params {String} mobile 手机号  
	 * @params {String} verifyCode 验证码
   */
  main: async (event) => {
		let { data = {}, util } = event;
		let { uniID } = util;
		let { email, mobile, code, type } = data;
		let res = {code : -1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.setVerifyCode(data);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}