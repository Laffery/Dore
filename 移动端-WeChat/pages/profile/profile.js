const app = getApp();

Page({
	data: {
		name: '',
		url: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg',
    	active: 3,
	},

	onLoad: function(){
		var that = this;
		wx.request({
		  	url: 'http://localhost:8181/user/getAvatar?name=' + wx.getStorageSync('name'),
		  	method: 'GET',
		  	success(res){
				that.setData({
					name: wx.getStorageSync('name'),
					url: res.data
				});
		  	}
		});
	},
	onChange: function(event){
		var act = event.detail;
		this.setData({
			active: act
		});
		switch(act) {
			case 0: 
				wx.navigateTo({
					url: '../home/home',
				})
				break;
			case 1:
				wx.navigateTo({
				  url: '../cart/cart',
				})
				break;
			case 2: 
				wx.navigateTo({
				  url: '../order/order',
				})
				break;
			default: break;
		}
	},
	signout: function() {
		wx.navigateTo({
		  url: '../index/index',
		});
	},
	img_err: function(e) {
		console.log('image发生error事件，携带值为', e.detail.errMsg);
	}
})