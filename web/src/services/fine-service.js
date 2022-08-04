import { fines } from "../__mocks__/backend"

export const useFineService = () => {
    const fetchById = async (id) => {
        return fines.filter(fine => fine.user == id)
    }

    return {
        fetchById
    }
}