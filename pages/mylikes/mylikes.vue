<template>
	<view class="out">
		<block v-for="(item,index) in likeList" :key="index">
			<view class="cu-card case">
				<view class="cu-item shadow">
				
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg">
								<image :src="item.userImg" mode="widthFix"></image>
							</view>
							<view class="content flex-sub">
								<view class="text-grey">{{item.userName}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.publishTime}}
								</view>
							</view>
						</view>
					</view>
					<view class="image" @click="detail(item.uid,item.openid)">
						<image :src="item.img" mode="aspectFit"></image>
						<!-- <view class="cu-tag bg-blue">史诗</view> -->
						<view class="cu-bar bg-shadeBottom">
							<text class="text-cut">{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				likeList:[],
			}
		},
		onLoad() {
			this.getStorage()
		},
		methods: {
			getStorage(){
				this.likeList = uni.getStorageSync('like')
			},
			//动态详情
			detail(uid, openid) {
				uni.navigateTo({
					url: '/pages/roomDetail/roomDetail?uid=' + uid + '&openid=' + openid,
				})
			}
		}
	}
</script>

<style scoped>
.out{
	width: 100%;
	height: auto;
	padding: 20rpx;
	box-sizing: border-box;
	/* border:1rpx solid #007AFF; */
	background-color: white;
}
.image image{
	height: 150rpx;
}
.cu-card.case .image{
	height: 180rpx;
	margin-top:20rpx
}
.cu-list.menu-avatar>.cu-item{
	height: 100rpx;
}
.cu-bar{
	height: 80rpx;
}
.text-cut{
	font-size: 32rpx;
}
</style>
