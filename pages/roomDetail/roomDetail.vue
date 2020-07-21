<template>
	<view class="out">
		<view class="detail">
			<view class="detail-header">
				<view class="detail-header-title">
					<text>{{detail.title}}</text>
				</view>
				<view class="detail-header-time">
					<text>{{detail.publishTime}}</text>
				</view>
			</view>
			<view class="detail-body">
				<image :src="detail.img" mode="aspectFit"></image>
				<text>
					{{detail.content}}
				</text>
			</view>
			<view class="bg"></view>
			<view class="detail-footer">
				<view class="company-list-footer-body" @click="changeNice(detail.uid)">
					<!-- <image class="nice" src="../../static/nice.png" v-if="!detail.isNice"></image>
					<text>{{detail.niceNum}}</text> -->
					<image class="collect" src="../../static/collect.png"></image>
				</view>
				<view class="company-list-footer-body">


					<view class="t_card" style="width:60rpx">
						
						<image class="share" src="../../static/share.png" ></image>
						<!-- <text>分享</text> -->
						<button class="t_button" open-type="share" style="width:60rpx"></button>
					</view>
				</view>
			</view>
			<view class="bg"></view>
			<view class="detail-review">
				<view class="detail-review-header">
					<text>全部评论</text>
					<text>{{review.length}}</text>
				</view>
				<view class="detail-review-body">
					<image src="../../static/blank.jpg" mode="widthFix" v-if="showBlank"></image>

						<view class='talk-item' v-for="(item,index) in review" :key="index">
						  <view class='talk-item-left'>
						    <image class='talk-item-face' :src='item.avatarUrl'></image>
						  </view>
						  <view class='talk-item-right'>
						    <text class='talk-item-nickname'>{{item.nickName}}</text>
						    <text class='talk-item-content'>{{item.content}}</text>
						    <text class='talk-item-time'>{{item.publishTime}}</text>
						  </view>
						</view>
				</view>
				<view class="goReview ">
					<input type="text" value="" placeholder="说点什么吧!" @input="reviewText"/>
					<button class="cu-btn bg-blue" @click="goReview(detail.uid)">发表</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:'',
				showBlank:true,
				detail: {
					
				},
				review:[
				],
				currUser:'',
				text:'',
				userInfo:'',
			}
		},
		onLoad(e) {
			this.uid = e.uid;
			this.detailReq(e.uid);

		},
		onShow() {
			
		},
		methods: {
			async changeNice(uid, openid) {
				var data = {
					'uid':uid,
					'flag':1,
				};
				// var res = await this.$request.get('http://127.0.0.1:5000/share?uid=' + uid + 'flag=1');
				// console.log(res);
				this.detailReq(this.uid);
			},
			//动态分享
			onShareAppMessage() {
				return {
					title: '测试测试',
					path: '/pages/detail/detail?scene=',
				}
			},
			
			blank(){
				if(this.review.length > 0){
					this.showBlank = false;
				}
			},
			
			//请求数据
			async detailReq(uid){
				 var data = {
					 'uid':uid
				 };
				 var res = await this.$request.get('/share?uid=' + uid);
				 this.detail = res.data;
				 console.log(res);
				 this.review = res.data.review.reverse();
				 this.blank();
				 // console.log(res);
			},
			
			//发表评论
			reviewText(e){
				this.text = e.detail.value
			},
			
			//提交评论
			goReview(uid){
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						this.userInfo = res.data;
						 // console.log(res.data);
						 this.reviewData(uid);
					},
					fail: (err) => {
						uni.getUserInfo({
							withCredentials:true,
							success: (res_user) => {
								uni.setStorage({
									key:"userInfo",
									data:res_user.userInfo
								})
								this.userInfo = res_user.userInfo;
								this.review(uid);
								// console.log(res_user.userInfo);
							},	
						})
					}
				})
			},	
			async reviewData(uid){
				// console.log(userInfo);
				var data = {
					'uid':uid,
					'flag':2,
					'avatarUrl':this.userInfo.avatarUrl,
					'nickName':this.userInfo.nickName,
					'content':this.text,
					'publishTime':this.$moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
				};
				var res = await this.$request.get('/share',data);
				 // console.log(res);
				this.detailReq(uid);
				
			},
		},
	}
