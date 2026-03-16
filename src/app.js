const express = require('express')
const app = express()

const productsRoutes = require('./routes/products-routes')
const ordersRoutes =  require('./routes/orders-routes')
const errorHandler = require('./errors/ap-erros')

app.use(express.json())

app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)

app.use(errorHandler)

module.exports = app