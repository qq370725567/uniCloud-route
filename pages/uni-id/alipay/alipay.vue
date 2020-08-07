<template>
	<view class="content">
		<button type="default" @tap="loginByAlipay">支付宝登录</button>
		<button type="default" @tap="bindAlipay">绑定支付宝</button>
		<button type="default" @tap="unbindAlipay">解绑支付宝</button>
	</view>
</template>

<script>
	var that;											// 当前页面对象
	var app = getApp();						// 可获取全局配置
	var vk;												// 自定义函数集
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
		},
		methods: {
			// 微信登陆
			loginByAlipay(){
				vk.userCenter.loginByAlipay({
					success:function(data){
						vk.alert("登录成功");
					}
				});
			},
			// 绑定微信
			bindAlipay(){
				vk.userCenter.bindAlipay({
					success:function(data){
						vk.alert("绑定成功");
					}
				});
			},
			// 解绑微信
			unbindAlipay(){
				vk.userCenter.unbindAlipay({
					success:function(data){
						vk.alert("解绑成功");
					}
				});
			}			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 15px;
	}
	.content input {
		height: 46px;
		border: solid 1px #DDDDDD;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 0px 15px;
	}
	.content button {
		margin-bottom: 15px;
	}
	.content navigator {
		display: inline-block;
		color: #007AFF;
		border-bottom: solid 1px #007AFF;
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 15px;
	}
	.tips {
		text-align: center;
		line-height: 20px;
		font-size: 14px;
		color: #999999;
		margin-bottom: 20px;
	}
</style>