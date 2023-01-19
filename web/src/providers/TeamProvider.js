import React, { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { useTeamService } from "@services/team-service"
import { useUserContext } from "./UserProvider"
import { useNotificationService } from "@services/notification-service"
import { useOuterAuthContext } from "./OuterAuthProvider"

export const TeamContext = createContext({
    id: 1,
    name: 'Example',
    members: []
})

export const TeamProvider = ({ children }) => {
    const authContext = useOuterAuthContext()
    const [team, setTeam] = useState()
    const teamService = useTeamService()
    const notificationService = useNotificationService()
    const { getCurrentUser } = useUserContext()

    const fetchTeam = async () => {
        var user = await getCurrentUser()

        if (!user) return

        console.log()

        if (user.teams.length < 1) {
            alert('You are not assigned to any teams. This feature will come in the next release.')
            authContext.signOut()
            return
        }

        var userTeam = user.teams[0]

        const team = await teamService.fetchById(userTeam.id)
        if (!team) return

        await notificationService.subscribe(team.id)

        setTeam(team)
    }

    useEffect(() => {
        fetchTeam()
    }, [getCurrentUser])

    return (
        <TeamContext.Provider value={team}>
            {team ? children : 'loading...'}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)