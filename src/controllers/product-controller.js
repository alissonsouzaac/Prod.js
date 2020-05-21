'use strict';

const mongoose = require('mongoose');
const prod = mongoose.model('Prod');
const ValidationContract = require('..validator/validator');
const repository = require('../repositories/prod-repo');

exports.get = async(req, res, next) => {
	try {
		var data = await repository.get();
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha no processo'
		});
	}
}

exports.getBySlug = async(req, res, next) => {
	try {
		var data = await repository.getBySlug(req.params.slug);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: ' Falha no Processo'
		});
	}
}

exports.getById = async(req, res, next) => {
	try {
		var data = await repository.getById(req.params.id);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha no processo'
		})
	}
}

exports.getByTag = async(req, res, next) => {
	try {
		var data = await repository.getByTag(req.params.tag);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: ' Falha no processo'
		})
	}
}

exports.post = async(req, res, next) =>{
	var contract = new ValidationContract();
	contract.hasMinlen(req.body.title,3,'O titulo deve ter 3 letras');
	contract.hasMinLen(req.body.slug,3,'O slug deve ter 3 letras');
	contract.hasMinlen(req.body.description,3,'Descrição tem que ter peo menos 3 letras');

	//se for valido
	if (!contract.IsValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
	try {
		await repository.create(req.body)
		res.status(201).send({ message: 'Produto cadastrado'});
	} catch (e) => {
		res.status(500).send({
			message: 'Falha'
		});
	}
	
};
	

exports.put = async(req, res, next) => {
	try {
		awat repository.update(req.params.id, req.body);
		res.status(201).send({
			message: 'atualizado'
		})
	} catch (e) {
		res.status(500).send({
			message: 'Falha na atualização'
		});
	}
};

exports.delete = async(req, res, next) => {
	try {
		await repository.delete(req.body.id);
		res.status(200).send({message: 'Deletado'})
	} catch (e) {
		res.status(400).send({
			message: "Erro"
		});
	}
};