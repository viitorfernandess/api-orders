const express = require('express')
const productsController = require('../controllers/products.controller')
const router = express.Router()


router.get("/", productsController.index)
router.get("/:id", productsController.show)


module.exports = router