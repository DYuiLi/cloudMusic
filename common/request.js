/*
 * 封装API接口请求入口
 */
const baseUrl = "http://localhost:3000/";

function requests(options = {}){
	// 请求拦截器
	options.url = baseUrl + options.url;
	options.method = options.method || 'GET';
	// 设置请求头
	options.header = {
		//appid: ""			// 前后端交互的token
	}
	
	return new Promise((resolve, reject) => {
		// 请求成功，返回结果
		options.success = (res) => {
			// 响应拦截器
			switch(res.statusCode){
				case 200:
					resolve(res.data);		// 返回正确数据
					break;
				case 401:       // 权限问题，比如未登录
					break;
				case 403:       // 服务器接受请求，但拒绝执行，例如token过期
					break;
				case 404:       // 找不到页面
					break;
			}
		}
		// 请求失败
		options.fail = (err) => {
			reject(err);
		}
		
		uni.request(options);
		
		
	});
}

export default requests;
