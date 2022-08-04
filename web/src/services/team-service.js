import axios from 'axios'
import { teams } from '../__mocks__/backend'

export const useTeamService = () => {
    const fetchById = async (id) => {
        return await teams.filter(team => team.id == id)[0]
    }

    return {
        fetchById
    }
}