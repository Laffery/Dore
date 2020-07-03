const app = getApp();

Page({
	data: {
		carts: [],
    	searchValue:"",
    	active: 1,
	},

	onLoad: function(){
		var that = this;
		var id = wx.getStorageSync('id');
		console.log(id);
		wx.request({
		  	url: 'http://localhost:8181/cart/getByUid?uid=' + id,
		  	method: 'GET',
		  	success(res){
				that.setData({
					carts: res.data
				});
				console.log(res.data);
		  	}
		});
	},
	onChange: function(event){
		var old = this.active;
		var act = event.detail;
		this.setData({
			active: act
		});
		if(old != act) {
			switch(act) {
				case 0: 
					console.log('books');
					wx.navigateTo({
						url: '../home/home',
					})
					break;
				case 1:
					console.log('cart');
					wx.navigateTo({
					  url: '../cart/cart',
					})
					break;
				case 2: 
					console.log('order');
					wx.navigateTo({
					  url: '../order/order',
					})
					break;
				case 3:
					console.log('profile');
					wx.navigateTo({
						url: '../profile/profile',
					});
					break;
				default: break;
			}
		}
	},
	onTapCard: function(event){
		wx.navigateTo({
		  url: '../detail/detail?id=' + event.currentTarget.dataset.id,
		})
	}
})