const app = getApp();

Page({
	data: {
		email: '',
		username: '',
		password: '',
		confirm: '',
		email_err_msg: '',
		name_err_msg: '',
		pwd_err_msg: '',
		confirm_err_msg: ''
	},
	onLoad: function(){
	},
	bindEmailInput: function(event) {
		this.setData({
			email: event.detail.value
		})
	},
	bindEmailTap: function() {
		this.setData({
			email_err_msg: ''
		})
	},
	bindUsernameInput: function(event) {
		this.setData({
			username: event.detail.value
		})
	},
	bindUsernameTap: function() {
		this.setData({
			name_err_msg: ''
		})
	},
	bindPasswordInput: function(event) {
		this.setData({
			password: event.detail.value
		})
	},
	bindPasswordTap: function() {
		this.setData({
			pwd_err_msg: ''
		})
	},
	bindConfirmInput: function(event) {
		this.setData({
			confirm: event.detail.value
		})
	},
	bindConfirmTap: function() {
		this.setData({
			confirm_err_msg: ''
		})
	},
	submit: function(){
		var that = this;
		if (that.data.email.length == 0) {
			that.setData({ email_err_msg: '邮箱不能为空！'});
			return;
		}
		else {
			var format = /^([a-zA-Z0-9.]{3,12})+@[a-zA-Z0-9]+\.([a-zA-Z.]{2,12})$/;
			if (!format.test(that.data.email)) {
				that.setData({ email_err_msg: '邮箱格式不正确！' });
				return;
			}
		}

		if (that.data.username.length == 0) {
			that.setData({ name_err_msg: '用户名不能为空！'});
			return;
		}
		else if (that.data.username.length < 3 || that.data.username.length > 12) {
			that.setData({ name_err_msg: '用户名长度需在 3 到 12 个字符！'});
			return;
		}

		if (that.data.password.length == 0) {
			that.setData({ pwd_err_msg: '密码不能为空！'});
			return;
		}
		else if (that.data.password.length < 6 || that.data.password.length > 16) {
			that.setData({ pwd_err_msg: '密码的长度需在 6 到 16 个字符！' });
			return;
		}

		if (that.data.confirm.length == 0) {
			that.setData({ confirm_err_msg: '请再次输入密码！' });
			return;
		}
		else if (that.data.confirm != that.data.password) {
			that.setData({ confirm_err_msg: '两次输入密码应保持一致！' });
			return;
		}

		wx.request({
			url: 'http://localhost:8181/user/save',
		  	method: 'POST',
		  	data: {
				email: that.data.email,
				name: that.data.username,
				password: that.data.password,
				permission: 1,
				role: 'custom',
				avatar: {
					iconBase64: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
				}
			},
			success(res) {
				if (res.data == 'error') {
					that.setData({ name_err_msg: '此用户名已存在！' });
					return;
				}

				wx.showToast({
					title: '注册成功！',
					icon: 'success',
					duration: 500,
					success() {
						wx.navigateTo({
						  	url: '../index/index',
						});
					}  
				});
			} 
		});
	}
})