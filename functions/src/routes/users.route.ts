import { Router } from "express"
import { getUserById } from "../queries/get-user-by-id.query"

const UsersRouter = Router()

UsersRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await getUserById(id)

    if (!user) res.status(404).send()

    res.status(200).send(user)
})

export default UsersRouter