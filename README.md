## Q群:22466457 如有问题或建议可以在群内讨论。
## 作者:VK
### 更新时间：2020-08-06
# 这样写的好处是:
1、不使用任何第三方包，兼容性强，运行稳定；

2、减少云函数数量，云函数有个数限制；

3、部分通用的代码块可以放在公共区执行，有点类似公共函数的效果；

4、可以在开发环境和生产环境中任意切换，开发时，用开发环境，开发过程中不会影响到线上环境。（具体切换方法在文档最后）

5、可以在云函数中加全局过滤器，过滤非法请求。

6、已集成`uni-id` 版本:1.1.0 (已支持真实发送邮箱验证码)

7、方便其他用户使用`unicloud`插件发布者发布的前后端一体插件，只需要导入一个云函数即可。
(如导入一个社区插件，可能要导入几十个云函数，而使用此云函数路由后，只需导入一个云函数，且已集成`uni-id`，打通账号体系)。

8、当前版本前后台均已支持url化的云函数请求。

9、封装`uni.callFunction` 和 `uni.request` 使之合二为一，现在只需要用`this.vk.callFunction` 一个函数统一进行云函数的请求（云函数请求分普通请求和url化请求），并提供了前端拦截非法token的统一拦截器

10、其他好处…


# 后端（云函数端）安装步骤
打开 `cloudfunctions` 目录
```js
1、上传common目录下的公共模块
1.1、右键common下的uni-id目录，点击上传公共模块
1.2、右键common下的config目录，点击上传公共模块
```

```js
2、router安装公共模块
在router目录执行命令 （右键router目录，使用命令行窗口打开所在目录），分别输入
2.1、npm i ../common/uni-id
2.2、npm i ../common/config
2.3、npm i nodemailer
```

```js
3、上传云函数router（右键router目录，上传部署）
```


```js
4、初始化云数据库db_init.json（右键db_init.json文件，初始化云数据库）
```

## 注意：
```html
1、使用微信登录需要配置manifest.json以及common/config/index.js这2个配置文件，
且改动配置后需要重新上传公共模块和router函数。
2、若你的电脑没有安装Node.js，则无法使用npm命令。
3、Node.js 安装包及源码下载地址为：https://nodejs.org/en/download/
4、Node.js 安装教程：https://www.runoob.com/nodejs/nodejs-install-setup.html
```

# 前端（页面端）安装步骤
在你的项目根目录执行npm命令：npm i vk-unicloud-page 进行安装

1. `npm`方式安装
```js
npm i vk-unicloud-page
（若提示失败，再执行一次该命令即可）
```

2. `main.js`引入vk-unicloud-page库
```js
// main.js
import vk from 'vk-unicloud-page';
Vue.use(vk);
```


# 云函数目录结构

```html
.
├── common─────────────────# 自定义官方公共模块包
│ └── config──────────────────# 全局配置公共模块
│ └── uni-id──────────────────# uni-id官方公共模块
├── router─────────────────# 正式环境云函数主入口(函数路由器)
│ └── node_modules─────────# npm包
│ └── dao──────────────────# dao层(用于直接操作数据库)
│ └── service──────────────# 逻辑层(用于业务逻辑)
│ ── └── order───────────────# 订单服务
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 订单服务专用的工具包
│ ── └── user────────────────# 用户服务(已集成uniID)
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 用户服务专用的工具包
│ ── └── muban.js──────────────# service下空函数模板
│ └── util─────────────────# 工具包
│ ── └── checkIsLogin.js──────# 检测客户端用户是否已登录
│ ── └── checkSysAuth.js──────# 管理后台的权限检测
│ ── └── filter.js────────────# 全局过滤器
│ ── └── pubFunction.js───────# 公共函数包
│ └── index.js─────────────# 入口函数
│ └── package-lock.json────# 工具包
└── └── package.json──────────# 第三方依赖配置文件(若使用npm，自动生成)
.
├── router-test───────────────# 函数路由(开发测试环境)
│ └── ...─────────# ...
│ └── ...─────────# ...
└── └── ...─────────# ...
```

# 云函数service模板文件示例
```
module.exports = {
	/**
	 * 此函数名称
	 * @url user/sys/test1 前端调用的url参数地址
	 * @description 此函数描述
	 * @params {Object} data 请求参数
	 * @params {String} uniIdToken 用户token
	 * @params {String} userInfo 当前登录用户信息(同理,是可信任的)(只有kh函数才带此参数)
	 * @params {Object} util 公共工具包
	 * @params {Object} originalParam 原始请求参数(包含了原始event和context)
	 * data 请求参数 说明
	 * @params {String} uid  当前登录用户id,若用户已登录且token有效,则data中会带uid参数
	 * (此参数是后端过滤器通过token获取并添加到data中的,是可信任的)(只有kh函数才带此参数)
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, db, _ } = util;
		let { uid } = data;
		let res = { code : -1, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
		
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
```
```html
res.code = 0 表示执行成功;
若执行失败，如xx参数不能为空，xx参数不正确，积分不足等等则返回
res.code = -1;
res.msg = '兑换失败，您的积分不足！';
```


# this.vk.callFunction函数的参数说明
```html
/**
 * 云函数请求封装 - 统一入口
 * @description 通过云函数路由，1个云函数实现多个云函数的效果。
 * @params {String}   url       请求路径，该路径实为router云函数的service目录下的路径
 * @params {Object}   data      请求参数
 * @params {String}   title     遮罩层提示语，为空或不传则代表不显示遮罩层。
 * @params {Boolean}  isRequest 是否使用云函数url化地址访问云函数，默认false
 * @params {Boolean}  noAlert   为true代表请求错误时，不会有弹窗提示。默认为false
 * @params {Function} success   请求成功时，执行的回调函数
 * @params {Function} fail      请求失败时，执行的回调函数
 * @params {Function} complete  无论请求成功与否，都会执行的回调函数
 */
```


