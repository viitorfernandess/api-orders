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
        const { productId, quantity } = req.body

        if (
            typeof productId != 'string' ||
            typeof quantity != 'number'
        ) {
            return res.status(400).json({ message: 'Campos inválidos' })
        }

        const newOrder = ordersModel.createOrder(productId, quantity)

        if (!newOrder) {
            return res.status(400).json({ message: 'Erro ao criar novo pedido' })
        }

        res.status(201).json(newOrder)
    },

    //PUT /api/orders/:id
    update: (req, res) => {
        const { id } = req.params
        const { quantity } = req.body
        const fieldsToUpdate = {}

        if (quantity !== undefined) fieldsToUpdate.quantity = quantity

        const updatedOrder = ordersModel.updateOrder(id, fieldsToUpdate)

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Pedido não encontrado' })
        }
        return res.status(200).json(updatedOrder)
    }
}