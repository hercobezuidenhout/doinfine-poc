import { useInnerAuthContext } from '@providers/InnerAuthProvider'
import { useSpaceContext } from '@providers/SpaceProvider'
import axios from 'axios'

export const useTeamService = () => {
    const authContext = useInnerAuthContext()
    const { activeSpace } = useSpaceContext()

    const fetchById = async (id) => {
        var response = await axios.get(`/teams/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'spaceId': activeSpace.id
            }
        })

        return response.data
    }

    return {
        fetchById
    }
}