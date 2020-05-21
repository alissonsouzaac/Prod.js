'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	slug: {
		type: String,
		required: [true, 'É obrigatorio'],
		trim: true,
		index: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: true
	},
	tags: [{
		type: String,
		required: truw
	}],
	image: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = mongoose.model('Prod', schema);