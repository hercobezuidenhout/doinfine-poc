import axios from "axios"
import { fines } from "../__mocks__/backend"

export const useFineService = () => {
    const fetchById = async (id) => {
        const response = await axios.get(`/fines/${id}`)
        return response.data.fines
    }

    return {
        fetchById
    }
}