<template>
	<view class="content">
		<input type="text" placeholder="手机号" v-model="form1.mobile" />
		<input type="text" placeholder="验证码" v-model="form1.code" />
		<view class="tips" style="color: red;">上次发送的验证码：{{form1.code}}</view>
		<view class="title">手机号注册&登录相关</view>
		<view style="display: flex;">
			<button type="default" @tap="sendSmsCode('login')">真实-发送验证码</button>
			<button type="default" @tap="setVerifyCode('login')">模拟-发送验证码</button>
		</view>
		<button type="default" @tap="loginBySms">短信验证码登录（不存在则注册）</button>
		<view class="tips">如果不使用uni-id自带的发送验证码功能，可以自行调用接口设置验证码，参数与发送验证码一致</view>
		<view class="title">绑定手机相关</view>
		<view style="display: flex;">
			<button type="default" @tap="sendSmsCode('bind')">真实-发送验证码</button>
			<button type="default" @tap="setVerifyCode('bind')">模拟-发送验证码</button>
		</view>
		<button type="default" @tap="bindMobile">绑定手机号（需先登录）</button>
		<view class="tips">绑定手机时如果不传验证码或者传空则直接绑定并设置mobile_confirmed为1，不会去校验验证码</view>
		<view class="title">解绑手机相关</view>
		<view style="display: flex;">
			<button type="default" @tap="sendSmsCode('unbind')">真实-发送验证码</button>
			<button type="default" @tap="setVerifyCode('unbind')">模拟-发送验证码</button>
		</view>
		<button type="default" @tap="unbindMobile">解绑手机（需先登录）</button>
		<view class="tips">解绑手机时如果不传验证码或者传空则直接解除绑定绑定，不会去校验验证码</view>
	</view>
</template>

<script>
	var that;											// 当前页面对象
	var app = getApp();						// 可获取全局配置
	var vk;												// 自定义函数集
	export default {
		data() {
			return {
				form1:{
					mobile: '15200000001',
					code: ''
				}
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
		},
		methods: {
			// 为了演示把这个逻辑放在客户端
			getCode() {
				const randomStr = '00000' + Math.floor(Math.random() * 1000000)
				that.form1.code = randomStr.substring(randomStr.length - 6)
			},
			sendSmsCode(type) {
				if (!/^1\d{10}$/.test(that.form1.mobile)) {
					uni.showModal({
						content: '请输入正确的手机号',
						showCancel: false
					})
					return
				}
				var form1 = that.form1;
				vk.userCenter.sendSmsCode({
					data:{
						mobile: form1.mobile,
						type: type,
					},
					success:function(data){
						vk.alert("短信发送成功");
					}
				});
			},
			setVerifyCode(type) {
				if (!/^1\d{10}$/.test(this.form1.mobile)) {
					uni.showModal({
						content: '请输入正确的手机号',
						showCancel: false
					})
					return
				}
				that.getCode();
				var form1 = that.form1;
				vk.userCenter.setVerifyCode({
					data:{
						mobile: form1.mobile,
						code: form1.code,
						type: type,
					},
					success:function(data){
						vk.toast("发送成功");
						// 为了演示,正式时应该让用户自己输入
						form1.code = data.verifyCode;
					}
				});
			},
			// 登录(手机号+验证码)
			loginBySms() {
				var form1 = that.form1;
				vk.userCenter.loginBySms({
					data:form1,
					success:function(data){
						vk.alert("登录成功");
					}
				});
			},
			// 绑定手机号
			bindMobile(){
				var form1 = that.form1;
				vk.userCenter.bindMobile({
					data:form1,
					success:function(data){
						vk.alert("绑定成功");
					}
				});
			},
			// 解绑手机
			unbindMobile(){
				var form1 = that.form1;
				vk.userCenter.unbindMobile({
					data:form1,
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
	.title{
		font-size: 36rpx;
		margin-bottom: 20rpx;
	}
</style>