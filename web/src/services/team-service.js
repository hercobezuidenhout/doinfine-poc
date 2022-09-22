import { useAuthContext } from '@providers/AuthProvider'
import axios from 'axios'

export const useTeamService = () => {
    const authContext = useAuthContext()

    const fetchById = async (id) => {
        var response = await axios.get(`/teams/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.data
    }

    return {
        fetchById
    }
}