import axios from "axios"
import { useInnerAuthContext } from "@providers/InnerAuthProvider"
import { useSpaceContext } from "@providers/SpaceProvider"

export const usePaymentRequestService = () => {
    const authContext = useInnerAuthContext()
    const { activeSpace } = useSpaceContext()

    const fetchAll = async () => {
        const response = await axios.get(`/payment-requests?filter=active`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        })
        if (response.status == 404) throw Error(response.data)
        return response.data
    }

    const fetchById = async (id) => {
        const response = await axios.get(`/payment-requests/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        })
        if (response.status == 404) throw Error(response.data)
        return response.data
    }

    const submitPaymentRequest = async (paymentRequest) => {
        const response = await axios.post(`/payment-requests`, paymentRequest, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        })

        return response
    }

    const update = async (requestResponse) => {
        const response = await axios.put('/payment-requests', requestResponse, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
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