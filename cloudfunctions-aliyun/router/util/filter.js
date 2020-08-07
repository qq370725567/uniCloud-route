module.exports = {
  /**
   * 全局过滤器
   * url  云函数地址
   * data 请求参数
   */
  main: async (event) => {
		let {url, data} = event;
		let res = {code :-1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
		if(url.indexOf('/pub/') > -1){
			// pub函数为所有人都可以访问,不限制
			res.code = 0;
			res.msg = 'ok';
		}else if(url.indexOf('/kh/') > -1){
			// kh函数为必须登录后才能访问的函数(客户端用户)
			const service  = require(__dirname+'/checkIsLogin');
			res = await service.main(event);
		}else if(url.indexOf('/sys/') > -1){
			// sys函数为后端管理人员才能访问的函数(商家后台工作人员)
			const service  = require(__dirname+'/checkSysAuth');
			res = await service.main(event);
		}else{
			// 其他类型所有人都不可访问
			res.code = 403;
			res.msg = 'access denied';
		}
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}