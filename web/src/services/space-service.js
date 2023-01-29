import { useInnerAuthContext } from '@providers/InnerAuthProvider'
import axios from 'axios'

export const useSpaceService = () => {
    const authContext = useInnerAuthContext()

    const fetchAll = async () => {
        var response = await axios.get(`/spaces`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.data
    }

    const fetchById = () => {

    }

    const create = async (name) => {
        var response = await axios.post(`/spaces`, {
            name: name
        }, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`
            }
        })

        return response.data
    }

    return {
        fetchAll,
        create
    }
}