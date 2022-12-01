import { useOuterAuthContext } from "@providers/OuterAuthProvider"
import axios from "axios"

export const useFineService = () => {
    const authContext = useOuterAuthContext()

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