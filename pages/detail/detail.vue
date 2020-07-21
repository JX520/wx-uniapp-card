<template>
	<view class="detail">
		<view >
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1500">
				<swiper-item v-for="(item,index) in swiper" :key="index">
					<view class="swiper-img">
						<image :src="item.img" mode="aspectFit"></image>
					</view>
				</swiper-item>	
			</swiper>
		</view>
		<view class="intro">
			<view class="intro-title">
				<h4>{{detailData.name}}</h4>
				<text>{{detailData.title}}</text>
			</view>
			<view class="intro-detail">
				<h4>产品介绍:</h4>
				<text>{{detailData.detail}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:"",
				swiper:[
					
				],
				detailData:"",
			}
		},
		onLoad(e) {
			// console.log(e);
			this.uid = e.uid;
			this.detailReq(e.uid);
		},
		onShow() {
			this.detailReq(this.uid);
		},
		methods: {
			async detailReq(id){
				var data = {
					uid:id,
				};
				var res = await this.$request.get('http://127.0.0.1:5000/product',data);
				this.detailData = res.data;
				console.log(res);
				this.swiper = res.data.swiper;
			},
		}
	}
</script>

<style>
.detail{
	width: 96%;
	height: auto;
	padding: 15rpx;
/* 	border: 1rpx solid red; */
	background-color: whitesmoke;
}
.swiper{
	width: 100%;
	height: 350rpx;
	border-radius: 10rpx;
	border: 1rpx solid whitesmoke;
	background-color: white;
	
}
.swiper-img{
	display: flex;
	align-items: center;
	justify-content: center;
}
.swiper-img image{
	width: 80%;
	height: 350rpx;
}
.intro{
	width: 100%;
	height: auto;
/* 	border: 1rpx solid #007AFF; */
	margin-top: 30rpx;
	background-color: white;
}
.intro-title{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	letter-spacing: 3rpx;
	border-bottom: 2rpx solid whitesmoke;
}
.intro-title h4{
	color: #555555;
	font-size: 30rpx;
}
.intro-title text{
	color: #999999;
	font-size: 28rpx;
}
.intro-detail h4{
	font-size: 30rpx;
}
.intro-detail text{
	font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	font-size: 26rpx;
	color: #808080;
}
</style>
