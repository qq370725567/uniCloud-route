/**
 * 公共函数包
 */
var util = {};
// require封装，用于兼容阿里云和腾讯云
util.require = function(path){
	return require(__dirname+"/../"+path);
}
// url参数字符串转json对象
util.urlStringToJson = function(str){
	var json = {};
	if(str!="" && str !=undefined && str != null){
		var arr = str.split("&");
		for(var i=0;i<arr.length;i++){
			var arrstr = arr[i].split("=");
			var k = arrstr[0];
			var v = arrstr[1];
			json[k] = v;
		}
	}
	return json;
}
// 提取请求参数
util.getQueryStringParameters = function(event){
	let param = {};
	if(event.httpMethod == "POST"){
		// post请求，处理参数
		let options = event.body;
		if(event.isBase64Encoded){
			options = Buffer.from(options, 'base64').toString('utf-8');
		}
		if(typeof options == "string") options = JSON.parse(options);
		param = options;
	}else if(event.httpMethod == "GET"){
		let options = event.queryStringParameters;
		if(typeof options.data == "string") options.data = JSON.parse(options.data);
		param = options;
	}else{
		param = JSON.parse(JSON.stringify(event));
	}
	if(!param.data) param.data = {};
	param.url = param.$url || "";
	return param;
}
module.exports = util;
