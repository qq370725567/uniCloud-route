<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<button type="default" @tap="loginByWeixin">微信登录</button>
		<button type="default" @tap="bindWeixin">绑定微信</button>
		<button type="default" @tap="unbindWeixin">解绑微信</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<template v-if="hasWeixinAuth">
			<button type="default" @tap="loginByWeixin">微信登录</button>
			<button type="default" @tap="bindWeixin">绑定微信</button>
			<button type="default" @tap="unbindWeixin">解绑微信</button>
		</template>
		<template v-else>
			<view class="tips">未包含微信登录模块</view>
		</template>
		<!-- #endif -->
	</view>
</template>

<script>
	var that;											// 当前页面对象
	var app = getApp();						// 可获取全局配置
	var vk;												// 自定义函数集
	export default {
		data() {
			return {
				hasWeixinAuth: false
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
		},
		methods: {
			// 微信登陆
			loginByWeixin(){
				vk.userCenter.loginByWeixin({
					success:function(data){
						vk.alert("登录成功");
					}
				});
			},
			// 绑定微信
			bindWeixin(){
				vk.userCenter.bindWeixin({
					success:function(data){
						vk.alert("绑定成功");
					}
				});
			},
			// 解绑微信
			unbindWeixin(){
				vk.userCenter.unbindWeixin({
					success:function(data){
						vk.alert("解绑成功");
					}
				});
			},
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