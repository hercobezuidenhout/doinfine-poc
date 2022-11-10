import React, { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { useTeamService } from "@services/team-service"
import { useUserContext } from "./UserProvider"

export const TeamContext = createContext({
    id: undefined,
    name: undefined,
    members: []
})

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState()
    const teamService = useTeamService()
    const userContext = useUserContext()

    const fetchTeam = async () => {
        var user = await userContext.getCurrentUser()

        if (!user) return
        var teamId = user.teams[0]

        const team = await teamService.fetchById(teamId)

        if (!team) return

        setTeam(team)
    }

    useEffect(() => {
        fetchTeam()
    }, [userContext])

    return (
        <TeamContext.Provider value={team}>
            {children}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)