const uuid = require('uuid').v4
const productsModel = require('./products-model')
const AppError = require('../errors/app-error')

const orders = [

]

module.exports = {
    getAllOrders: () => orders,

    getOrderById: (id) => orders.find(order => order.id === id),

    createOrder: (productId, quantity) => {
        if (typeof productId !== 'string' || typeof quantity !== 'number' || quantity <= 0) {
            throw new AppError("Campos inválidos.", 400)
        }

        const product = productsModel.getProductById(productId)
        if (!product) {
            throw new AppError("Produto não encontrado.", 404)
        }

        if (product.stock < quantity) {
            throw new Error("Estoque insuficiente.", 404)
        }

        product.stock -= quantity

        const total = product.price * quantity

        const newOrder = {
            id: uuid(),
            productId,
            quantity,
            total,
            status: 'criado'
        }
        orders.push(newOrder)
        return newOrder
    },

    updateOrder: (id, updatedOrder) => {
        const orderIndex = orders.findIndex(order => order.id === id)

        if (orderIndex === -1) {
            throw new AppError("Pedido não encontrado.", 404)
        }

        const order = orders[orderIndex]

        if (updatedOrder.quantity !== undefined) {
            if (typeof updatedOrder.quantity !== 'number' || updatedOrder.quantity <= 0) {
                throw new AppError("Campos inválidos.", 400)
            }
            // recalcula o total automaticamente
            const product = productsModel.getProductById(orders[orderIndex].productId)
            if (!product)
                throw new AppError("Produto não encontrado.", 404)

            const difference = updatedOrder.quantity - order.quantity

            if (product.stock < difference) {
                throw new AppError("Estoque insuficiente.", 404)
            }

            product.stock -= difference

            updatedOrder.total = product.price * updatedOrder.quantity
        }

        orders[orderIndex] = {
            ...orders[orderIndex],
            ...updatedOrder
        }
        return orders[orderIndex]
    },

    deleteOrder: (id) => {
        if (!id) throw new AppError("ID é obrigatório.", 400)
            
        const orderIndex = orders.findIndex(order => order.id === id)
        if (orderIndex === -1) {
            throw new AppError("Pedido não encontrado.", 404)
        }
        const deletedOrder = orders.splice(orderIndex, 1)
        return deletedOrder[0]
    }
}




