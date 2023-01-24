import { Router } from "express"
import { createTeam } from "../commands/create-team.command"
import { extractTokenFromHeader } from "../middleware/auth.middleware"
import { getTeamById } from "../queries/get-team-by-id.query"
import { getTeams } from "../queries/get-teams.query"
import { validateToken } from "../services/auth.service"

const TeamsRouter = Router()

TeamsRouter.get('/', async (req, res) => {
    const { space, authorization } = req.headers
    const idToken = extractTokenFromHeader(authorization)
    const { uid } = await validateToken(idToken)

    const teams = await getTeams({ space: space, userId: uid })

    res.send(teams)
})

TeamsRouter.get('/:id', async (req, res) => {
    const { space } = req.headers
    const id = req.params.id
    const team = await getTeamById(space, id)
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