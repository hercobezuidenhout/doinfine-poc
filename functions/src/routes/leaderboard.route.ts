import { Router } from "express";
import { getUsersLeaderboard } from "../queries/get-users-leaderboard.query";

const LeaderboardRouter = Router()

LeaderboardRouter.get('/users', async (req, res) => {
    const leaderboard = await getUsersLeaderboard()
    res.send(leaderboard)
})

export default LeaderboardRouter