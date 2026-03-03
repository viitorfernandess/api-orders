const ordersModel = require('../model/orders-model')

module.exports = {
    //GET /api/orders
    index: (req, res) => {
        const orders = ordersModel.getAllOrders()
        res.json(orders)
    },

    //GET /api/orders/:id
    show: (req, res) => {
        const { id } = req.params
        const order = ordersModel.getOrderById(id)
        if (!order) return res.status(404).json({ message: 'Pedido não encontrado' })
        res.json(order)
    },
}