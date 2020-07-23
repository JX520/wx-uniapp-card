<template>
	<view>
		<view class="header">
			<image :src="detail.img" mode="aspectFit"></image>
			<view class="title">
				{{detail.title}}{{detail.title}}{{detail.title}}
				<view class="price">
					￥{{detail.price}}
					<view class="share">
						<u-button plain type="warning" size="mini" shape="circle" open-type='share'>分享</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="body">
				<u-divider fontSize='32' half-width="100" margin-bottom='20'  type="warning" >商品详情</u-divider>
				<view class="detail" v-for="(item,index) in detail.detail" :key='index'>
					<image :src="item.img" mode="aspectFit"></image>
					<view>
						{{item.intro}}
					</view>
				</view>
		</view>
		<view class="navigation">
			<view class="left">
				<!-- <view class="item">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view> -->
				<view class="item">
					<navigator url="/pages/company/company" open-type="switchTab" hover-class="other-navigator-hover">
						<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">首页</view>
					</navigator>
					
				</view>
				<view class="item car" @click="goCart()">
					<!-- <u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge> -->
					<!-- <u-badge class="car-num"  type="error" ></u-badge> -->
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1" >购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" top="200" :icon-style="iconStyle"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gid:null,
				goods:[],
				detail:'',
				scrollTop:0,
				iconStyle: {
					fontSize: '32rpx',
					color: '#2979ff'
				}
			};
		},
		onLoad(e) {
			this.gid = parseInt(e.gid);
			this.getGoods(12);
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		methods:{
			//获取平台商城商品信息
			async getGoods(gid){
				var res = await this.$request.get('/pshop', );
				// console.log(res.data);
				this.goods = res.data.result;
				for(var i in this.goods){
					this.detail = this.goods[i].goods.find((item)=>{
						// console.log(item);
						if(item.gid == 12) return item
					})
				}
				console.log(this.detail)
			},
			goCart(){
				uni.navigateTo({
					url:'/pages/user/userCart/userCart'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.header{
	border: 1px solid whitesmoke;
	// height: 500rpx;
	padding: 20rpx 20rpx 0 20rpx;
	display: flex;
	flex-direction: column;
	border-radius: 10rpx;
	background: white;
	image{
		height: 300rpx;
		margin: 0 auto;
	}
	.title{
		width: 100%;
		padding: 20rpx 0;
		flex: 1;
		// border: 1px solid blue;
		font-size: 30rpx;
		color: #343434;
		text-align: center;
		.price{
			width: 100%;
			color: #E54D42;
			font-size: 34rpx;
			position: relative;
			text-align: left;
			.share{
				position: absolute;
				top: 4rpx;
				right: 20rpx;
			}
		}
	}
}

.body{
	border-radius: 10rpx;
	padding: 20rpx;
	margin: 20rpx 0 100rpx 0;
	// border: 1px solid red;
	width: 100%;
	background-color: white;
	.detail{
		width: 100%;
		padding: 20rpx;
		text-align: center;
		image{
			height: 300rpx;
			margin: 0 auto;
		}
		
	}
}


.navigation {
	width: 100%;
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-around;
	// margin-top: 100rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 8rpx 0;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}

</style>
