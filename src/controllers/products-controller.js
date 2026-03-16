const AppError = require("../errors/app-error")
const productsModel = require("../model/products-model")


module.exports = {
    //GET /api/products
    index: (req, res) => {
        const products = productsModel.getAllProducts()
        res.json(products)
    },

    //GET /api/products/:id
    show: (req, res, next) => {
        try {
            const { id } = req.params
            const product = productsModel.getProductById(id)
            res.json(product)
        } catch (error) {
            next(error)
        }
    },

    //POST /api/products
    save: (req, res, next) => {
        try {
            const { productName, price, stock } = req.body
            const newProduct = productsModel.createProduct(productName, price, stock)
            res.status(201).json(newProduct)
        } catch (error) {
            next(error)
        }
    },

    update: (req, res, next) => {
        try {
            const { id } = req.params
            const { productName, price, stock } = req.body
            const fieldsToUpdate = {}

            if (productName !== undefined) fieldsToUpdate.productName = productName
            if (price !== undefined) fieldsToUpdate.price = price
            if (stock !== undefined) fieldsToUpdate.stock = stock
            const updatedProduct = productsModel.updateProduct(id, fieldsToUpdate)
            return res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    },

    delete: (req, res) => {
        const { id } = req.params

        const deletedProduct = productsModel.deleteProduct(id)

        if (!deletedProduct) {
            return res.status(404).json({ message: 'produto não encontrado.' })
        }

        return res.status(200).json(deletedProduct)
    }
}
