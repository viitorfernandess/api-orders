const express = require('express')
const productsController = require('../controllers/products.controller')
const router = express.Router()


router.get("/", productsController.index)
router.get("/:id", productsController.show)
router.post("/", productsController.save)
router.put("/:id", productsController.update)


module.exports = router