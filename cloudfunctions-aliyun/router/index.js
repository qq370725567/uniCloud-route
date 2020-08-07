const pubFun = require(__dirname+'/util/pubFunction'); // __dirname是为了兼容阿里云
const config = require('config');		// 全局配置信息
const uniID = require('uni-id');		// uni-id公共模块
uniID.init(config["uni"]);
const db = uniCloud.database();
process.env.TZ ='Asia/Shanghai'; 		// 设置时区为东八区(目前无效)
'use strict';
exports.main = async (event, context) => {
	let originalParam = {event, context};
	let param = pubFun.getQueryStringParameters(event);
	let {url, data, uniIdToken} = param;
	// 工具包
	let util = {
		config:config,
		pubFun:pubFun,
		uniID:uniID,
		db:db,
		_:db.command
	};
	// 全局过滤器
	const filterService = pubFun.require('util/filter');
	let res = await filterService.main({
		url, data, uniIdToken, util, originalParam
	});
	if(res.code != 0) return res;
	// 如果存在uid,则参数自动加上uid参数
	if(res.uid) data.uid = res.uid;
	// 加载业务函数
	let serviceMain;
	try{
		serviceMain = pubFun.require('service/'+url);
	}catch(err){
		return {
			code:404,
			msg:'云函数'+url+'不存在',
			err:err
		};
	}
	let mainParam = {
		data,
		uniIdToken,
		util,
		originalParam
	};
	if(res.uid) mainParam.uid = res.uid;
	if(res.userInfo) mainParam.userInfo = res.userInfo;
	// 执行业务函数
	return await serviceMain.main(mainParam);
};