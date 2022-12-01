import { useOuterAuthContext } from "@providers/OuterAuthProvider"
import axios from "axios"

export const useNotificationService = () => {
    const authContext = useOuterAuthContext()

    const fetchAll = async (id) => {
        const response = await axios.get(`/notifications`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        return response.data.notifications
    }

    const update = async (id) => {
        const response = await axios.put(`/notifications`, { notificationId: id }, {
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