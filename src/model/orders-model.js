const uuid = require('uuid').v4
const productsModel = require('./products-model')

const orders = [

]

module.exports = {
    getAllOrders: () => orders,

    getOrderById: (id) => orders.find(order => order.id === id),

    createOrder: (productId, quantity) => {
        if (typeof productId !== 'string' || typeof quantity !== 'number' || quantity <= 0) {
            throw new Error("Campos inválidos.")
        }

        const product = productsModel.getProductById(productId)
        if (!product) {
            throw new Error("Produto não encontrado.")
        }

        if (product.stock < quantity) {
            throw new Error("Estoque insuficiente.")
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
            return null
        }
        if (updatedOrder.quantity !== undefined) {
            if (typeof updatedOrder.quantity !== 'number' || updatedOrder.quantity <= 0) {
                return null
            }
            // recalcula o total automaticamente
            const product = productsModel.getProductById(orders[orderIndex].productId)
            if (!product) return null
            updatedOrder.total = product.price * updatedOrder.quantity
        }

        orders[orderIndex] = {
            ...orders[orderIndex],
            ...updatedOrder
        }
        return orders[orderIndex]
    },

    deleteOrder: (id) => {
        const orderIndex = orders.findIndex(order => order.id === id)
        if (orderIndex === -1) {
            return null
        }
        const deletedOrder = orders.splice(orderIndex, 1)
        return deletedOrder[0]
    }
}




