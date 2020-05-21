'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	number: {
		type: String,
		required: true
	},
	createDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	status: {
		type: String,
		required: true,
		enum: ['created', 'done'],
		default: 'created'
	}
	costumer : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer'
	},
	items: [{
		quantity: {
			type: Number,
			required: true,
			default: 1
		},
		price: {
			type: Number,
			required: truw
		},
		prod: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Customer'
		}
	
	}],
});	


module.exports = mongoose.model('Order', schema);