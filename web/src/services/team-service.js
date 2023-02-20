import { useInnerAuthContext } from '@providers/InnerAuthProvider'
import { useSpaceContext } from '@providers/SpaceProvider'
import axios from 'axios'

export const useTeamService = () => {
    const authContext = useInnerAuthContext()
    const { activeSpace } = useSpaceContext()

    const fetchAll = async () => {
        var response = await axios.get(`/teams`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        })

        return response.data
    }

    const fetchById = async (id) => {
        var response = await axios.get(`/teams/${id}`, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        })

        return response.data
    }

    const create = async (space, name) => {
        var response = await axios.post(`/teams`, {
            name: name
        }, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': space
            }
        })

        return response.data
    }

    const update = async (updatedTeam) => {
        const data = {
            id: updatedTeam.id,
            data: {
                name: updatedTeam.name,
                members: updatedTeam.members,
                roles: updatedTeam.roles
            }
        }

        const headers = {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        }

        var response = await axios.put(`/teams`, data, headers)

        return response.data
    }

    const leave = async (teamId) => {
        var response = await axios.put(`/teams/leave`, {
            teamId: teamId
        }, {
            headers: {
                'Authorization': `Bearer ${await authContext.getAccessToken()}`,
                'space': activeSpace.id
            }
        })

        return response.data
    }

    return {
        fetchAll,
        fetchById,
        create,
        update,
        leave
    }
}