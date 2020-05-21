'use strict';

const validationContract = require('../validator/validator');
const repository = require('../repositories/customer-repo');
const md5 = require('md5');
const authenticate = require('../services/auth');

const emailService = require('../services/email');

exports.post = async(req, res, next) => {
	let contract = new validationContract();
	contract.hasMinLen(req.body.name,3, 'O nome deve ter pelo menos 3 caracteres');
	contract.isEmail(req.body.email, 'E-mail');
	contract.hasMinLen(req.body.passwqord, 6, 'A senha deve ter pelo menos 6 caracteres');

	//se os dados forem inválidos
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}

	try {
		await repository.create({
			name: req.body.name,
			email: req.ody.email,
			password: md5(req.body.password + global.SALT_KEY)
			roles: ["user"]
		});

	
		emailService.send(req.body.email, 'Bem vindo', global.EMAIL_TMPL.replace('{0}', req.body.name));

		res.status(201).send({
			message: 'Cliente cadastrado'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Deu erro'
		});
	}
};

exports.authenticate = async(req, res, next) => {
	try {
		const customer = await repository.authenticate({
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY),
		});

		if(!customer){
			res.status(404).send({
				message: 'Usuario ou senha invalidos'
			});
			return;
		}

	const token = authService.generateToken({id: customer.id, email: customer.email, name: customer.name});

		res.status(201).send({
			token: token,
			data: {
				email: customer.email,
				name: customer.name
				roles: customer.roles
			}
		});
	} catch (e) {
		res.status(500).send({
			message: 'Deu erro'
		});
	}
};

exports.refreshToken = async(req, res, next) => {
	try {
		// Recupera o token
		const token = req.body.token || req.query.token || req.headers['x-acess-token'];

		// Decodifica o token
		const data = await authService.decodeToekn(token);


		const customer = await repository.getById(data.id);

		if(!customer){
			res.status(401).send({
				message: 'Cliente não encontrado'
			});
			return;
		}

	const tokenData = await authService.generateToken({
		id: customer.id, 
		email: customer.email, 
		name: customer.name,
		roles: customer.roles
	});

		res.status(201).send({
			token: token,
			data: {
				email: customer.email,
				name: customer.name
			}
		});
	} catch (e) {
		res.status(500).send({
			message: 'Erro'
		});
	}
}