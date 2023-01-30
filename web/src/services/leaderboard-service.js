import { useInnerAuthContext } from "@providers/InnerAuthProvider"
import { useSpaceContext } from "@providers/SpaceProvider"

import axios from "axios"

export const useLeaderboardService = () => {
    const authContext = useInnerAuthContext()
    const { activeSpace } = useSpaceContext()

    const fetchUsersLeaderboard = async () => {
        const response = await axios.get(`/leaderboard/users`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        })

        if (!response.data) return []

        return response.data
    }

    const fetchTeamsLeaderboard = async () => {
        const response = await axios.get('/leaderboard/teams', {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
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