import { Router } from 'express'
import { createSpace } from '../commands/create-space.command'
import { extractTokenFromHeader } from '../middleware/auth.middleware'
import { getSpaces } from '../queries/get-spaces.query'
import { validateToken } from '../services/auth.service'

const SpacesRouter = Router()

SpacesRouter.get('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    const spaces = await getSpaces(uid)

    res.send(spaces)
})

SpacesRouter.post('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    if (!uid) res.status(401).send()

    const spaceId = await createSpace({
        name: req.body.name,
        members: [uid],
        roles: [
            {
                userId: uid,
                role: 'owner'
            }
        ]
    })

    res.send({
        id: spaceId
    })
})

export default SpacesRouter

