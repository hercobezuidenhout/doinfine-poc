import { useAuthContext } from '@providers/AuthProvider'
import axios from 'axios'

export const useUserService = () => {
    const authContext = useAuthContext()

    const fetchById = async (id) => {
        const response = await axios.get(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.data;
    }

    return {
        fetchById
    }
}