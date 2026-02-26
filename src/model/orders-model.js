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
    }
}



