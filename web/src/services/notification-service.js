import { useInnerAuthContext } from "@providers/InnerAuthProvider"
import axios from "axios"

export const useNotificationService = () => {
    const authContext = useInnerAuthContext()

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

    const subscribe = async (topic, token = '') => {
        const response = await axios.post(`/notifications/subscribe`, { topic: topic }, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.data
    }

    return {
        fetchAll,
        update,
        subscribe
    }
}