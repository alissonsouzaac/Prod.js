'use strict';

const repository = require('../repositories/order-repo');
const guid = require('guid');
const authService = require('../services/auth');

exports.get = async(req, res, next) => {
	try {
		var data = await repository.get();
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Erro'
		});
	}
}

exports.post = async(req, res, next) => {
	try {
		// Recupera o token
		const token = req.body.token || req.query.token || req.headers['x-acess-token'];

		// Decodifica o token
		const data = await authService.decodeToekn(token);


		await repository.create({
			customer: data.id,
			number: guid.raw().substring(0,6);
			items: req.body.items
		});
		res.status(201).send({
			message: 'Pedido cadastrado'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Erro'
		});
	}
};