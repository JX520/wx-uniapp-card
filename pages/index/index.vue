<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<view class='nav' :style="{height:navH + 'rpx'}">
			<button class='title_icon' @getuserinfo='getUserInfo' open-type='getUserInfo' >

				<image :src='userInfo.avatarUrl'  ></image>
				<!-- <open-data  type="avatarUrl"></open-data> -->
				<text >个人中心</text>
			</button>
			<view class='title_text'>
				首页
			</view>
		</view>
		
		<view class="shadow" @click="closeShadow" v-if="shadow"></view>
		<view class="shadow-content">
			<view :style="{margin:clearH + 'rpx' }" >
				
			</view>
			<view class="card">
				<view class="card-logo">
					<image src="../../static/logo.png"></image>
					<text>合肥软界信息科技有限公司</text>
					<button class="cu-btn round bg-yellow sm share" open-type="share">
						分享
					</button>
				</view>
				
				<view class="card-body">
					<view class="card-body-msg">
						<image src="../../static/logo.png"></image>
						<text style="font-size: 32rpx;color: white;">张总</text>
						<text>董事长</text>
						<text>18888888888</text>
					</view>
					<view class="card-body-intro">
						<view class="card-body-title">
							<text>主营产品</text>
						</view>
						<view class="card-body-product">
							<ul>
								<li>公众号.小程序.APP</li>
								<li>企业网站.后台管理系统</li>
								<li>基于物联网的云数据监控平台</li>
								<li>智能制造.智慧城市系列</li>
								<li>工控上位机软件系统</li>
							</ul>
						</view>
					</view>
				</view>
			</view>

			<view class="intro">
				<view class="intro-company">
					<view class="intro-company-title">
						<text>公司简介:</text>
					</view>
					<view class="intro-company-msg">
						<text>合肥软界信息科技有限公司</text>
						<view class="company-more">
							<navigator url="/pages/company/company" open-type="switchTab" hover-class="other-navigator-hover">
								<text>--了解更多</text>
							</navigator>
						</view>
					</view>

				</view>
				<view class="intro-myself">
					<view class="intro-company-title">
						<text>个人简介:</text>
					</view>
					<view class="intro-myself-msg">
						<view class="intro-people">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="intro-people-msg">

							<text style="font-size: 34rpx;color: black;">张总</text>


							<view class="people-1">
								<image src="../../static/phone.png"></image>
								<text>
									189 1960 2840
								</text>
							</view>
							<view class="people-1">
								<image src="../../static/email.png"></image>
								<text>
									yfzhang@ranjoin.cn
								</text>
							</view>
							<view class="people-1">
								<image src="../../static/address.png"></image>
								<text>
									安徽省合肥市蜀山区仰桥路与雪霁路交叉口西150米仪宇孵化器6楼610
								</text>
							</view>
							<view class="people-more">
								<text @click="showShadow">--了解更多</text>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view id="people" class="people" v-if="shadow">
				<!-- <view id="people" class="people" v-if="shadow" :animation = "animateShow"> -->
				<view class="p-intro">
					<text>工作经历</text>
					<view class="p-intro-work">
						<text>从事于软件开发20年....</text>
					</view>
				</view>
				<view class="p-intro">
					<text>个人成就</text>
					<view class="p-intro-work">
						<text>从事于软件开发20年....</text>
					</view>
				</view>
				<view class="p-wx" v-for="(item , index) in wxImg" :key='index'>
					<image   @longtap="saveImg()" :src="item"  data-src="item" mode=""></image>
					<text>添加微信</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	 
	export default {
		data() {
			return {
				shadow: false,
				animateShow: {},
				navH: 0,
				clearH:0,
				userInfo:{},
				wxImg:[
					'../../static/code.jpg',
				],
				wx:'../../static/code.jpg',
			}
		},
		onLoad() {
			this.navHeight();
			this.getUser();
		},
		onShow() {
			// 初始化一个动画
			var animation = uni.createAnimation({
				// duration: 2000,
				timingFunction: 'ease',
			})
			this.animation = animation
		},
		methods: {
			showShadow() {
				this.shadow = true;
				//this.opacityAnimate();
			},
			closeShadow() {
				this.shadow = false;
				//this.closeAnimate();
			},
			opacityAnimate() {
				this.animation
					.opacity(0).scale(0.5, 0.5).step({
						duration: 200
					})
					.opacity(1).scale(1, 1).step({
						duration: 500
					});

				// 导出动画数据传递给data层
				this.animateShow = this.animation.export();
			},
			closeAnimate() {
				this.animation
					.opacity(1).step({
						duration: 500
					})
					.opacity(0).step({
						duration: 500
					});

				// 导出动画数据传递给data层
				this.animateShow = this.animation.export();
			},
			
			//获取不同手机导航栏高度
			navHeight() {
				uni.getSystemInfo({
					success: (res) => {
						if(res.model == "iPhone XR" ||res.model == "iPhone X" ||res.model == "iPhone XS Max"){
							this.navH = res.statusBarHeight * 2  + (res.screenHeight - res.windowHeight) ;
							this.clearH = res.statusBarHeight * 2 + (res.screenHeight - res.windowHeight);
						}else{
							this.navH = res.statusBarHeight * 3  + (res.screenHeight - res.windowHeight) ;
							this.clearH = res.statusBarHeight * 3 + (res.screenHeight - res.windowHeight);
						}
						
						// console.log(res);

					},
					fail: (err) => {
						console.log(err);
					}
				})

			},
			
			getUser(){
				uni.getUserInfo({
					success: (res) => {
						this.userInfo = res.userInfo;
					}
				})
			},
			//获取用户信息和openid
			getUserInfo(){
				uni.login({
					success:res =>{
						if(res.code){
							uni.getUserInfo({
								withCredentials:true,
								success: (res_user) => {
									this.getOpenId(res.code,res_user.encryptedData,res.iv);
									this.userInfo = res_user.userInfo;
									// console.log(res_user);
									uni.navigateTo({
										url: '/pages/user/user'
									});
									uni.setStorage({
										key:"userInfo",
										data:res_user.userInfo
									})
								},
								
							})
						}else{
							
						}
					}
				})
			},
			
			async getOpenId(code,encryptedData,iv){
				var data = {
					// appid:"wxddfdc0207f9685cc",
					// secret:"46c39d9ef7186ded35c917314b298070",
					 js_code:code,
					// grant_type:"authorization_code",
					// encryptedData:encryptedData,
					// iv:iv
				};
				// console.log(code);
				// var res = await this.$request.get('http://127.0.0.1:5000/getUser',data);
				var res = await this.$request.get("https://api.weixin.qq.com/sns/jscode2session?appid=wxddfdc0207f9685cc&secret=46c39d9ef7186ded35c917314b298070&js_code=" + code + "&grant_type=authorization_code",);
				console.log(res);
				var openid = res.data.openid;
				uni.setStorage({
					key:'openid',
					data:res.data.openid
				})
			},
			
			
			//
			onShareAppMessage() {
				return {
					title: '合肥软界信息科技有限公司',
					path: '/pages/index/index',
				}
			},
			
			preImg(){
				 // var src = e.currenttarget.dataset.src;
				uni.previewImage({
					current: this.wx,
					urls:[this.wx],
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			saveImg () {
			    uni.getSetting({
			      success:(res)=> {
			        //未授权 先授权 然后保存
			        if (!res.authSetting['scope.writePhotosAlbum']) {
			          uni.authorize({
			            scope: 'scope.writePhotosAlbum',
			            success:(re)=> {
			              this.saveToBlum();
			            }
			          })
			        }else{
			         //已授 直接调用保存到相册方法
			          this.saveToBlum();
			        }
			      }
			    })  
			},
			saveToBlum(){

				    wx.getImageInfo({
				      src: this.wx,
				      success:(ret)=> {
				        var path = ret.path;
				        wx.saveImageToPhotosAlbum({
				          filePath: path,
				          success:(result)=> {
				            wx.showToast({
				              title: '保存成功',
				              icon: 'success'
				            })
				          },
				        })
				      }
				    })
			}
		},
	}
</script>

<style>
	body {
		overflow: hidden;
	}
	.clear{
		width: 100%;
		height: 130rpx;
	}
	.shadow {
		width: 99%;
		height: 100%;
		background-color: #333333;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		opacity: 0.7;
	}

	.shadow-content {
		width: 99%;
		height: 1100rpx;
		/* border: 1rpx solid red; */
		padding: 15rpx;
		background-color: #F2f2f2;
	}

	.card {
		width: 94%;
		height: 360rpx;

		padding: 10rpx;
		border-radius: 20rpx;
		background: currentColor;
	}

	.card-logo {
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #4a4a4a;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.card-logo image {
		width: 60rpx;
		height: 60rpx;
	}

	.card-logo text {
		font-size: 30rpx;
		color: white;
		letter-spacing: 6rpx;
		margin-left: 0;
	}
	.share{
		position: absolute;
		top: 24rpx;
		right: 5rpx;
	}
	.card-body {
		width: 100%;
		height: 200rpx;
		padding-top: 20rpx;
		display: flex;
		flex-direction: row;

	}

	.card-body-msg {
		width: 40%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.card-body-msg image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.card-body-msg text {
		font-size: 24rpx;
		color: #999999;
		margin-top: 8rpx;
	}

	.card-body-intro {
		width: 60%;
		height: 200rpx;
		/* 		border-left: 1rpx solid gray; */
	}

	.card-body-title {
		width: 100%;
		height: 50rpx;
		display: flex;
		font-size: 30rpx;
		letter-spacing: 5rpx;
		color: white;
		justify-content: space-around;
	}
	.card-body-title text{
		color: #AAAAAA;
		text-align: left;
	}

	.card-body-product li {
		font-size: 24rpx;
		color: #4f77bc;
		letter-spacing: 2rpx;

	}

	.intro {
		width: 94%;
		height: 720rpx;

		border-radius: 10rpx;
		background-color: white;
		margin-top: 20rpx;
		padding: 10rpx;
	}

	.intro-company {
		width: 95%;
		height: 320rpx;
		padding: 10rpx;

	}

	.intro-company-title {
		width: 22%;
		height: 50rpx;
		line-height: 40rpx;
		border-bottom: 2rpx solid #6495ED;
		/* 		border-radius: 10rpx; */
		padding-right: 10rpx;

	}

	.intro-company-title text {
		font-size: 28rpx;
		margin-left: 10rpx;
		letter-spacing: 2rpx;
	}

	.intro-company-msg {
		width: 100%;
		height: 260rpx;
		/* 		border: 1rpx solid #007AFF; */
		border-bottom: 2rpx solid whitesmoke;
		margin-top: 20rpx;
		position: relative;

	}

	.intro-company-msg text {
		font-size: 24rpx;
		color: gray;
		letter-spacing: 5rpx;
	}

	.company-more text {
		font-size: 24rpx;
		color: #007AFF;
		position: absolute;
		bottom: 5rpx;
		right: 5rpx;
	}

	.intro-myself {
		width: 95%;
		height: 340rpx;
		padding: 10rpx;
		position: relative;

	}

	.intro-myself-msg {
		width: 100%;
		height: 260rpx;
		/* 		border: 1rpx solid #007AFF; */
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.intro-people {
		width: 40%;
		height: 210rpx;

		/* 		margin: 0 auto; */
		display: flex;

		align-items: center;
		justify-content: center;
	}

	.intro-people image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		margin: 0 auto;
	}

	.intro-people-msg {
		width: 60%;
		height: 240rpx;
		border-top: 1rpx solid whitesmoke;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		float: left;

	}
	.people-1{
		width: 100%;
		height: auto;
	}
	.intro-people-msg image {
		width: 30rpx;
		height: 30rpx;
	}

	.intro-people-msg li {
		list-style: none;
		font-size: 24rpx;
	}

	.intro-people-msg text {
		font-size: 22rpx;
		color: gray;
	}

	.people-more text {
		font-size: 24rpx;
		color: #007AFF;
		position: absolute;
		bottom: 10rpx;
		right: 20rpx;
		letter-spacing: 5rpx;
	}

	.people {
		width: 70%;
		height: 80%;
		margin: 0 auto;
		z-index: 999;
		position: fixed;
		top: 10%;
		left: 13%;
		border-radius: 10rpx;
		background-color: white;
		padding: 10rpx 10rpx 0 10rpx;

	}

	.p-intro {
		width: 99%;
		height: 37%;

		text-align: center;
	}

	.p-intro text {
		width: 99%;
		font-size: 30rpx;


	}

	.p-intro-work {
		width: 99%;
		height: 320rpx;
		border: 1rpx solid whitesmoke;
		text-align: left;
		border-radius: 10rpx;
		overflow-y: auto;
		background-color: whitesmoke;
	}

	.p-intro-work text {
		font-size: 26rpx;
		color: #333333;
	}

	.p-wx {
		width: 99%;
		height: 240rpx;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.p-wx image {
		width: 200rpx;
		height: 200rpx;
	}

	.p-wx text {
		font-size: 26rpx;
		color: #333333;
	}


	.nav {
		width: 100%;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		background: #fff;
	}

	.title_text {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
		font-size: 26rpx;
	}

	.title_icon {
		position: absolute;
		bottom: 10rpx;
		left: 10rpx;
		height: 65rpx;
		line-height: 65rpx;
		border-radius: 70rpx;
		box-sizing: border-box;
		border: 1rpx solid #eaeaea;
		display: flex;
		z-index: 20;
		flex-direction: row;
		padding: 0 10rpx;
		align-items: center;
		justify-content: center;
		background-color: white;
	}

	.title_icon image {
		display: inline-block;
		overflow: hidden;
		width: 60rpx;
		height: 60rpx;
		margin: 0 10rpx;
		text-align: center;
		border-radius: 50%;
	}
	.title_icon text{
		font-size: 26rpx;
		letter-spacing: 2rpx;
	}

	.title_icon view {
		height: 18px;
		border-left: 1px solid #eaeaea;
		margin-top: 6px;
	}
</style>
