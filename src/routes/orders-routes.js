const express = require('express')
const ordersController = require('../controllers/orders-controller')
const router = express.Router()

router.get('/', ordersController.index)
router.get('/:id', ordersController.show)
router.post('/', ordersController.save)

module.exports = router