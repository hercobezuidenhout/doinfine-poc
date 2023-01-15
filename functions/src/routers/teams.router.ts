import { Router } from "express"
import { getTeamById } from "../queries/get-team-by-id.query"

const TeamsRouter = Router()

TeamsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const team = await getTeamById(id)
    res.send(team)
})

export default TeamsRouter