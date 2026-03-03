const express = require('express')
const app = express()

const productsRoutes = require('./routes/products-routes')
const ordersRoutes =  require('./routes/orders-routes')

app.use(express.json())

app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)

module.exports = app