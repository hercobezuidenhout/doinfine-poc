import { userRepository } from "../repositories/user.repository"

export const createUser = async (user) => {
    const repository = userRepository()
    const userInDatabase = await repository.fetchById(user.userId)
    if (userInDatabase) return

    try {
        await repository.add(user)
        return user
    } catch (error) {
        console.log(error)
        return
    }
}