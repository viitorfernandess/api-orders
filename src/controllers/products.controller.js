const productsData = require("../data/products")

module.exports = {
    //GET /api/products
    index: (req, res) => {
        const products = productsData.getAllProducts()
        res.json(products)
    },

    //GET /api/products/:id
    show: (req, res) => {
        const { id } = req.params
        const product = productsData.getProductById(id)
        if (!product) return res.status(404).json({ message: 'Produto não encontrado!' })
        res.json(product)
    },

    //POST /api/products
    save: (req, res) => {
        const { productName, price, stock } = req.body
        if (typeof productName !== 'string' ||
            typeof price !== 'number' ||
            typeof stock !== 'number') {
            return res.status(400).json({ message: 'Campos inválidos.' })
        }
        const newProduct = productsData.createProduct(productName, price, stock)
        res.status(201).json(newProduct)
    }
}
