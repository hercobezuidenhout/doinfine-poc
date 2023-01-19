import { Router } from "express"
import { addUserToken } from "../commands/add-user-token.command"
import { createUser } from "../commands/create-user.command"
import { extractTokenFromHeader } from "../middleware/auth.middleware"
import { getUserById } from "../queries/get-user-by-id.query"
import { validateToken } from "../services/auth.service"

const UsersRouter = Router()

UsersRouter.get('/:id', async (req, res) => {
    const { spaceid } = req.headers
    const id = req.params.id
    const user = await getUserById(spaceid, id)

    if (!user) res.status(404).send()

    res.status(200).send(user)
})

UsersRouter.post('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    const user = {
        id: uid,
        fullName: req.body.fullName
    }

    const result = await createUser(user)

    // if (!result) res.status(400).send('Something went wrong. User might already exist.')

    res.send(result)
})

UsersRouter.post('/tokens', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    await addUserToken({ userId: uid, token: req.body.token })
        .catch(error => {
            console.log(error)
            res.status(400).send()
        })

    res.status(200).send()
})

export default UsersRouter