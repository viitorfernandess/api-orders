const express = require('express')
const { v4: uuidv4 } = require('uuid')
const products = require('../data/products')

const router = express.Router()

// Rota POST para criar produto
router.post('/', (req, res) => {
    const { nome, preco, estoque } = req.body

    if (!nome || preco == null || !estoque == null) {
        return res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios' })
    }

    if (estoque < 0) {
        return res.status(400).json({ error: 'Estoque não pode ser negativo' })
    }

    const novoProduto = {
        id: uuidv4(),
        nome,
        preco,
        estoque
    }

    products.push(novoProduto)

    res.status(201).json(novoProduto)
})

module.exports = router