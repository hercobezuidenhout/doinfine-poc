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
        let teamId = localStorage.getItem('activeTeam');

        if (!teamId) {
            var user = await userContext.getCurrentUser()
            console.log(user)
            if (!user) return
            teamId = user.teams[0]
            localStorage.setItem('activeTeam', teamId)
        }

        const team = await teamService.fetchById(teamId)
        console.log(team)
        if (!team) return

        setTeam(team)
    }

    useEffect(() => {
        fetchTeam()
    }, [])

    return (
        <TeamContext.Provider value={team}>
            {children}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)