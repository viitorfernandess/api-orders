
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
    }
}