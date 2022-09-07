import { useAuthContext } from "@providers/AuthProvider"
import axios from "axios"

export const useNotificationService = () => {
    const authContext = useAuthContext()

    const fetchAll = async (id) => {
        const response = await axios.get(`/notifications`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        return response.data.notifications
    }

    const update = async (id) => {
        const response = await axios.put(`/notifications`, { id: id }, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        return response.data
    }

    return {
        fetchAll,
        update
    }
}