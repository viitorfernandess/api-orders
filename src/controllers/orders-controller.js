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

    //POST /api/orders
    save: (req, res) => {
        const { productId, quantity, total } = req.body

        if (
            typeof productId != 'string' ||
            typeof quantity != 'number' ||
            typeof total != 'number'
        ) {
            return res.status(400).json({ message: 'Campos inválidos' })
        }

        const newOrder = ordersModel.createOrder(productId, quantity, total)

        if (!newOrder) {
            return res.status(400).json({ message: 'Erro ao criar novo pedido' })
        }

        res.status(201).json(newOrder)
    }
}