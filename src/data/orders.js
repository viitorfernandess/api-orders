const orders = [
    { id: 1, productId: 1, quantity: 6, total: 720, status: 'criado' }
]

module.exports = {
    getAllOrders: () => orders,

    getOrderById: (id) => orders.find(order => order.id === id),
    
}

