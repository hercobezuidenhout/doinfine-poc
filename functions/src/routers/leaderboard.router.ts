import { Router } from "express";
import { getTeamsLeaderboard } from "../queries/get-teams-leaderboard.query";
import { getUsersLeaderboard } from "../queries/get-users-leaderboard.query";

const LeaderboardRouter = Router()

LeaderboardRouter.get('/users', async (req, res) => {
    const { spaceid } = req.headers
    const leaderboard = await getUsersLeaderboard(spaceid)
    res.send(leaderboard)
})

LeaderboardRouter.get('/teams', async (req, res) => {
    const { spaceid } = req.headers
    const leaderboard = await getTeamsLeaderboard(spaceid)
    res.send(leaderboard)
})

export default LeaderboardRouter