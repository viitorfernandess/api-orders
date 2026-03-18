const uuid = require('uuid').v4
const AppError = require('../errors/app-error')

const users = []

module.exports = {
    getAllUsers: () => users,

    getUserById: (id) => {
        const user = users.find(user => user.id === id)
        if (!user) {
            throw new AppError('Usuário não encontrado', 404)
        }
        return user
    },

    getUserByEmail: (email) => {
        return users.find(user => user.email === email)
    },

    createUser: (email, hashedPassword) => {
        if (!email || !hashedPassword) {
            throw new AppError('Email e senha são obrigatórios', 400)
        }
        const newUser = {
            id: uuid(),
            email,
            password: hashedPassword
        }
        users.push(newUser)
        return newUser
    },

    updateUser: (id, email, hashedPassword) => {
        const user = users.find(user => user.id === id)
        if (!user) {
            throw new AppError('Usuário não encontrado', 404)
        }
        if (email) user.email = email
        if (hashedPassword) user.password = hashedPassword
        return user
    }
}