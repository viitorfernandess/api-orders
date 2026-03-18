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
        users.find(user => user.email === email)
    },

    createUser: (email, hashedPassword) => {
        const newUser = {
            id: uuid(),
            email,
            password: hashedPassword
        }
        users.push(newUser)
        return newUser
    },

    
}