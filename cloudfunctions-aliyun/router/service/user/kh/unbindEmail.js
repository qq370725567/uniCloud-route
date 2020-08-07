module.exports = {
  /**
   * 解绑邮箱
   * @url user/kh/unbindEmail 前端调用的url参数地址
   * @description 当前登录用户解绑邮箱
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} uid 用户Id，可以通过checkToken返回
	 * @params {String} email 邮箱
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
   */
  main: async (event) => {
		let {uniID} = event.util;
    let res = {};
    // 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.unbindEmail(event.data);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}