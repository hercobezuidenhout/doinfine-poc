import { useAuthContext } from "@providers/AuthProvider"
import axios from "axios"

export const useFineService = () => {
    const authContext = useAuthContext()

    const fetchById = async (id) => {
        const response = await axios.get(`/fines/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        return response.data.fines
    }

    const submitFine = async (fine) => {
        const response = await axios.post(`/fines`, fine, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response
    }

    return {
        fetchById,
        submitFine
    }
}