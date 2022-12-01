import axios from "axios"
import { useOuterAuthContext } from "@providers/OuterAuthProvider"

export const usePaymentRequestService = () => {
    const authContext = useOuterAuthContext()

    const fetchAll = async () => {
        const response = await axios.get(`/payment-requests`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        if (response.status == 404) throw Error(response.data)
        return response.data
    }

    const fetchById = async (id) => {
        const response = await axios.get(`/payment-requests/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })
        if (response.status == 404) throw Error(response.data)
        return response.data
    }

    const submitPaymentRequest = async (paymentRequest) => {
        const response = await axios.post(`/payment-requests`, paymentRequest, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response
    }

    const update = async (requestResponse) => {
        const response = await axios.put('/payment-requests', requestResponse, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.status
    }

    return {
        fetchAll,
        fetchById,
        submitPaymentRequest,
        update
    }
}