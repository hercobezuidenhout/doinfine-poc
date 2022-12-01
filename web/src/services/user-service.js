import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import axios from 'axios'

export const useUserService = () => {
    const authContext = useOuterAuthContext()

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