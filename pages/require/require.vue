<template>
	<view>
		<view class="shadow" @click= "closeShadow" v-if="shadow" ></view>
		<view class="out">
		<view class="need">
			<view class="need-header" @click="showShadow">
				<text>需求下单介绍</text>
			</view>
			<view class="need-intro" v-if="shadow">
				<text>提交您的需求 我们给您解决</text>
			</view>
			<view class="need-body">
				<view class="need-body-content">
					<form>
						
						<view class="cu-form-group ">
							<view class="title"><text class="red">*</text>姓名</view>
							<input placeholder="请输入您的姓名" name="input" @input="nameInput" :value="name"></input>
						</view>
						<view class="cu-form-group">
							<view class="title"><text class="red">*</text>微信</view>
							<input placeholder="请输入您的微信" name="input" @input="wxInput" :value="wx"></input>
						</view>
						<view class="cu-form-group">
							<view class="title"><text class="red">*</text>手机号</view>
							<input placeholder="请输入您的手机号" name="input" @input="phoneInput" :value="phone"></input>
						</view>
						<view class="cu-form-group align-start ">
							<view class="title"><text class="red">*</text>我有需求</view>
								<textarea maxlength="-1" :disabled="modalName!=null" @input="requireInput" placeholder="我需要开发小程序.后台管理系统.软件开发..." :value="need"></textarea>
						</view>
						<view class="cu-form-group margin-top">
										<view class="title"><text class="red">*</text>验证码</view>
										<input placeholder="输入验证码(不区分大小写)" name="input" @input="codeInput" :value="codeNum"></input>
										<!-- <text class='cu-btn bg-green '>验证码</text> -->
							<canvas class='canvas' canvas-id="canvas" @click='changeCaptcha()'></canvas>
						</view>
						
						
						<view class="margin-tb-sm  text-center ">
						<button class="cu-btn round bg-blue margin-top" @click="checkInput">提交需求</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		</view>
		
	</view>
</template>

<script>
	let Mcaptcha = require('../../utils/captcha.js');
	// import UniSInput from '../../components/s-input/s-input.vue';
	
	export default {
		// components: {
		//     UniSInput
		// },
		data() {
			return {
				shadow:false,
				name:'',
				wx:'',
				phone:'',
				need:'',
				num:'',
				codeNum:'',
			}
		},
		onLoad() {

		},
		onShow() {
			this.changeCaptcha();
		},
		methods: {
			showShadow(){
				this.shadow=true;
			},
			closeShadow(){
				this.shadow=false;
			},
			//显示验证码
			getRanNum() {
			    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
			    var pwd = '';
			    for (var i = 0; i < 4; i++) {
			      if (Math.random() < 48) {
			        pwd += chars.charAt(Math.random() * 48 - 1);
			      }
			    }
			    return pwd;
			},
			changeCaptcha(){
				var num = this.getRanNum();
				this.num = num.toLowerCase();
				console.log(this.num);
				new Mcaptcha({
				      el: 'canvas',
				      width: 90,//对图形的宽高进行控制
				      height: 40,
				      code: num
				});
			},
			
			//输入姓名
			nameInput(e){
				this.name = e.detail.value
			},
			//微信
			wxInput(e){
				this.wx = e.detail.value
			},
			//手机号
			phoneInput(e){
				this.phone = e.detail.value
			},
			//需求
			requireInput(e){
				this.need = e.detail.value
			},
			//输入验证码
			codeInput(e){
				this.codeNum = e.detail.value.toLowerCase();
				// console.log(this.codeNum)
			},
			
			//校验内容
			checkInput(){
				if(this.name == '' || this.wx == '' || this.phone == '' || this.require == ''){
					uni.showToast({
						title:'各项内容不能为空！',
						icon:"none",
					})
				}else{
					this.checkCode();
				}
				
				
			},
			//校验验证码
			checkCode(){
				if(this.num == this.codeNum){
					 this.submit();
					// console.log('suc');
					
					this.changeCaptcha();
				}else{
					this.changeCaptcha();
					uni.showToast({
						title:'验证码错误!',
						icon:"none",
					})
				}
			},
			//提交需求
			 submit(){
				uni.getStorage({
					key:'openid',
					success:(res)=>{
						this.confim(res.data)
					},
					fail: (err) => {
						this.getUserInfo()
					}
				})
			},
			
			getUserInfo(){
				uni.login({
					success:res =>{
						if(res.code){
							uni.getUserInfo({
								withCredentials:true,
								success: (res_user) => {
									this.getOpenId(res.code);
								},
								
							})
						}else{
							
						}
					}
				})
			},
			async getOpenId(code){
				var data = {
					 js_code:code,
				};
				// console.log(code);
				// var res = await this.$request.get('http://127.0.0.1:5000/getUser',data);
				var res = await this.$request.get("https://api.weixin.qq.com/sns/jscode2session?appid=wxddfdc0207f9685cc&secret=46c39d9ef7186ded35c917314b298070&js_code=" + code + "&grant_type=authorization_code",);
				uni.setStorage({
					key:'openid',
					data:res.data.openid
				})
			},
			
			
			//确认提交需求
			async confim(openid){
				var data = {
					openid:openid,
					name:this.name,
					wx:this.wx,
					phone:this.phone,
					need:this.need,
					publishTime:this.$moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
				};
				
				var res = await this.$request.post('/require',data);
				// console.log(res);
				if(res.code == 0){
					uni.showToast({
						title:'提交成功！',
						icon:"none",
					});
					this.name ='';
					this.wx ='';
					this.phone ='';
					this.need ='';
					this.codeNum ='';
				}else{
					uni.showToast({
						title:'失败请重试！',
						icon:"none",
					})
				}
			},
		},
		
	}
</script>

<style>
.out{
	width: 100%;
	height: 1000rpx;
	background-image: url("../../static/needBG.jpeg");
	background-repeat:no-repeat;
	background-position:center top;
/* 	background-size:100% 100%; */
	display: flex;
	align-items: center;
	justify-content: center;

}
.shadow{
		width: 100%;
		height: 100%;
		background-color: #333333;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		opacity: 0.7;
}
.need{
	width: 94%;
	height: auto;
	padding: 20rpx;
	margin-top: 20rpx;
}
.need-header{
	width: 100%;
	height: 60rpx;
	line-height: 40rpx;
	
	text-align: center;
}
.need-header text{
	
	font-size: 26rpx;
	color: #6495ED;

	border-radius: 10rpx;
	text-decoration: underline;
}
.need-intro {
	width: 50%;
	height: 40%;
	margin: 0 auto;
	z-index: 999;
	position: fixed;
	top: 28%;
	left: 23%;
	border-radius: 10rpx;
	background-color: white;
	padding: 30rpx ;
	text-align: center;
	color: gray;
}
.need-intro text{
	font-size: 30rpx;
	
}
.canvas{
	width: 150rpx;
	height: 60rpx;
	/* border: 1rpx solid #007AFF; */

}
.red{
	color: red;
}
</style>
