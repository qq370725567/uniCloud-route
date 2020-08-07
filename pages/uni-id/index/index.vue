<template>
	<view class="content">
		<view style="margin-bottom: 20rpx;font-size: 32rpx;">
			当前集成的
			<text style="font-weight: bold;margin: 0 10rpx;">uni-id</text>
			版本：
			<text style="font-weight: bold;">1.1.0</text> 
		</view>
		
		<button type="default" @tap="pageTo('../password/password')">用户名和密码</button>
		<button type="default" @tap="pageTo('../mobile/mobile')">手机号和验证码</button>
		<button type="default" @tap="pageTo('../email/email')">邮箱与验证码</button>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<button type="default" @tap="pageTo('../weixin/weixin')">微信登录</button>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<button type="default" @tap="pageTo('../alipay/alipay')">支付宝登录</button>
		<!-- #endif -->
		<button type="default" @tap="pageTo('../util/util')">通用方法</button>
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
			pageTo(url){
				uni.navigateTo({
				   url: url
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
