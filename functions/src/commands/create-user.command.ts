import { userRepository } from "../repositories/user.repository"

export const createUser = async (user) => {
    const repository = userRepository()

    try {
        await repository.add(user)
        return user
    } catch (error) {
        console.log(error)
        return
    }
}