module.exports = {
  /**
   * 设置头像
   * @url user/kh/setAvatar 前端调用的url参数地址
   * @description 设置当前登录用户的头像
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} uid 用户Id，可以通过checkToken返回
	 * @params {String} avatar 用户头像URL
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
   */
  main: async (event) => {
		let {uniID} = event.util;
    let res = {};
    // 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.setAvatar(event.data);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}