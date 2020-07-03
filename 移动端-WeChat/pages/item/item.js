const app = getApp();

Page({
	data: {
		id: 0,
		items: [],
    	searchValue:"",
    	active: 2,
	},

	onLoad: function(options){
		var that = this;
		var oid = options.id;
		
		wx.request({
		  	url: 'http://localhost:8181/order/getOne?id=' + oid,
		  	method: 'GET',
		  	success(res){
				that.setData({
					id: oid,
					items: res.data.items
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
	}
})