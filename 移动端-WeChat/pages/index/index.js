const app = getApp()

Page({
  	data: {
		motto: '欢迎来到哆啦书店',
		username: '',
		password: '',
		name_err_msg: '',
		pwd_err_msg: ''
	},
  
  	onLoad: function () {
	},
	bindUsernameTap: function() {
		this.setData({
			name_err_msg: ''
		})
	},
	bindPasswordTap: function() {
		this.setData({
			pwd_err_msg: ''
		})
	},
	bindUsernameInput: function(event) {
		this.setData({
			username: event.detail.value
		})
	},
	bindPasswordInput: function(event){
		this.setData({
			password: event.detail.value
		})
	},
	signin: function(){
		let that = this;
    	wx.request({
			url: 'http://localhost:8181/user/login',
			data: {
				name: this.data.username,
				password: this.data.password
			},
      		method: "POST",
      		success(res) {
				console.log(res.data);
				if(res.data.id == 0){
					that.setData({
						name_err_msg: '此用户不存在'
					})
				}
				else if(res.data.id == -1){
					that.setData({
						pwd_err_msg: '密码错误'
					})
				}
				else if(res.data.id == -2) {
					wx.showToast({
					  title: '此用户无权限！',
					  duration: 500
					})
				}
				else {
					wx.showToast({
						title: '登录成功',
						icon: 'success',
						duration: 500,
						success: function(){
							wx.setStorageSync('id', res.data.id);
							wx.setStorageSync('name', res.data.name);
							wx.navigateTo({
							 	url: '../home/home',
							});
						}
					})
				}
			  },
			  fail(res){
				wx.showToast({
					title: '无法连接后台服务器',
					duration: 500
				})
			  }
    	}); 
	},
	signup: function(){
		wx.navigateTo({
		  url: '../register/register',
		})
	}
})