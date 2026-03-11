const uuid = require('uuid').v4

const products = [
    { id: uuid(), productName: 'Teclado', price: 120, stock: 12 }
]

module.exports = {
    getAllProducts: () => products,

    getProductById: (id) => products.find(product => product.id === id),

    createProduct: (productName, price, stock) => {
        if (!productName || typeof productName !== "string") {
            throw new Error("Nome do produto inválido.")
        }

        if (typeof price !== "number" || price <= 0) {
            throw new Error("Preço inválido.")
        }

        if (typeof stock !== "number" || stock < 0) {
            throw new Error("Estoque inválido.")
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
        if (!id) throw new Error("ID é obrigatório.")

        const productIndex = products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            throw new Error("produto não encontrado.")
        }

        delete updatedProduct.id

        if (updatedProduct.productName !== undefined && typeof updatedProduct.productName !== "string") {
            throw new Error("Nome do produto inválido.")
        }
        if (updatedProduct.price !== undefined && (typeof updatedProduct.price !== "number" || updatedProduct.price <= 0)) {
            throw new Error("Preço inválido.")
        }
        if (updatedProduct.stock !== undefined && (typeof updatedProduct.stock !== "number" || updatedProduct.stock < 0)) {
            throw new Error("Estoque insuficiente.")
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
        const deletedProduct = products.splice(productIndex, 1)
        return deletedProduct[0]
    }
}

