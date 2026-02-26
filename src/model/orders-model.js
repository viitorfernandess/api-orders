const uuid = require('uuid').v4

const orders = [
    { id: uuid(), productId: 1, quantity: 6, total: 720, status: 'criado' }
]

module.exports = {
    getAllOrders: () => orders,

    getOrderById: (id) => orders.find(order => order.id === id),

    createOrder: (productId, quantity, total) => {
        if (typeof productId !== 'number' || typeof quantity !== 'number' || total < 0) {
            return null
        }

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
        }

        if (updatedOrder.total !== undefined) {
            if (typeof updatedOrder.total !== 'number' || updatedOrder.total <= 0) {
                return null
            }
        }

        orders[orderIndex] = {
            ...orders[orderIndex],
            ...updatedOrder
        }

        return orders[orderIndex]
    },

    deleteOrder: (id) => {
        const orderIndex = orders.find(order => order.id === id)
        if (orderIndex === -1) {
            return null
        }
        const deletedOrder = orders.splice(orderIndex, 1)
        return deletedOrder[0]
    }
}




