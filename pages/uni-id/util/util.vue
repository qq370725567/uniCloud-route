<template>
	<view class="content">
		<button type="default" @tap="setAvatar">设置头像</button>
		<button type="default" @tap="updateUser">更新用户信息</button>
		<button type="default" @tap="checkToken">token校验</button>
		<button type="default" @tap="logout">退出</button>
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
			// 设置头像
			setAvatar(){
				var form1 = that.form1;
				vk.userCenter.setAvatar({
					data:{
						avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594798658581&di=bcd5486940ad88cf88a904f411c53e94&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn15%2F600%2Fw1920h1080%2F20180505%2Fad66-hacuuvt5802647.jpg",
					},
					success:function(data){
						vk.alert("设置成功");
					}
				});
			},
			updateUser() {
				var form1 = that.form1;
				vk.userCenter.updateUser({
					data:{
						nickname:"剑圣李白",
					},
					success:function(data){
						vk.alert("更新成功");
					}
				});
			},
			// token校验
			checkToken(){
				vk.userCenter.checkToken({
					success:function(data){
						vk.alert("token有效");
					}
				});
			},
			// 退出
			logout(){
				vk.userCenter.logout({
					success:function(data){
						vk.alert("退出成功");
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