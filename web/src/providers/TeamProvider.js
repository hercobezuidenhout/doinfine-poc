import React, { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { useTeamService } from "@services/team-service"

export const TeamContext = createContext({
    id: undefined,
    name: undefined,
    members: []
})

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState()
    const { id } = useParams()
    const location = useLocation()

    const teamService = useTeamService()

    const fetchTeam = async () => {
        if (!location.pathname.includes('/team')) return
        const team = await teamService.fetchById(id)
        
        if (!team) return

        setTeam(team)
    }

    useEffect(() => {
        fetchTeam()
    }, [id])

    return (
        <TeamContext.Provider value={team}>
            {children}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)