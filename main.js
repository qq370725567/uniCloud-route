import Vue from 'vue'
import App from './App'

import vk from 'vk-unicloud-page';
Vue.use(vk);

// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
    // 云函数路由（主函数url化地址）
    functionPath:"https://xxxxx.bspapp.com/http/router",
    // 云函数路由（开发测试函数url化地址）
    testFunctionPath:"https://xxxxx.bspapp.com/http/router-test",
});

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


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
