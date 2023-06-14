/*
 * 封装API接口请求入口
 */
const baseUrl = "http://localhost:3000/";

function requests(options = {}){
	options.url = baseUrl + options.url,
	options.method = options.method || 'GET',
	// 设置请求头
	options.header = {
		//appid: ""			// 前后端交互的token
	}
	
	return new Promise((resolve, reject) => {
		
		options.success = (res) => {
			// console.log(res);
			resolve(res.data);
			// if(res.statusCode === 200){
			// 	resolve(res);
			// }else{
			// 	reject(res);
			// }
		}
		options.fail = (err) => {
			reject(err);
		}
		
		uni.request(options);
		
		// #ifdef MP-WEIXIN
		wx.request(options);
		// #endif
	});
}

export default requests;
/*
export default {
	config: {
		beforeRequest(options = {}){
			return new Promise((resolve, reject) => {
				options.url = baseUrl + options.url,
				options.method = options.method || 'GET',
				// 设置请求头
				options.header = {
					appid: ""			// 前后端交互的token
				}
				resolve(options);
			});
		}
	},
	request(options = {}){
		return this.config.beforeRequest(options).then(opt => {
			return uni.request(opt);
		});
	}
}


request = function(options){
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			dataType: options.dataType || 'json',
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {}
		});
	})
}
*/