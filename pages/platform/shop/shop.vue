<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">进入搜索页面</text>
			</view>
		</view>	
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.category}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item" v-for="(item1, index1) in item.goods" :key="index1" @click="goDetail(item1.gid)">
							<view class="item">
								<image :src="item1.img" mode="aspectFit"></image>
							</view>
							<view class="item-foot">
								<view class="title">
									<text>{{item1.title}}{{item1.title}}</text>
								</view>
								<view class="brief">
									<text>{{item1.title}}{{item1.title}}</text>
								</view>
								<view class="price">
									<text>￥{{item1.price}}</text>
									<image src="../../../static/cart.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
	import {get} from '@/utils/request.js';
	import classifyData from "@/utils/shopData.js";
	export default {
		data() {
			return {
				tabbar: classifyData,
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		computed: {
			
		},
		onLoad() {
			this.getGoods()
		},
		methods: {
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			
			//获取平台商城商品信息
			async getGoods(){
				var res = await this.$request.get('/pshop', );
				console.log(res.data);
				this.tabbar = res.data.result;
			},
			
			goDetail(gid){
				console.log(gid);
				uni.navigateTo({
					url:'/pages/platform/goodsDetail/goodsDetail?gid='+gid
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 0 10rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 16rpx;
		justify-content: center;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 180rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 80rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 26rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 46rpx;
		left: 0;
		// top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid #f2f2f2;

		.item{
			image{
				height: 240rpx;
				width: 240rpx;
			}
		}
	}
		.item-foot{
			display: flex;
			flex-direction: column;
			letter-spacing: 2rpx;
			flex: 1;
			.title{
				// height: 70rpx;
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
			.brief{
				height: 70rpx;
				margin:8rpx 12rpx 0 16rpx;
				text{
					font-size: 22rpx;
					// text-align: center;
					color: #757575;
					overflow: hidden;
					word-break: break-all;
					box-sizing: border-box;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					
				}
			}
		}	
			.price{
				display: flex;
				justify-content: space-around;
				align-items: center;
				color: #FA3534;
				font-size: 30rpx;
				
				image{
					width: 46rpx;
					height: 46rpx;
				}
			}
		
		
	
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
