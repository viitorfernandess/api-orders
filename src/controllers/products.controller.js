const prodcutsData = require("../data/products")

module.exports = {
    //GET /api/products
    index: (req, res) => {
        const products = prodcutsData.getAllProducts()
        res.json(products)
    }
}