# 普通方式调用云函数示例

```html

this.vk.callFunction({
	url: 'user/kh/setAvatar',
	title:'请求中...',
	data:{
		avatar: "https://xxxxxxx.jpg"
	},
	success(data) {
		// 修改成功
	}
});

```

# 云函数url化方式调用云函数示例
isRequest:true 代表使用url访问云函数，一般用于PC后台管理页面使用

```html
this.vk.callFunction({
	url: 'user/kh/setAvatar',
	title:'请求中...',
	isRequest:true,
	data:{
		avatar: "https://xxxxxxx.jpg"
	},
	success(data) {
		// 修改成功
	}
});

```


# 注意：云函数url化方式调用需要配置你的云函数url路径地址
`main.js` 在代码`Vue.use(vk); `的下方添加
```html
// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
    // 云函数路由（主函数url化地址）
    functionPath:"https://xxxxx.bspapp.com/http/router",
    // 云函数路由（开发测试函数url化地址）
    testFunctionPath:"https://xxxxx.bspapp.com/http/router-test",
});

```


# 前端非法token拦截器
`main.js` 在代码`Vue.use(vk); `的下方添加
```html
// 自定义token拦截器
Vue.prototype.vk.callFunctionUtil.interceptor.login = (obj = {}) =>{
	let {params, res} = obj;
	// 下方代码可自己修改，写成你自己的逻辑处理。
	if(!params.noAlert){
		Vue.prototype.vk.alert(res.result.msg);
	}
	console.log("跳自己的登录页面");
	// 上方代码可自己修改，写成你自己的逻辑处理。
};
```

# 如何切换正式环境和开发环境
## 开发环境切换分为两种方式
### 方式一：数据库使用正式环境，云函数使用开发环境。 
##### 适用场景：开发测试产生的数据不会污染正式环境时。（通常是需要调用正式环境数据进行云函数bug修复时）
##### 切换方法：切换测试环境需要复制一个`router`云函数，取名为`router-test`
##### 同时 在 `main.js` 的代码`Vue.use(vk); `的下方添加
```html
// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
	// 是否开启测试环境，true：使用测试环境，false：使用正式环境，默认true
	isTest:true
});

```

### 方式二：数据库和云函数都使用开发环境。 
##### 适用场景：开发测试产生的数据可能会污染正式环境时。（通常是新功能开发、测试时）
##### 切换方法：创建（复制）一个新的云服务空间
```html
具体步骤:
1、进入https://unicloud.dcloud.net.cn/home 创建一个新的云服务空间
2、右键cloudfunctions 选择云服务空间 - 选择新建的云服务空间(若切换失败,再试一次即可)
3、右键cloudfunctions 上传所有云函数及公共模块
4、重启项目(可关闭编译器重启或在控制台重启)
5、重启后就是测试环境，在测试环境开发测试完确保没有问题后，
切回正式环境，再上传云函数router即可更新至正式环境。
```


## 本插件更新步骤
#### 如果已经在插件的基础上进行开发了，则更新可按下面的步骤进行，否则直接下载并使用新版本插件即可。

## 后端（云函数端）更新步骤
打开 `cloudfunctions` 目录

```js
1、升级common目录下的公共模块
1.1、替换common目录下的uni-id公共模块为最新版本插件内的uni-id，并上传（右键common下的uni-id目录，点击上传公共模块）
```

```js
2、替换文件
替换router目录下的index.js文件
替换router目录下的user目录
替换router目录下的util目录下的checkIsLogin.js文件
替换router目录下的util目录下的pubFunction.js文件
```

```js
3、上传云函数router（右键router目录，上传部署）
注意:上传前检查npm包是否已加载
目前使用的npm有:
.1、npm i ../common/uni-id
.2、npm i ../common/config
.3、npm i nodemailer
```

## 前端（页面端）更新步骤
在你的项目根目录执行npm命令：npm i vk-unicloud-page 进行安装

1. `npm`方式安装
```js
npm i vk-unicloud-page
（若提示失败，再执行一次该命令即可）
```


## 1.1.7 更新内容
### 1、`uni-id`新增邮箱真实发送验证码功能(可在页面示例中查看调用方法)
### 2、`common`新增全局配置公共模块`config`，将`uni-id`的配置和`邮件发送`的配置独立出来（后面新增的其他功能的配置信息均在此处配置）
### 3、配置QQ邮箱教程
```
1、登录QQ邮箱
2、`邮箱首页` | `设置` - `换肤` 的设置
3、点击`常规``帐户``换肤`中的`帐户`
4、POP3/SMTP服务 点击开启
5、复制授权码
6、粘贴到`common`目录的`config`模块下的
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
```
## 云函数service模板文件示例
```
module.exports = {
	/**
	 * 此函数名称
	 * @url user/sys/test1 前端调用的url参数地址
	 * @description 此函数描述
	 * @params {Object} data 请求参数
	 * @params {String} uniIdToken 用户token
	 * @params {String} userInfo 当前登录用户信息(同理,是可信任的)(只有kh函数才带此参数)
	 * @params {Object} util 公共工具包
	 * @params {Object} originalParam 原始请求参数(包含了原始event和context)
	 * data 请求参数 说明
	 * @params {String} uid  当前登录用户id,若用户已登录且token有效,则data中会带uid参数
	 * (此参数是后端过滤器通过token获取并添加到data中的,是可信任的)(只有kh函数才带此参数)
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, db, _ } = util;
		let { uid } = data;
		let res = { code : -1, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
		
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
```

## Q群:22466457 如有问题或建议可以在群内讨论。
## 你也可以在评论区发布留言交流心得。