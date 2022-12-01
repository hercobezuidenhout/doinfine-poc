import React, { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { useTeamService } from "@services/team-service"
import { useUserContext } from "./UserProvider"

export const TeamContext = createContext({
    id: 1,
    name: 'Example',
    members: []
})

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState()
    const teamService = useTeamService()
    const { getCurrentUser } = useUserContext()

    const fetchTeam = async () => {
        var user = await getCurrentUser()

        if (!user) return
        var teamId = user.teams[0]

        const team = await teamService.fetchById(teamId)
        if (!team) return

        setTeam(team)
    }

    useEffect(() => {
        fetchTeam()
    }, [getCurrentUser])

    return (
        <TeamContext.Provider value={team}>
            {team && children}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)