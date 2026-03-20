const usersModel = require('../model/users-model')
const AppError = require('../errors/app-error')
const bcrypt = require('bcrypt')


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
    }
}