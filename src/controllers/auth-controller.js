const usersModel = require('../model/users-model')
const AppError = require('../errors/app-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {
    //POST /register
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const existingUser = usersModel.getUserByEmail(email)
            if (existingUser) throw new AppError('Email já cadastrado', 409)
            const hashedPassword = await bcrypt.hash(password, 10)
            const createdUser = usersModel.createUser(email, hashedPassword)
            return res.status(201).json(createdUser)
        } catch (error) {
            next(error)
        }
    },

    //POST /login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const userEmail = usersModel.getUserByEmail(email)
            if (!userEmail) throw new AppError('Credenciais inválidas', 401)

            const correctPassword = await bcrypt.compare(password, userEmail.password)
            if (!correctPassword) throw new AppError('Credenciais inválidas', 401)
            const token = jwt.sign(
                { email: userEmail.email },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )
            return res.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }
}