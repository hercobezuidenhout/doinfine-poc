import { useAuthContext } from "@providers/AuthProvider"
import axios from "axios"
import { fines } from "../__mocks__/backend"

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

    return {
        fetchById
    }
}