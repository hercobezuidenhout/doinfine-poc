import { Router } from 'express'
import { createSpace } from '../commands/create-space.command'
import { extractTokenFromHeader } from '../middleware/auth.middleware'
import { getSpaceById } from '../queries/get-space-by-id.query'
import { getSpaces } from '../queries/get-spaces.query'
import { validateToken } from '../services/auth.service'

const SpacesRouter = Router()

SpacesRouter.get('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    const spaces = await getSpaces(uid)

    res.send(spaces)
})

SpacesRouter.get('/:id', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)
    const { id } = req.params

    try {
        const space = await getSpaceById({
            userId: uid,
            spaceId: id
        })

        if (!space) res.status(404).send('No space found with ID: ' + id)

        res.send(space)
    } catch (error) {
        res.status(403).send(error.message)
    }
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

