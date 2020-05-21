'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../repositories/customer-repo');
const authService = require('../services/auth');

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate;
router.post('/refresh-token',authService.authorize, controller.refreshToken);

module.exports = router;