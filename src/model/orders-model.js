const uuid = require('uuid').v4
const productsModel = require('./products-model')

const orders = [
    { id: uuid(), productId: 1, quantity: 6, total: 720, status: 'criado' }
]

module.exports = {
    getAllOrders: () => orders,

    getOrderById: (id) => orders.find(order => order.id === id),

    createOrder: (productId, quantity) => {
        if (typeof productId !== 'string' || typeof quantity !== 'number') {
            return null
        }

        const product = productsModel.getProductById(productId)
        if (!product) {
            return null
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




