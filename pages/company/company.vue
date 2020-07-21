<template>
	<view>
		<view class="tab_contain">
				<block v-for="(item,index) in tab" :key=index>
					<view class="tab_one" @click="changeTab(index)" >
						<view :class="tabid==index?'tab_on':''">{{item.name}}</view>
					</view>
				</block>
		</view>
		<!-- 公司介绍 -->
		<view class="intro" v-if="showIntro">
			
			<h3>合肥软界信息科技有限公司</h3>
			<text >
				 深圳市爱世达资讯科技有限公司由原金蝶深圳机构资深团队组建，成立于2014年1月，是一家专业提供企业级信息管理系统与咨询服务的软件公司；也是金蝶软件白金级全分销合作伙伴，并拥有行业自主研发和企业 IT定制服务。
			</text>
			<text >
				 公司拥有一批极具专业背景的企业管理咨询顾问师和技术专家，团队在企业信息化领域积累十余年，具备丰富的行业经验和对管理软件的深度研究，已经形成营销、实施、服务、研发与开发完整的一体化服务体系，能够帮助企业分析经营过程中存在的问题，充分利用 IT技术，建立合理的业务流程，使企业能够成功、合理、经济地运用信息系统创造价值，提升企业竞争力。
			</text>
			<text >
				公司旗下产品线/主营业务：金蝶 ERP产品、企业 IT规划、装饰行业 ERP、检测行业 E- LIMS、专项产品（条码、合同管理、项目管理）、企业定制、移动 APP、微信电商平台等解决方案，用信息化整合企业资源，优化企业生态圈，推动企业借助 IT技术实现产业升级与转型。
			</text>
			<text style="text-align: center;">
				\n 公司官网:http://ruanjie.com
			</text>
			<image src="../../static/logo.png" mode="aspectFit"></image>
		</view>
		<!-- 公司资质 -->
		<view class="able" v-if="showAble">
			
		</view>
		<!-- 相关产品 -->
		<view class="product" v-if="showProduct">
			<view class="product-list">
				<block  v-for="(item , index) in product"  :key="index">
						<view class="product-item" @click="productDetail(item.uid)">
							<image :src="item.img" mode="aspectFit"></image>
							<text>{{item.name}}</text>
						</view>
				</block>
			</view>
		</view>
		<!-- 相关案例 -->
		<view class="cases" v-if="showCase">
			<view class="product-list">
				<block  v-for="(item , index) in cases"  :key="index">
						<view class="product-item" @click="productDetail(item.uid)">
							<image :src="item.img" mode="aspectFit"></image>
							<text>{{item.name}}</text>
						</view>
				</block>
			</view>
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
					{
						name: '相关产品',
						id: 2,
					},
					{
						name: '相关案例',
						id: 3,
					},
					
				],
				tabid:2,
				showIntro:false,
				showAble:false,
				showProduct:true,
				showCase:false,
				
				product:[
					
				],
				cases:[
					
				],
			}
		},
		onLoad() {
			this.dataReq();
		},
		onShow() {
			
		},
		methods: {
			changeTab(id){
				this.tabid = id;
				// console.log(id);
				
				if(this.tabid == 0){
					this.showIntro = true;
					this.showAble =false;
					this.showProduct = false;
					this.showCase = false;
				}
				else if(this.tabid == 1){
					this.showIntro = false;
					this.showAble =true;
					this.showProduct = false;
					this.showCase = false;
				}else if(this.tabid == 2){
					this.showIntro = false;
					this.showAble =false;
					this.showProduct = true;
					this.showCase = false;
				}else if(this.tabid == 3){
					this.showIntro = false;
					this.showAble =false;
					this.showProduct = false;
					this.showCase = true;
				}
			},
			productDetail(uid){
				console.log(uid);
				uni.navigateTo({
				      url: '/pages/detail/detail?uid=' + uid,
				})
			},
			async dataReq(){
				var data = "";
				var res = await this.$request.get('http://127.0.0.1:5000/product',);
				// console.log(res);
				this.productQuery(res.data);
			},
			productQuery(data){
				console.log(data);
				for(var i = 0 ; i < data.length; i ++){
					if(data[i].uid == " " || data[i].uid == null){
						this.dataReq();
					}else{
						if(data[i].type == 0){
							this.product.push(data[i]);
							// console.log(this.product);
						}else if(data[i].type == 1){
							this.cases.push(data[i]);
							// console.log(this.cases);
						}
					}
					
				}
			}
		},
	}
</script>

<style>
.tab_contain {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1rpx solid #eee;
    position: fixed;
    background-color: white;
	z-index: 10;

  }
  .tab_one {
      width: 25%;
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
.intro{
	width: 96%;
	height: 1100rpx;

	padding: 100rpx 15rpx 0 15rpx;
	overflow-y: auto;
}

.intro image{
	width: 100%;
	height: 300rpx;
}
.intro h3{
	color: #6495ED;
	text-align: center;
	margin-bottom: 20rpx;
}
.intro text{
	color: #808080;
	font-size: 26rpx;
	margin-bottom: 20rpx;
	display: block;
	font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	letter-spacing: 2rpx;

}
.able{
	width: 95%;
	height: 1000rpx;
	/* border: 1rpx solid #007AFF; */
	padding: 100rpx 15rpx 0 15rpx;
	overflow-y: auto;
}
.product{
	width: 95%;
	height: 1000rpx;
	/* border: 1rpx solid red; */
	padding: 100rpx 15rpx 0 15rpx;
	overflow-y: auto;

	
}
.product-list{
	width: 97%;
	height: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;

}
.product-item{
	width: 40%;
	height: 320rpx;
	border: 1rpx solid #E5E5E5;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	
}
.product-item image{
	width: 260rpx;
	height: 260rpx;
	border-radius: 10rpx;
}
.product-item text{
	font-size: 30rpx;
	color: #999999;
}
.cases{
	width: 95%;
	height: 1000rpx;
	/* border: 1rpx solid #4CD964; */
	padding: 100rpx 15rpx 0 15rpx;
	overflow-y: auto;
}


</style>
