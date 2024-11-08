import { useInnerAuthContext } from '@providers/InnerAuthProvider'
import axios from 'axios'

export const useUserService = () => {
    const authContext = useInnerAuthContext()

    const fetchById = async (id) => {
        const response = await axios.get(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
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

    const createUser = async (fullName, accessToken) => {
        const response = await axios.post(`/users`, { fullName: fullName }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data
    }

    return {
        fetchById,
        addUserToken,
        createUser
    }
}