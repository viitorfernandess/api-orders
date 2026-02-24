const prodcutsData = require("../data/products")

module.exports = {
    //GET /api/products
    index: (req, res) => {
        const products = prodcutsData.getAllProducts()
        res.json(products)
    },

    //GET /api/products/:id
    show: (req, res) => {
        const { id } = req.params
        const product = prodcutsData.getProductById(id)
        if (!product) return res.status(404).json({ message: 'Produto não encontrado!' })
        res.json(product)
    }
}
