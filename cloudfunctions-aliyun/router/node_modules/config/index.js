module.exports = {
	"uni":{
		"passwordSecret": "passwordSecret",
		"tokenSecret": "tokenSecret",
		"tokenExpiresIn": 7200,
		"passwordErrorLimit": 6,
		"passwordErrorRetryTime": 3600,
		"bindTokenToDevice": false,
		"app-plus": {
			"tokenExpiresIn": 2592000,
			"oauth" : {
				"weixin" : {
					"appid" : "",
					"appsecret" : ""
				}
			}
		},
		"mp-weixin": {
			"oauth" : {
				"weixin" : {
					"appid" : "",
					"appsecret" : ""
				}
			}
		},
		"mp-alipay": {
			"oauth" : {
				"alipay" : {
					"appid" : "",
					"privateKey" : ""
				}
			}
		},
		"service": {
			"sms": {
				"name": "DCloud",
				"codeExpiresIn": 180,
				"smsKey": "你的smsKey",
				"smsSecret": "你的smsSecret"
			}
		}
	},
	"vk":{
		"service": {
			"email": {
				"qq": {
					"host": "smtp.qq.com",
					"port": 465,
					"secure": true,
					"auth": {
						"user": "你的邮箱@qq.com",
						"pass": "邮箱授权码"
					}
				}
			}
		}
	}
};
