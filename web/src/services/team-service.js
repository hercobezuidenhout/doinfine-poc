import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import axios from 'axios'

export const useTeamService = () => {
    const authContext = useOuterAuthContext()

    const fetchById = async (id) => {
        var response = await axios.get(`/teams/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'spaceId': '19yCpOvJvJasshIvazcM'
            }
        })

        return response.data
    }

    return {
        fetchById
    }
}