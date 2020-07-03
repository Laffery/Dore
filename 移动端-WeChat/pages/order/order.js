const app = getApp();

Page({
	data: {
		orders: [],
    	searchValue:"",
    	active: 2,
	},

	onLoad: function(){
		var that = this;
		var id = wx.getStorageSync('id');
		wx.request({
		  	url: 'http://localhost:8181/order/getByID?id=' + id,
		  	method: 'GET',
		  	success(res){
				that.setData({
					orders: res.data
				});
		  	}
		});
	},
	onChange: function(event){
		this.setData({
			active: event.detail
		});
		switch(event.detail) {
			case 0: 
				wx.navigateTo({
					url: '../home/home',
				});
				break;
			case 1:
				wx.navigateTo({
				  url: '../cart/cart',
				});
				break;
			case 3:
				wx.navigateTo({
					url: '../profile/profile',
				});
				break;
			default: break;
		}
	},
	onTapCard: function(event){
		wx.navigateTo({
		  url: '../item/item?id=' + event.currentTarget.dataset.id,
		})
	}
})