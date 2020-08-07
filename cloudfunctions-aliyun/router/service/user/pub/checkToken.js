module.exports = {
  /**
   * 验证token是否有效
   * @url user/pub/checkToken 前端调用的url参数地址
   * @description 验证token是否有效(会返回uid)
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {String} uid 当前token对应的用户uid
	 * @params {String} iat 当前token创建时间
	 * @params {String} exp 当前token过期时间
   */
  main: async (event) => {
		let {uniID} = event.util;
    let res = {};
    // 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.checkToken(event.uniIdToken);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}