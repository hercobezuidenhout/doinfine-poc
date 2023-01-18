import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import axios from 'axios'

export const useUserService = () => {
    const authContext = useOuterAuthContext()

    const fetchById = async (id) => {
        const response = await axios.get(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'spaceId': '19yCpOvJvJasshIvazcM'
            }
        })

        return response.data;
    }

    const addUserToken = async (token) => {
        const response = await axios.post(`/users/tokens`, { token: token }, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.data;
    }

    return {
        fetchById,
        addUserToken
    }
}