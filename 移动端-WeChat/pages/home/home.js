const app = getApp();

Page({
	data: {
		books: [],
    	searchValue:"",
    	active: 0,
	},

	onLoad: function(){
		var that = this;
		wx.request({
		  	url: 'http://localhost:8181/book/getAll',
		  	method: 'GET',
		  	success(res){
				that.setData({
					books: res.data
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
				console.log('cart');
				wx.navigateTo({
				  url: '../cart/cart',
				})
				break;
			case 2:
				wx.navigateTo({
				  url: '../order/order',
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
		  url: '../detail/detail?id=' + event.currentTarget.dataset.id,
		})
	}
})