</script>

<style>
	.out {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.detail {
		width: 100%;
		height: auto;
		/* border: 1rpx solid red; */
		margin-bottom: 50rpx;

	}

	.detail-header {
		width: 100%;
		height: auto;
		color: #333333;
		font-size: 34rpx;
		letter-spacing: 2rpx;
	}

	.detail-header-time {
		margin-top: 20rpx;
		color: #646566;
		font-size: 24rpx;

	}

	.detail-body {
		margin-top: 50rpx;
		width: 100%;
		height: auto;
		overflow-y: auto;
		text-align: center;

	}

	.detail-body image {
		width: 100%;
		height: 340rpx;
		margin-bottom: 50rpx;
	}

	.detail-body text {
		font-size: 28rpx;
		color: #646566;
	}

	.company-list-footer-body {
		width: 60rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		float: right;
		margin-right: 15rpx;

	}

	.company-list-footer-body text {
		font-size: 26rpx;
		color: #949396;

	}

	.nice {
		width: 35rpx;
		height: 35rpx;
	}

	.bg {
		width: 110%;
		height: 15rpx;
		margin: 0 -20rpx 0 -20rpx;
		background-color: #DCDEE0;
	}

	.detail-footer {
		width: 100%;
		height: 50rpx;


	}

	.share {
		width: 60rpx;
		height: 60rpx;
	}

	.t_card {
		position: relative;

		width: 20%;
		height: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.t_card image {
		width: 50rpx;
		height: 50rpx;
	}

	.t_card text {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		height: calc(100% - 50rpx);
		width: 100%;
		font-size: 22rpx;
		text-align: center;
		white-space: nowrap;

	}

	.t_button {
		width: 60rpx;
		height: 100%;
		position: absolute;
		left: 0rpx;
		top: 0rpx;
		opacity: 0.01;
		z-index: 9;
	}
	.detail-review{
		width: 100%;
		height: auto;
		/* border: 1rpx solid #007AFF; */
	}
	.detail-review-header{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
/* 		background-color: #fcfcfc; */
	}
	.detail-review-header text{
		font-size: 30rpx;
		color: #757575;
	}
	.detail-review-body {
		width: 100%;
		height: auto;

		/* background-color: #fcfcfc; */
		
	}
	
	/* 评论区 */
	.talk-item {
	  display: flex;
	  flex-direction: row;
	  align-items: flex-start;
	  width: 100%;
	  color: white;
	  font-size: 30rpx;
	}
	
	.talk-item-left {
	  display: flex;
	  flex-direction: row;
	  margin: 20rpx 30rpx;
	}
	
	.talk-item-face {
	  width: 70rpx;
	  height: 70rpx;
	  border-radius: 50%;
	}
	
	.talk-item-right {
	  width: 100%;
	  /* border-bottom: solid 1rpx #6a6869; */
	  margin-right: 30rpx;
	  margin-bottom: 30rpx;
	}
	
	.talk-item-nickname {
	  font-size: 0.7rem;
	  color: #aaa8a9;
	  margin-top: 20rpx;
	  margin-bottom: 10rpx;
	}
	
	.talk-item-content {
	  display: block;
	  margin-right: 30rpx;
	  width: 100%;
	  white-space: pre-line;
	  color: #2b2b2b;
	}
	
	.talk-item-time {
	  font-size: 24rpx;
	  color: #aaa8a9;
	  margin-bottom: 20rpx;
	}
	
	.goReview{
		width: 95%;
		height: 60rpx;

		position: fixed;
		bottom: 10rpx;
		left: 20rpx;
		background-color: whitesmoke;
		display: flex;
		flex-direction: row;
	}
	.goReview input{
		width: 82%;
		height: 60rpx;
		line-height: 60rpx;
		border: 1rpx solid #DDDDDD;
		border-radius: 10rpx;

	}
	.p_button{
		width: 120rpx;
		height: 60rpx;
		background-color: #77b3ef;
		color: white;

	}
	.collect{
		width: 35rpx;
		height: 35rpx;
	}
</style>
