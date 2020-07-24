<template>
	<view class="">
		
		<view v-show="cartList.length >0">
		<view class="header">
			<view class="title">
				共
				<text> {{cartList.length}} </text>
				件
			</view>
			<button class="cu-btn line-blue round sm" @tap='set'>{{isChange ? '编辑' : '完成'}}</button>
			<!-- <u-button size="mini" shape="circle">编辑</u-button> -->
		</view>
		<view class="body">
			<u-checkbox-group >
				<view class="block" v-for="(i,index) in cartList" :key='index'>
					<view class="select" > 
					<u-checkbox  
					shape="circle"
					@change="checkboxChange" 
					v-model="i.checked" 
					:name = "index"
					></u-checkbox>
					</view>
					<view class="goods">
						<view class="class-item" >
							<view class="item">
								<image :src="i.img" mode="aspectFit" ></image>
							</view>
							<view class="item-foot">
								<view class="title">
									<text>{{i.title}}{{i.title}}</text>
								</view>
								<view class="price" id="body-btn">
									<text>￥{{i.price}}</text>
									<view class="num"> 
									<wm-numberBox destination="body-btn" :value='i.num' :min="1" :ID='index' model="2" @change="getNum"></wm-numberBox>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-checkbox-group>
		</view>
		<view class="bottom">
			<view class="select" @tap='selectAll'>
				<u-checkbox-group >
					<u-checkbox
					shape="circle"
					v-model="isAll"
					@change="checkboxChange" 
					>全选</u-checkbox>
				</u-checkbox-group >
			</view>
			<view class="pay">
				<view class="total" >
					<text v-show="isChange">￥{{allPrice}}.00</text>
				</view>
				<u-button type="primary" size="medium" shape="circle"  v-if="isChange">付款</u-button>
				<u-button type="error" size="medium" shape="circle" v-if="!isChange">删除</u-button>
			</view>
		</view>
		</view>
		<view class="empty center" v-show="cartList.length == 0">
			<view>购物车空空的,快去选点东西吧~</view>
		</view>
	</view>
</template>

<script>
import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue"
	export default {
		components:{
			wmNumberBox
		},
		data() {
			return {
				isAll:false,
				isChange:true,
				cartList:'',
				openid:987,
				allPrice:0,
			};
		},
		computed:{
			
		},
		onShow() {
			this.getCart(this.openid);
		},
		methods:{
			// 功能切换
			set() {
				this.isChange = !this.isChange;
			},
			async getCart(openid){
				if(uni.getStorageSync('cart')){
					this.cartList = uni.getStorageSync('cart');
				}else{
					var res = await this.$request.get('/cart', {
						openid:openid
					});
					this.cartList = res.data.result;
					uni.setStorageSync('cart',res.data.result)
				}
				// console.log(uni.getStorageSync('cart'));
				
			},
			checkboxChange(e){
				this.cartList[e.name].checked = e.value;
				uni.setStorageSync('cart',this.cartList);
			},
			getNum(e){
				this.cartList[e.id].num = e.value;
				uni.setStorageSync('cart',this.cartList);
			},
			totalPrice(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>

.empty{
	width: 100%;
	height: 800rpx;
	color: grey;
	font-size: 34rpx;
}
.header{
	padding: 10rpx;
	display: flex;
	justify-content: space-between;
	.title{
		color: #7a7b7c;
		text{
			color: #2B85E4;
		}
	}
}

.body{
	margin-bottom: 100rpx;
	.block{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 14rpx;
		margin-bottom: 20rpx;
		background: white;
		border-radius: 20rpx;
		.select{
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.goods{
			width: 80%;
			.class-item {
				background-color: #fff;
				padding: 16rpx;
				border-radius: 8rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

			
				.item{
					image{
						height: 110rpx;
						width: 110rpx;
					}
				}
				.item-foot{
					display: flex;
					flex-direction: column;
					letter-spacing: 2rpx;
					flex: 1;
					.title{
						 height: 50rpx;
						margin: 8rpx ;
						text{
							font-size: 26rpx;
							// text-align: center;
							overflow: hidden;
							word-break: break-all;
							box-sizing: border-box;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							
						}
					}
				}	
					.price{
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #FA3534;
						font-size: 30rpx;
						padding: 0 32rpx;
						.num{
							width: 40%;
						}
					}
			}
			
		}
	}
}

.bottom{
	width: 100%;
	position: fixed;
	height:100rpx ;
	background: white;
	bottom: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	.select{
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		// border: 1px solid blue;
	}
	.pay{
		flex: 1;
		// border: 1px solid #19BE6B;
		display: flex;
		flex-direction: row;
		z-index: 10;
		.total{
			width: 40%;
			text-align: center;
			text{
				color: red;
				font-size: 32rpx;
				margin-right: 20rpx;
				font-weight: 400;
				line-height: 70rpx;
			}
		}
		
	}
}
</style>
