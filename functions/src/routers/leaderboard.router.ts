import { Router } from "express";
import { getTeamsLeaderboard } from "../queries/get-teams-leaderboard.query";
import { getUsersLeaderboard } from "../queries/get-users-leaderboard.query";

const LeaderboardRouter = Router()

LeaderboardRouter.get('/users', async (req, res) => {
    const leaderboard = await getUsersLeaderboard()
    res.send(leaderboard)
})

LeaderboardRouter.get('/teams', async (req, res) => {
    const leaderboard = await getTeamsLeaderboard()
    res.send(leaderboard)
})

export default LeaderboardRouter