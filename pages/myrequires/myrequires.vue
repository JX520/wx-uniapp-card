<template>
	<view>
		<view class="out">
			<view class="require" v-for="(item ,index) in requireList" :key='index'>
				<view class="header" >
					<image :src="userInfo.avatarUrl" mode=""></image>
					<view class="title">
						<h5>{{userInfo.nickName}}</h5>
						<text>{{item.publishTime}}</text>
					</view>
				</view>
				<view class="body">
					{{item.need}}
				</view>
			</view>
			<block v-if="blank">
				<view class="blank">
					您还没有发布新需求,快去发布吧!
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:'测试',
				requireList:[],
				userInfo:{},
				blank:true,
				openid:''
			}
		},
		onLoad () {
			this.getOpenid();
			this.getUser()
		},
		methods: {
			async list(openid){
				
				var data={
					'type':1,
					'openid':openid
				}
				console.log(this.openid);
				var res =await this.$request.post('/require',data);
				console.log(res.result);
				 this.requireList = res.result;
				if(this.requireList.length > 0){
					this.blank = false
				}
			},
			getUser(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						console.log(res.data);
						this.userInfo = res.data
					},
					fail: (err) => {
						uni.getUserInfo({
							success: (userInfo) => {
								this.userInfo = userInfo.data
							}
						})
					}
				});
			},
			getOpenid(){
				uni.getStorage({
					key:'openid',
					success: (res) => {
						this.list(res.data)
						
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
			
		}
	}
</script>

<style scoped>
.blank{
	width: 100%;
	height: 100rpx;
	font-size: 32rpx;
	color: #686868;
	line-height: 100rpx;
	text-align: center;
}
.out{
	width: 100%;
	height: auto;
	padding: 20rpx;
	box-sizing: border-box;
	/* border:1rpx solid #007AFF; */
	background-color: white;
}
.require{
	width: 100%;
	height: auto;
	border: 1rpx solid whitesmoke;
	margin-bottom: 30rpx;
}
.header{
	width: 100%;
	height: 100rpx;
	/* border: #007AFF 1rpx solid; */
	display: flex;
	flex-direction: row;
	align-items: center;

	
}
.header image{
	width: 70rpx;
	height: 70rpx;
	border-radius: 10rpx;

}
.title{
	display: flex;
	flex-direction: column;
	margin-left: 30rpx;
}

.title text{
	font-size: 24rpx;
	color: #808080;
}
.body{
	width: 86%;
	height: auto;
	margin-left: 100rpx;
	/* border: 1rpx solid red; */
	color: #686868;
	font-size: 30rpx;
}
</style>
