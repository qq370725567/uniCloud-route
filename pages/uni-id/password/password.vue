<template>
	<view class="content">
		<input type="text" v-model="form1.username" placeholder="用户名/邮箱/手机号" />
		<input type="text" v-model="form1.password" password="true" placeholder="密码" />
		<button type="default" @tap="register">注册</button>
		<button type="default" @tap="login">登录</button>
		<button type="default" @tap="updatePwd">修改密码</button>
		<button type="default" @tap="resetPwd">重设密码</button>
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
					username: 'admin',
					password: '123456'
				}
				
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
		},
		methods: {
			// 用户注册
			register(){
				var form1 = that.form1;
				vk.userCenter.register({
					data:form1,
					success:function(data){
						vk.alert("注册成功!");
					}
				});
			},
			// 用户登陆
			login(){
				var form1 = that.form1;
				vk.userCenter.login({
					data:form1,
					success:function(data){
						vk.alert("登陆成功!");
					}
				});
			},
			// 修改密码
			updatePwd(){
				var form1 = that.form1;
				vk.userCenter.updatePwd({
					data:{
						oldPassword: "123456",
						newPassword: "123456",
						password_confirmation: "123456"
					},
					success:function(data){
						vk.alert("修改成功");
					}
				});
			},
			// 重置密码
			resetPwd(){
				var form1 = that.form1;
				vk.userCenter.resetPwd({
					success:function(data){
						vk.alert("密码已重置为123456");
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
