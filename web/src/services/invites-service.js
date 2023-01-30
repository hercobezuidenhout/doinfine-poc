import axios from "axios"

export const useInviteService = () => {
    const fetchSpaceName = async (id, accessToken) => {
        var response = await axios.get(`/invites/space/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data
    }

    const fetchTeamName = async (space, id, accessToken) => {
        var response = await axios.get(`/invites/team/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'space': space
            }
        })

        return response.data
    }

    const acceptSpaceInvite = async (space, userId, accessToken) => {
        const spaceInvite = {
            id: space,
            userId: userId
        }

        var response = await axios.post('/invites/accept/space', spaceInvite, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data
    }

    const acceptTeamInvite = async (space, team, userId, accessToken) => {
        const teamInvite = {
            id: team,
            userId: userId
        }

        var response = await axios.post('/invites/accept/team', teamInvite, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'space': space
            }
        })

        return response.data
    }

    return {
        fetchSpaceName,
        fetchTeamName,
        acceptSpaceInvite,
        acceptTeamInvite
    }
}