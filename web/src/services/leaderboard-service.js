import { useOuterAuthContext } from "@providers/OuterAuthProvider"
import axios from "axios"

export const useLeaderboardService = () => {
    const authContext = useOuterAuthContext()

    const fetchUsersLeaderboard = async () => {
        const response = await axios.get(`/leaderboard/users`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        if (!response.data) return []

        return response.data
    }

    const fetchTeamsLeaderboard = async () => {
        const response = await axios.get('/leaderboard/teams', {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        if (!response.data) return []

        return response.data
    }

    return {
        fetchUsersLeaderboard,
        fetchTeamsLeaderboard
    }
}