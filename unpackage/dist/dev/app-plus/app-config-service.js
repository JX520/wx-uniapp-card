
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/room/room","pages/company/company","pages/index/index","pages/need/need","pages/service/service","pages/detail/detail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"static/index.png","selectedIconPath":"./static/selectIndex.png"},{"text":"企业","pagePath":"pages/company/company","iconPath":"static/company.png","selectedIconPath":"./static/selectCompany.png"},{"text":"动态","pagePath":"pages/room/room","iconPath":"static/room.png","selectedIconPath":"./static/selectRoom.png"},{"text":"需求","pagePath":"pages/need/need","iconPath":"static/need.png","selectedIconPath":"./static/selectNeed.png"},{"text":"服务","pagePath":"pages/service/service","iconPath":"static/service.png","selectedIconPath":"./static/selectService.png"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"miniCard","compilerVersion":"2.6.11","entryPagePath":"pages/room/room","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/room/room","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"动态"}},{"path":"/pages/company/company","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"公司"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/need/need","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"需求"}},{"path":"/pages/service/service","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"服务"}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarTitleText":"详情介绍"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
