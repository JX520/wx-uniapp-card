const commonUrl = "http://127.0.0.1:5000"; //公共路径 

// post请求
function postRequest(url, data) {
    var promise = new Promise((resolve, reject) => {
        var that = this;
        uni.request({
            url: commonUrl + url,
			// url:url,
            data: data,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                // token: uni.getStorageSync("token")
            },
            success: function(res) {
                //返回什么就相应的做调整
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    // 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
                    //接口后面的then执行
                    // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                    //不会被阻断在那里执行不下去！
                    resolve(res.data.msg);
                }
            },
            error: function(e) {
                reject(e);
            }
        });
    });
    return promise;
}

// get请求
function getRequest(url, data) {
    var promise = new Promise((resolve, reject) => {
        var that = this;
        uni.request({
            url: commonUrl + url,
			// url:url,
            data: data,
            method: "GET",
            dataType: "json",
            // header: {
            //     "content-type": "application/json"
            // },
            success: function(res) {
                // if (res.statusCode == 200) {
                //     resolve(res.data);
                // } else {
                //     resolve(res.data);
                // }
				resolve(res);
            },
            error: function(e) {
                reject(e);
            }
        });
    });
    return promise;
}

module.exports = {
    post: postRequest,
    get: getRequest
};
