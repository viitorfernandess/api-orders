const express = require('express')
const ordersController = require('../controllers/orders-controller')
const router = express.Router()

router.get('/', ordersController.index)
router.get('/:id', ordersController.show)

module.exports = router