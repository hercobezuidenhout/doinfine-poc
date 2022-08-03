import axios from 'axios'

export const useTeamService = () => {
    const fetchById = async (id) => {
        return await axios.get(`/team/${id}`)
    }

    return {
        fetchById
    }
}