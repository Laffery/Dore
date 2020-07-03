const app = getApp();

Page({
	data: {
		id: 0,
		show: false,
		book: {},
		num: 1,
		single: 0.0,
		price: 0.0,
		type: 0 // 1: 购物车 2: 下订单
	},

	onLoad: function(options){
		var that = this;
		var bid = options.id;

		wx.request({
		  	url: 'http://localhost:8181/book/getByID?id=' + bid,
		  	method: 'GET',
		  	success(res){
				that.setData({
					id: bid,
					book: res.data,
					single: res.data.price * 100,
					price: res.data.price * 100
				});
		  	}
		});
	},
	onClickCart: function() {
		this.setData({
			show: true,
			type: 1
		})
	},
	onClickBuy: function() {
		this.setData({
			show: true,
			type: 2
		})
	},
	onClose: function() {
		this.setData({
			show: false,
			type: 0
		})
	},
	onChange: function(event) {
		this.setData({
			num: event.detail,
			price: this.data.single * event.detail
		});
	},
	onSubmit: function() {
		if (this.data.type == 0)
			return;

		var that = this;
		if(that.data.type == 1) {	
			wx.request({
				url: 'http://localhost:8181/cart/save',
				method: 'POST',
				data: {
					user: { id: wx.getStorageSync('id')},
					book: that.data.book,
					count: that.data.num,
					price: that.data.price/100
				},
				success() {
					wx.showToast({
						title: '《' + that.data.book.title+'》加入购物车成功！',
						icon: 'success',
						duration: 500,
						success: function(){
							wx.navigateTo({
							  url: '../home/home',
							})
						}
					})
				}
			});
		}

		else {
			wx.request({
			  	url: 'http://localhost:8181/order/save',
				method: 'POST',
				data: {
					user: { id: wx.getStorageSync('id') },
					items: [{
						book: that.data.book,
						count: that.data.num,
						price: that.data.price/100
					}]
				},
				success(res) {
					wx.showToast({
						title: '购买'+that.data.num+'本《'+that.data.book.title+'》成功！',
						icon: 'success',
						duration: 500,
						success: function() {
							wx.navigateTo({
							  	url: '../order/order',
							});
						}  
					})
				}
			})
		}
	}
})