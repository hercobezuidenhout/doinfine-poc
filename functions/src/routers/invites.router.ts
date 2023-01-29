import { Router } from "express"
import { acceptSpaceInvite } from "../commands/accept-space-invite.command"
import { acceptTeamInvite } from "../commands/accept-team-invite.command"
import { getSpaceName } from "../queries/get-space-name.query"
import { getTeamName } from "../queries/get-team-name.query"

const InvitesRouter = Router()

InvitesRouter.get('/space/:id', async (req, res) => {
    const spaceId = req.params.id

    const space = await getSpaceName(spaceId)

    if (!space) res.status(404).send('No space found with that id.')
    res.send(space)
})

InvitesRouter.get('/team/:id', async (req, res) => {
    const { space } = req.headers
    const teamId = req.params.id

    const team = await getTeamName(space, teamId)

    if (!team) res.status(404).send('No team found with that id.')

    res.send(team)
})

InvitesRouter.post('/accept/space', async (req, res) => {
    const spaceInvite = req.body

    const response = await acceptSpaceInvite(spaceInvite)

    if (!response) res.status(404).send()

    res.send(response)
})

InvitesRouter.post('/accept/team', async (req, res) => {
    const { space } = req.headers

    const teamInvite = req.body

    const response = await acceptTeamInvite(space, teamInvite)

    if (!response) res.status(404).send()

    res.send(response)
})

export default InvitesRouter