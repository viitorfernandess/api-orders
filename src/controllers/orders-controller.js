const ordersModel = require('../model/orders-model')

module.exports = {
    //GET /api/orders
    index: (req, res) => {
        const orders = ordersModel.getAllOrders()
        res.json(orders)
    },

    
}