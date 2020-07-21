<template>
	<view>


		<view class="tab_contain">
			<block v-for="(item,index) in tab" :key="index">
				<view class="tab_one" @click="changeTab(index)">
					<view :class="tabid==index?'tab_on':''">{{item.name}}</view>
				</view>
			</block>
		</view>
		<view class="company" v-if="showCompany">
			<block v-for="(item,index) in companyList" :key="index">
				<view class="cu-card case">
					<view class="cu-item shadow">
						<view class="image" @click="detail(item.uid,item.openid)">
							<image :src="item.img" mode="aspectFit"></image>
							<!-- <view class="cu-tag bg-blue">史诗</view> -->
							<view class="cu-bar bg-shadeBottom">
								<text class="text-cut">{{item.title}}</text>
							</view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg">
									<image :src="item.userImg" mode="widthFix"></image>
								</view>
								<view class="content flex-sub">
									<view class="text-grey">{{item.userName}}</view>
									<view class="text-gray text-sm flex justify-between">
										{{item.publishTime}}
										<view class="text-gray text-sm center">
											<view class="company-list-footer-body" @click="changeNice(index,item.uid,item.openid)">
												<!-- <image :src="item.isNice == true ? niceActive : nice"></image> -->
												<image src="../../static/collect.png"></image>
												<!-- <text>收藏</text> -->
											</view>
											<view class="company-list-footer-body" @click="toReview(item.uid,item.openid)">
												<image src="../../static/review.png"></image>
												<text>{{(item.review).length}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>


			<!-- 整个评论区  -->
			<view class='talks-layer' :animation="talksAnimationData">
				<!-- 主要作用是点击后隐藏评论区  -->
				<view class='layer-white-space' @click="closeReview">
				</view>
				<!-- 评论区  -->
				<view class='talks'>
					<!-- 评论头部  -->
					<view class='talk-header'>
						<view class='talk-count'>{{talks.length}} 条评论</view>
						<image src='' class='talk-close'></image>
					</view>

					<!-- 评论体  -->
					<scroll-view class='talk-body' scroll-y="true">
						<view class='talk-item' v-for="(item,index) in talks" :key="index">
							<view class='talk-item-left'>
								<image class='talk-item-face' :src='item.avatarUrl'></image>
							</view>
							<view class='talk-item-right'>
								<text class='talk-item-nickname'>{{item.nickName}}</text>
								<text class='talk-item-content'>{{item.content}}</text>
								<text class='talk-item-time'>{{item.publishTime}}</text>
							</view>
						</view>
					</scroll-view>

					<!-- 评论底部  -->
					<!-- <view class='talk-footer'>
			      <input class='talk-input' type='text' placeholder='说点什么吧!'></input>
			    </view> -->
				</view>
			</view>
		</view>
		<view class="one" v-if="showOne">
			哈哈
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [{
						name: '公司动态',
						id: 0,
					},
					{
						name: '个人动态',
						id: 1,
					}
				],
				tabid: 0,
				showOne: false,
				showCompany: true,
				nice: "../../static/nice.png",
				niceActive: "../../static/niceActive.png",
				companyList: [],
				talks: [],
				talksAnimationData: {},
				openid: '',
			}
		},
		onLoad() {
			// this.shareReq();
		},
		onShow() {
			// 评论弹出层动画创建
			this.animation = wx.createAnimation({
				duration: 400, // 整个动画过程花费的时间，单位为毫秒
				timingFunction: "ease", // 动画的类型
				delay: 0 // 动画延迟参数
			})
			this.shareReq()
		},
		methods: {
			changeTab(id) {
				this.tabid = id;
				// console.log(id);	
				if (this.tabid == 0) {
					this.showCompany = true;
					this.showOne = false;
				} else if (this.tabid == 1) {
					this.showCompany = false;
					this.showOne = true;
				}
			},

			//请求数据
			async shareReq() {
				var res = await this.$request.get('/share');
				console.log(res);
				this.companyList = res.data;
			},

			// 动画加载数据
			loadTalks(uid) {
				this.animation.bottom("10rpx").height("100%").step({
					duration: 1000
				});

				this.reviewReq(uid);

				this.talksAnimationData = this.animation.export()
			},

			async reviewReq(uid) {
				var data = {
					'uid': uid
				};
				var res = await this.$request.get('/share?uid=' + uid);
				this.talks = res.data.review;
			},

			async changeNice(index, uid, openid) {
				var data = {
					'uid': uid,
					'flag': 1,
				};
				// var res = await this.$request.get('http://127.0.0.1:5000/share?uid=' + uid + 'flag=1');
				// console.log(res);
				// this.shareReq()
				var like = this.companyList.find(function(like) {
					return like.uid == uid
				})

				// console.log(like);
				var likearr = uni.getStorageSync('like') || [];
				// console.log(likearr);
					var result = likearr.some(item=>{
					if(item.uid==uid){
					return true
					}
					})
					if(result){
						//取消收藏
						var cancelarr = uni.getStorageSync('like');
						cancelarr.splice(index, 1);
						uni.setStorageSync('like', cancelarr);
						console.log(cancelarr);
						uni.showToast({
							icon: 'none',
							title: '取消收藏成功!'
						})
					}else {
						//收藏
						likearr.push(like);
						console.log(likearr);
						uni.setStorageSync('like', likearr);
						uni.showToast({
							icon: 'none',
							title: '收藏成功！'
						})
					}
					
			},

			toReview(uid, openid) {
				this.loadTalks(uid);
			},
			closeReview() {
				this.hideTalks()
			},
			hideTalks() {
				// 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
				this.animation.bottom("-100%").height("0rpx").step({
					duration: 1000
				});
				this.talks = [];
				this.talksAnimationData = this.animation.export()
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

<style>
	.tab_contain {
		width: 100%;
		height: 70rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1rpx solid #eee;
		position: fixed;
		background-color: white;
		z-index: 10;

	}

	.tab_one {
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}

	.tab_one view {
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}

	.tab_on {
		font-size: 32rpx;
		font-weight: 600;
		border-bottom: 4rpx solid #6699CC;
	}

	.company,
	.one {
		width: 96%;
		height: auto;
		/* border: 1rpx solid #007AFF; */
		padding: 100rpx 15rpx 0 15rpx;
		overflow-y: auto;
	}

	.company-list {
		width: 94%;
		height: 500rpx;
		padding: 20rpx;
		border: 1rpx solid red;
	}

	.company-list-header {
		width: 100%;
		height: 100rpx;
		/* 		border: 1rpx solid #007AFF; */
		display: flex;
		flex-direction: row;
	}

	.company-list-header image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}

	.company-list-header-title h5 {
		font-size: 30rpx;

	}

	.company-list-header-title text {
		font-size: 24rpx;
		color: #949396;
	}

	.company-list-body {
		width: 100%;
		height: 320rpx;
		border: 1rpx solid whitesmoke;
		border-radius: 10rpx;

	}

	.company-list-body image {
		width: 100%;
		height: 100%;
	}

	.company-list-body-title {
		width: 100%;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		/* border: 1rpx solid #007AFF; */
	}

	.company-list-body-title text {
		font-size: 30rpx;
		color: #333333;
		overflow: hidden;
	}

	.company-list-footer {
		width: 98%;
		height: 50rpx;
		/* 		border: 1rpx solid red; */
		padding: 10rpx 10rpx 0 0;
		display: flex;
		flex-direction: row;

	}

	.company-list-footer-body {
		width: 60rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		/* border: 1rpx solid #007AFF; */
		margin-right: 10rpx;
	}

	.company-list-footer-body image {
		width: 35rpx;
		height: 35rpx;
	}

	.company-list-footer-body text {
		font-size: 26rpx;
		color: #949396;
	}

	.center {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.nice {
		width: 30rpx;
		height: 30rpx;

	}



	/* 评论层 */
	.talks-layer {
		position: fixed;
		bottom: 0;
		height: 0;
		width: 100%;
		overflow: hidden;
		z-index: 99;
		/* background-color: blue; */
	}

	.layer-white-space {
		height: 100%;
		width: 95%;
		background-color: white;
		opacity: .1;
		/* background-color: green; */
	}

	.talks {
		position: absolute;
		height: 700rpx;
		width: 95%;
		bottom: 10rpx;
		background-color: #f1f1f1;
		border-top-left-radius: 5%;
		border-top-right-radius: 5%;
		border: 1rpx solid #CCCCCC;
		/* background-color: red; */
	}

	.talk-header {
		width: 100%;
		height: 70rpx;
		padding-top: 30rpx;
		text-align: center;
	}

	.talk-body {
		height: 500rpx;
	}

	.talk-footer {
		position: absolute;
		bottom: 0rpx;
		width: 100%;
		height: 100rpx;
		background-color: #f1f1f1;
	}

	/* 顶部元素  */

	.talk-count {
		font-size: 0.8rem;
		height: 40rpx;
		color: #646566;
	}

	.talk-close {
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		width: 40rpx;
		height: 40rpx;
	}

	/* 中部元素  */

	.talk-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		width: 100%;
		color: #343434;
		font-size: 30rpx;
	}

	.talk-item-left {
		display: flex;
		flex-direction: row;
		margin: 20rpx 30rpx;
	}

	.talk-item-face {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.talk-item-right {
		width: 100%;
		/* 	  border-bottom: solid 1rpx #6a6869; */
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
	}

	.talk-item-time {
		font-size: 22rpx;
		color: #6a6869;
		margin-bottom: 20rpx;
	}

	/* 底部元素  */

	.talk-input {
		width: 100%;
		padding: 20rpx 40rpx;
		color: white;
		border-top-left-radius: 5%;
		border-top-right-radius: 5%;
	}
</style>
