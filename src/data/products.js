const uuid = require('uuid').v4

const products = [
    { id: '1', productName: 'Teclado', price: '120', stock: '12' }
]

module.exports = {
    getAllProducts: () => products,

    getProductById: (id) => products.find(product => product.id == id),

    createProduct: (productName, price, stock) => {
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
        const productIndex = products.findIndex(product => product.id == id)

        if (productIndex === -1) {
            return null
        }

        delete updatedProduct.id

        products[productIndex] = {
            ...products[productIndex],
            ...updatedProduct
        }

        return products[productIndex]

    },

}

