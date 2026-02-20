const express = require('express')
const app = express()

app.use(express.json())

const productsRoutes = require('./routes/products.routes')
app.use('/products', productsRoutes)


module.exports = app