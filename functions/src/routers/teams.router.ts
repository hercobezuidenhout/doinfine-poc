import { Router } from "express"
import { createTeam } from "../commands/create-team.command"
import { removeUserFromTeam } from "../commands/remove-user-from-team.command"
import { updateTeam } from "../commands/update-team.command"
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

TeamsRouter.put('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    const { space } = req.headers

    const { id, data } = req.body
    try {
        await updateTeam({
            space: space,
            id: id,
            userId: uid,
            data: data
        })
        res.status(200).send()
    } catch (error) {
        res.status(403).send({ error: error.message })
    }
})

TeamsRouter.put('/leave', async (req, res) => {
    const { space, authorization } = req.headers
    const idToken = extractTokenFromHeader(authorization)
    const { uid } = await validateToken(idToken)

    await removeUserFromTeam(space, req.body.teamId, uid)

    res.send('Done')
})

TeamsRouter.put('/remove', async (req, res) => {

})

export default TeamsRouter