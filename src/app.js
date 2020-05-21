const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('.config');
const index = require('/routes/index');
const products = require('./routes/product');
const customers = require('./routes/customer');
const orders = require('./routes/order');


const app = express();
const router = express.Router();

//connectando ao banco
mongoose.connect('config.connectionString');

//MODELS
const Prod = require('./models/prod');
const Costumer = require('./models/costumer');
const Order = require('./models/order');

app.use(bodyParser.json({
	limit: '5mb'
}));
app.use(bodyParser.urlencoded({extended: false}));

//Habilita o CORS
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});

// carregando rotas

app.use('/', index);
app.use('/products', product);
app.use('/customers', customer);
app.use('orders',order);
//app.use('/', put);
//app.use('/', del);

module.exports = app;