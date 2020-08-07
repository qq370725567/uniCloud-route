module.exports = {
  /**
   * 检测后台用户是否已登陆,且有对应的权限
   * url  云函数地址
   * data 请求参数
   */
  main: async (event) => {
    let res = {code :-1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
		// 在这里可以自己写自己的检测后端用户权限逻辑
		let key = false;
		if(key){
			res.code = 0;
			res.msg = 'ok';
			res.loginId = 'qwertyuiopasdfghjklzxcvbnm'; // 当前登陆的用户id
		}else{
			res.code = 403;
			res.msg = '权限不足';
		}
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}