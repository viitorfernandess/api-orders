const ordersModel = require('../model/orders-model')
const AppError = require('../errors/app-error')


module.exports = {
    //GET /api/orders
    index: (req, res) => {
        const orders = ordersModel.getAllOrders()
        res.json(orders)
    },

    //GET /api/orders/:id
    show: (req, res, next) => {
        try {
            const { id } = req.params
            const order = ordersModel.getOrderById(id)
            return res.json(order)
        } catch (error) {
            next(error)
        }
    },

    //POST /api/orders
    save: (req, res, next) => {
        try {
            const { productId, quantity } = req.body
            const newOrder = ordersModel.createOrder(productId, quantity)
            return res.status(201).json(newOrder)
        } catch (error) {
            next(error)
        }
    },

    //PUT /api/orders/:id
    update: (req, res, next) => {

        try {
            const { id } = req.params
            const { quantity } = req.body
            const fieldsToUpdate = {}

            if (quantity !== undefined) fieldsToUpdate.quantity = quantity

            const updatedOrder = ordersModel.updateOrder(id, fieldsToUpdate)
            return res.status(200).json(updatedOrder)
        } catch (error) {
            next(error)
        }
    },

    
}

