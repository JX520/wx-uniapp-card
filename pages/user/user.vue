<template>
	<view >
		<view class='header'>
			<image :src='userInfo.avatarUrl'></image>
			<!-- <open-data  type="avatarUrl"></open-data> -->
			<text>{{userInfo.nickName}}</text>
			<button class="cu-btn round bg-yellow  sm">开通名片</button>
		</view>
		<view class="out">
			<view class="menu-1" @click="goLink" data-link="/pages/myrequires/myrequires">
				<image src="../../static/require.png" mode=""></image>
				<text>我的需求</text>
				<image src="../../static/right2.png" mode=""></image>
			</view>
			<view class="menu-1" @click="goLink" data-link="/pages/mylikes/mylikes">
				<image src="../../static/like.png" mode=""></image>
				<text>我的收藏</text>
				<image src="../../static/right2.png" mode=""></image>
			</view>
			<view class="menu-1" @click="goLink" data-link="/pages/myrequires/myrequires">
				<image src="../../static/other.png" mode=""></image>
				<text>其他</text>
				<image src="../../static/right2.png" mode=""></image>
			</view>
			<view class="menu-1" @click="goLink" data-link="/pages/set/set">
				<image src="../../static/set.png" mode=""></image>
				<text>设置</text>
				<image src="../../static/right2.png" mode=""></image>
			</view>
			<view class="myCard">
				<view class="myCard-title">
					<text class="myCard-title-left">我的名片夹</text>
					<text class="myCard-title-right">编辑</text>
				</view>
				<view class="card">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				openid:'',
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				uni.login({
					success:res =>{
						if(res.code){
							uni.getUserInfo({
								withCredentials:true,
								success: (res_user) => {
									// this.getOpenId(res.code,res_user.encryptedData,res.iv);
									this.userInfo = res_user.userInfo;
									 console.log(res_user.userInfo);
								},
								
							});
							uni.getStorage({
								key:'openid',
								success:(res)=>{
									this.openid = res.data;
								}
							})
						}else{
							
						}
					}
				})
			},
			
			goLink(e){
				// console.log(e.currentTarget.dataset.link);
				uni.navigateTo({
					url:e.currentTarget.dataset.link
				})
			},
		}
	}
</script>

<style>
.out {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding:0 20rpx;
		background-color: white;
	}
.header{
	width: 100%;
	height: 220rpx;
	/* border: 1rpx solid red; */
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: white;
	/* background-color: #ffaa00; */
/* 	background: rgb(255, 196, 5);
	background: linear-gradient(148deg, rgb(255, 196, 5) 30%, rgb(241, 237, 255) 60%); */

	/* border-radius: 10%; */
	/* border-bottom-right-radius: 30%; */
	
}
.header image{
	width: 80rpx;
	height: 80rpx;
	border-radius: 10rpx;
}
.header text{
	width: 50%;
	/* border: 1rpx solid #007AFF; */
	overflow: hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	margin: 0 5% 0 5%;
	font-size: 36rpx;
	color: #2B2B2B;
	/* color: white; */
}
.menu{
	width: 100%;
	height: 120rpx;
	border: 1rpx solid whitesmoke;
	margin-top: -30rpx;
	border-radius: 10rpx;
	background-color: whitesmoke;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.menu-first{
	width: 120rpx;
	height: 120rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* border: 1rpx solid red; */
}
.menu-first image{
	width: 60rpx;
	height: 60rpx;
}
.menu-first text{
	font-size: 26rpx;
	color: #646566;
}
.menu-1{
	margin-top: 20rpx;
	width: 100%;
	height: 100rpx;
	border: 0.5rpx solid whitesmoke;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	border-radius: 10rpx;

}
.menu-1 image{
	width: 60rpx;
	height: 60rpx;
}
.menu-1 text{
	width: 60%;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 30rpx;
	color: #646566;
	/* border: 1rpx solid #007AFF; */
}
.myCard{
	width: 100%;
	height: auto;
	background-color: white;
}
.myCard-title{
	width: 100%;
	height: 40rpx;
	/* border: 1rpx solid #007AFF; */
	font-size: 24rpx;
	margin: 40rpx 0 20rpx 0;
}
.myCard-title-right{
	float: right;
	color: #969799;
}
.card{
	width: 100%;
	height: 280rpx;
	box-sizing: border-box;
	/* border: 1rpx solid red; */
	border-radius: 15rpx;
	padding: 20rpx;
}
</style>
