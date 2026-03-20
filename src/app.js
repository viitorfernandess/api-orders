const express = require('express')
const app = express()

const productsRoutes = require('./routes/products-routes')
const ordersRoutes =  require('./routes/orders-routes')
const errorHandler = require('./errors/ap-erros')
const authRoutes = require('./routes/auth-routes')

app.use(express.json())

app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)
app.use("/auth", authRoutes)

app.use(errorHandler)

module.exports = app