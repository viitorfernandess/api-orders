const uuid = require('uuid').v4
const AppError  =require('../errors/app-error')

const products = [
    { id: uuid(), productName: 'Teclado', price: 120, stock: 12 }
]

module.exports = {
    getAllProducts: () => products,

    getProductById: (id) => products.find(product => product.id === id),

    createProduct: (productName, price, stock) => {
        if (!productName || typeof productName !== "string") {
            throw new AppError("Nome do produto inválido.", 400)
        }

        if (typeof price !== "number" || price <= 0) {
            throw new AppError("Preço inválido.", 400)
        }

        if (typeof stock !== "number" || stock < 0) {
            throw new AppError("Estoque inválido.", 400)
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
        if (!id) throw new AppError("ID é obrigatório.", 400)

        const productIndex = products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            throw new AppError("produto não encontrado.", 404)
        }

        delete updatedProduct.id

        if (updatedProduct.productName !== undefined && typeof updatedProduct.productName !== "string") {
            throw new AppError("Nome do produto inválido.", 400)
        }
        if (updatedProduct.price !== undefined && (typeof updatedProduct.price !== "number" || updatedProduct.price <= 0)) {
            throw new AppError("Preço inválido.", 400)
        }
        if (updatedProduct.stock !== undefined && (typeof updatedProduct.stock !== "number" || updatedProduct.stock < 0)) {
            throw new AppError("Estoque inválido.", 400)
        }
        products[productIndex] = {
            ...products[productIndex],
            ...updatedProduct
        }
        return products[productIndex]
    },

    deleteProduct: (id) => {
        if (!id) throw new AppError("Id é obrigatório.", 400)

        const productIndex = products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            throw new AppError("Produto não encontrado.", 404)
        }
        const deletedProduct = products.splice(productIndex, 1)
        return deletedProduct[0]
    }
}

