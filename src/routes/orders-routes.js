const express = require('express')
const ordersController = require('../controllers/orders-controller')
const router = express.Router()

router.get('/', ordersController.index)

module.exports = router