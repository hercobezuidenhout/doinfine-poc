import { useAuthContext } from "@providers/AuthProvider"
import axios from "axios"

export const useLeaderboardService = () => {
    const authContext = useAuthContext()

    const fetchUsersLeaderboard = async () => {
        const response = await axios.get(`/leaderboard/users`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        if (!response.data) return []
        if (!response.data.items) return []

        return response.data.items
    }

    const fetchTeamsLeaderboard = async () => {
        const response = await axios.get('/leaderboard/teams', {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        if (!response.data) return []
        if (!response.data.items) return []

        return response.data.items
    }

    return {
        fetchUsersLeaderboard,
        fetchTeamsLeaderboard
    }
}