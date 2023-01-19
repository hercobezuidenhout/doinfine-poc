import { useInnerAuthContext } from "@providers/InnerAuthProvider"

import axios from "axios"

export const useLeaderboardService = () => {
    const authContext = useInnerAuthContext()

    const fetchUsersLeaderboard = async () => {
        const response = await axios.get(`/leaderboard/users`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'spaceId': 'WaQ6MMJ5CMFaZgTZ5CHu'
            }
        })

        if (!response.data) return []

        return response.data
    }

    const fetchTeamsLeaderboard = async () => {
        const response = await axios.get('/leaderboard/teams', {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'spaceId': 'WaQ6MMJ5CMFaZgTZ5CHu'
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