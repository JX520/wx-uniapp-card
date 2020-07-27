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
			<view class="select" @tap='selAll'>
				<image  :src="isAll ? '../../static/selectActive.png' : '../../static/select.png'" mode="aspectFit"></image>
				<text>全选</text>
			</view>
			<!-- <image  src="../../static/select.png" mode="aspectFit"></image> -->
			
			<view class="pay">
				<view class="total" >
					<text v-show="isChange">￥{{allPrice}}.00</text>
				</view>
				<u-button type="primary" size="medium" shape="circle"  v-if="isChange">付款</u-button>
				<u-button type="error" size="medium" shape="circle" v-if="!isChange" @click="delGoods">删除</u-button>
			</view>
		</view>
		</view>
		<view class="empty center" v-show="cartList.length == 0">
			<view>购物车空空的,快去选点东西吧~</view>
		</view>
	</view>
</template>

<script>
import {get,post} from '@/utils/request.js'
// import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
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
			// allPrice(){
			// 	return this.$store.state.allPrice;
			// }
		},
		onLoad() {
			
		},
		onShow() {
			// uni.clearStorageSync('cart');
			this.getCart(this.openid);
			// this.totalPrice();
		},
		methods:{
			// 功能切换
			set() {
				this.isChange = !this.isChange;
			},
			//购物车商品获取
			async getCart(openid){
				if(uni.getStorageSync('cart')){
					let list = uni.getStorageSync('cart');
					list.forEach(item=>{
						item.allprice = 0;
						item.checked = false;
					});
					uni.setStorageSync('cart',list);
					this.cartList = uni.getStorageSync('cart');
				}else{
					var res = await this.$request.get('/cart', {
						openid:openid
					});
					this.cartList = res.data.result;
					this.cartList.forEach(item=>{
						item.allprice = 0;
						item.checked = false;
					})
					uni.setStorageSync('cart',this.cartList)
				}
				
				// console.log(uni.getStorageSync('cart'));
				
			},
			//商品单个选择
			checkboxChange(e){
				this.allPrice = 0;
				this.cartList[e.name].checked = e.value;
				if(this.cartList[e.name].checked){
					this.cartList[e.name].allprice = parseInt(this.cartList[e.name].price * this.cartList[e.name].num);
				}else{
					this.cartList[e.name].allprice = 0
				};
				uni.setStorageSync('cart',this.cartList);
				// console.log(this.cartList);
				this.isall();
				this.totalPrice();
			},
			//商品数量加减
			getNum(e){
				this.allPrice = 0;
				this.cartList[e.id].num = e.value;
				// if(this.cartList[e.id].checked){
					this.cartList.forEach(item=>{
						item.allprice = item.price * item.num
					})
					// this.cartList[e.id].allprice = parseInt(this.cartList[e.id].price * this.cartList[e.id].num);
				// }
				uni.setStorageSync('cart',this.cartList);
				this.totalPrice();
			},
			//总价计算
			totalPrice(){
				this.allPrice = 0;
				let list =  uni.getStorageSync('cart');
				list.forEach(item=>{
					if(item.checked){
						this.allPrice += item.allprice;
					}	
					// this.$store.commit("updatePrice",total)
				})
			},
			
			//全选
			selAll(){
				this.allPrice = 0;
				this.isAll = !this.isAll;
				if(this.isAll){
					this.cartList.forEach(item=>{
						item.checked = true;
						this.allPrice += item.price * item.num;
					})
				}else{
					this.cartList.forEach(item=>{
						item.checked = false;
					})
					this.allPrice = 0
				}
			},
			
			//是否全选
			isall(){
				let list =  uni.getStorageSync('cart');
				let arr = [];
				list.forEach(item=>{
					if(item.checked){
						arr.push(item);
						if(arr.length == list.length){
							console.log(arr.length);
							console.log(list.length);
							this.isAll = true;
						}else{
							this.isAll = false;
						}
					}else{
						if(list.length == 1){
							this.isAll = false;
						}
					}
				})
			},
			
			//删除
			delGoods(){
				if(this.isAll){
					this.cartList = '';
					uni.clearStorageSync('cart');	
				}else{
					for (let i in this.cartList) {
						if(this.cartList[i].checked){
							this.cartList.splice(i,1)
						}
						uni.setStorageSync('cart',this.cartList)
					}
				}
			},
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
		line-height: 50rpx;
		// border: 1px solid blue;
		image{
			width: 38rpx;
			height: 38rpx;
		}
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
