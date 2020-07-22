<template>
	<view>
		<view class="menu colcenter">
			<view class="menu-1 rowevenly">
				<view class="menu-1-1 colcenter" v-for="(item,index) in menu" :key='index' @click="goPlatform(item.url)" >
					<image :src="item.img" mode="aspectFit"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="tab_contain">
				<block v-for="(item,index) in tab" :key=index>
					<view class="tab_one" @click="changeTab(index)" >
						<view :class="tabid==index?'tab_on':''">{{item.name}}</view>
					</view>
				</block>
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
				menu:[
					{
						title:'平台介绍',
						img:'../../static/code.jpg',
						url:'/pages/platform/companyIntro/companyIntro'
					},{
						title:'平台商城',
						img:'../../static/logo.png',
						url:'/pages/platform/shop/shop'
					},{
						title:'平台需求',
						img:'../../static/logo1.png',
						url:'/pages/platform/need/need'
					},{
						title:'我要拜访',
						img:'../../static/logo.png',
						url:'/pages/platform/visit/visit'
					},
				],
				tab: [
					{
						name: '相关产品',
						id: 0,
					},
					{
						name: '相关案例',
						id: 1,
					},
					
				],
				tabid:0,
				showProduct:true,
				showCase:false,
				platform:'',
				product:[],
				cases:[],
			}
		},
		onLoad() {
			// this.dataReq();
			this.getPlatform();
		},
		onShow() {
			
		},
		methods: {
			changeTab(id){
				this.tabid = id;
				// console.log(id);
				if(this.tabid == 0){
					this.showProduct = true;
					this.showCase = false;
				}
				else if(this.tabid == 1){
					this.showProduct = false;
					this.showCase = true;
				}
			},
			
			//获取平台信息
			async getPlatform(){
				var res = await this.$request.get('/platform',);
				// console.log(res);
				this.platform = res.data.result[0];
				this.productQuery(this.platform.cProducts);
			},
			productQuery(data){
				console.log(data);
				for(var i = 0 ; i < data.length; i ++){
					if(data[i].uid == " " || data[i].uid == null){
						this.getPlatform();
					}else{
						if(data[i].type == 1){
							this.product.push(data[i]);
							// console.log(this.product);
						}else if(data[i].type == 0){
							this.cases.push(data[i]);
							// console.log(this.cases);
						}
					}
					
				}
			},
			productDetail(uid){
				console.log(uid);
				uni.navigateTo({
				      url: '/pages/detail/detail?uid=' + uid,
				})
			},
			
			goPlatform(url){
				console.log(url);
				uni.navigateTo({
					url:url
				})
			},
		},
	}
</script>

<style>

.menu{
	width: 100%;
	height: 150rpx;
	position: fixed;
	top: 0;
	background-color: white;
	z-index: 10;
	/* border: 1px solid red; */
}
.menu-1{
	width: 94%;
}

.menu-1-1{
	font-size: 22rpx;
}
.menu-1-1 image{
	width: 80rpx;
	height: 80rpx;
	border-radius: 10rpx;
}
.tab_contain {
    width: 100%;
    height: 60rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1rpx solid #eee;
    position: fixed;
	top: 140rpx;
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
      font-size: 26rpx;
      letter-spacing: 2rpx;
    }
    
    .tab_on {
      font-size: 28rpx;
      font-weight: 600;
      border-bottom: 4rpx solid #6699CC;
    }

.product{
	/* width: 95%; */
	width: 100%;
	/* height: 2000rpx; */
	/* border: 1rpx solid red; */
	padding: 230rpx 15rpx 0 15rpx;
	overflow-y: auto;

	
}
.product-list{
	/* width: 97%; */
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
	/* width: 95%; */
	width: 100%;
	/* height: 1000rpx; */
	/* border: 1rpx solid #4CD964; */
	padding: 230rpx 15rpx 0 15rpx;
	overflow-y: auto;
}


</style>
