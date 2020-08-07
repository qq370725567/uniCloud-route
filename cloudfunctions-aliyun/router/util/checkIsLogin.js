module.exports = {
  /**
   * 检测客户端用户是否已登陆
   */
  main: async (event) => {
		let {uniID} = event.util;
		let res = {code :-1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
		// 在这里可以自己写自己的检测登陆逻辑
		let payload = await uniID.checkToken(event.uniIdToken);
		if (payload.code && payload.code > 0) {
			return payload;
		}
		let userInfo = payload.userInfo;
		// 去除token字段和password字段
		delete userInfo.token;
		delete userInfo.password;
		res.uid = payload.uid;
		res.userInfo = userInfo;
		res.code = 0;
		res.msg = 'ok';
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}