import { Router } from "express"
import { createTeam } from "../commands/create-team.command"
import { extractTokenFromHeader } from "../middleware/auth.middleware"
import { getTeamById } from "../queries/get-team-by-id.query"
import { validateToken } from "../services/auth.service"

const TeamsRouter = Router()

TeamsRouter.get('/:id', async (req, res) => {
    const { spaceid } = req.headers
    const id = req.params.id
    const team = await getTeamById(spaceid, id)
    res.send(team)
})

TeamsRouter.post('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    const { space } = req.headers

    try {
        const teamId = await createTeam(space, uid, req.body.name)

        res.send({
            id: teamId
        })
    } catch (error) {
        res.status(403).send({ error: error.message })
    }

})

export default TeamsRouter