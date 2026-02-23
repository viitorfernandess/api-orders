const uuid = require('uuid').v4

const products = [
    { id: '1', productName: 'Teclado', price: 120, stock: 12 }
]

module.exports = {
    getAllProducts: () => products,

    getProductById: (id) => products.find(product => product.id === id),

    createProduct: (productName, price, stock) => {

        if (!productName || typeof price != "number" || price <= 0) {
            return null
        }

        const newProduct = {
            id: uuid(),
            productName,
            price,
            stock
        }
        products.push(newProduct)
        return newProduct
    },

    updateProduct: (id, updatedProduct) => {
        const productIndex = products.findIndex(product => product.id === id)

        if (productIndex === -1) {
            return null
        }

        delete updatedProduct.id

        if (
            (updatedProduct.price !== undefined && updatedProduct.price <= 0) ||
            (updatedProduct.stock !== undefined && updatedProduct.stock < 0)
        ) {
            return null
        }

        products[productIndex] = {
            ...products[productIndex],
            ...updatedProduct
        }

        return products[productIndex]
    },

    deleteProduct: (id) => {
        const productIndex = products.findIndex(product => product.id === id)

        if (productIndex === -1) {
            return null
        }

        deletedProduct = products.splice(productIndex, 1)

        return deletedProduct[0]
    }
}

