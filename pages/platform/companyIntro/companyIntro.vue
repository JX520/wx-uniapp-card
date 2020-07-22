<template>
	<view>
		<view class="tab_contain">
			<block v-for="(item,index) in tab" :key=index>
				<view class="tab_one" @click="changeTab(index)">
					<view :class="tabid==index?'tab_on':''">{{item.name}}</view>
				</view>
			</block>
		</view>
		<!-- 公司介绍 -->
		<view class="intro" v-if="showIntro">

			<h3>{{platform.cName}}</h3>
			<view class="intro-img" v-for="(item,index) in platform.cDetail" :key='index'>
				<image :src="item.img" mode="aspectFit"></image>
				<text>{{item.intro}}</text>
			</view>


			<text style="text-align: center;">
				\n 公司官网:{{platform.cLink}}
			</text>
			<!-- <image :src="platform.cLogo" mode="aspectFit"></image> -->
		</view>

		<!-- 公司资质 -->
		<view class="able" v-if="showAble">
			<block v-for="(item,index) in platform.cAble" :key='index'>
				<image :src="item" mode="aspectFit"></image>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [{
						name: '公司介绍',
						id: 0,
					},
					{
						name: '公司资质',
						id: 1,
					},
				],
				tabid: 0,
				showIntro: true,
				showAble: false,
				platform: '',
			};
		},
		onLoad() {
			this.getPlatform();
		},
		onShow() {
			this.getPlatform();
		},
		methods: {
			changeTab(id) {
				this.tabid = id;
				if (this.tabid == 0) {
					this.showIntro = true;
					this.showAble = false;
				} else if (this.tabid == 1) {
					this.showIntro = false;
					this.showAble = true;
				}
			},

			//获取平台信息
			async getPlatform() {
				var res = await this.$request.get('/platform', );
				// console.log(res);
				this.platform = res.data.result[0];
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab_contain {
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1rpx solid #eee;
		position: fixed;
		background-color: white;
		z-index: 10;

		.tab_one {
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;

			view {
				height: 100%;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				letter-spacing: 2rpx;
			}

			.tab_on {
				font-size: 28rpx;
				font-weight: 600;
				border-bottom: 4rpx solid #6699CC;
			}
		}
	}

	.intro {
		padding: 100rpx 15rpx 0 15rpx;
		overflow-y: auto;
		image {
			width: 100%;
			height: 300rpx;
		}
		.intro-img {
			image {
				width: 100%;
				height: 300rpx;
			}
		}


		h3 {
			color: #6495ED;
			text-align: center;
			margin-bottom: 20rpx;
		}

		text {
			color: #808080;
			font-size: 26rpx;
			margin-bottom: 20rpx;
			display: block;
			font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
			letter-spacing: 2rpx;

		}
	}

	.able {
		/* width: 95%; */
		height: 1000rpx;
		/* border: 1rpx solid #007AFF; */
		padding: 100rpx 15rpx 0 15rpx;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		image {
			width: 50%;
			height: 300rpx;
			margin-top: 50rpx;
		}
	}
</style>
