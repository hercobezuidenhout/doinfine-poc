import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import axios from 'axios'

export const useTeamService = () => {
    const authContext = useOuterAuthContext()

    const fetchById = async (id) => {
        var response = await axios.get(`/teams/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'spaceId': 'WaQ6MMJ5CMFaZgTZ5CHu'
            }
        })

        return response.data
    }

    return {
        fetchById
    }
}