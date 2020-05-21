'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) => {
	var res = await Order.find({});
	return res;
}

exports.create = async(data) => {
	var oder = new Order(data);
	await order.save();
}