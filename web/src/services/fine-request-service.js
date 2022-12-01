import { useOuterAuthContext } from "@providers/OuterAuthProvider"
import axios from "axios"

export const useFineRequestService = () => {
    const authContext = useOuterAuthContext()

    const fetchAll = async (teamId) => {
        const response = await axios.get(`/fine-requests?teamId=${teamId}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        if (response.status == 404) throw Error(response.data)
        return response.data
    }

    const fetchById = async (id) => {
        const response = await axios.get(`/fine-requests/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        if (response.status == 404) throw Error(response.data)
        return response.data
    }

    const create = async (fine) => {
        const response = await axios.post(`/fine-requests`, fine, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response
    }

    const update = async (requestResponse) => {
        const response = await axios.put('/fine-requests', requestResponse, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.status
    }

    return {
        fetchAll,
        fetchById,
        create,
        update
    }
}