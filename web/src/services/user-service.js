import axios from 'axios'

export const useUserService = () => {
    const authContext = useAuthContext()

    const fetchByUsername = async (username) => {
        const response = await axios.get(`/users/${username}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.data
    }

    return {
        fetchByUsername
    }
}