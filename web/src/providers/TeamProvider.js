import React, { createContext, useContext, useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useTeamService } from "@services/team-service"
import { useUserContext } from "./UserProvider"
import { useNotificationService } from "@services/notification-service"
import { useOuterAuthContext } from "./OuterAuthProvider"
import { useSpaceContext } from "./SpaceProvider"

export const TeamContext = createContext({
    id: 1,
    name: 'Example',
    members: []
})

export const TeamProvider = ({ children }) => {
    const [activeTeam, setActiveTeam] = useState()
    const teamService = useTeamService()
    const navigate = useNavigate()
    const notificationService = useNotificationService()
    const { activeSpace } = useSpaceContext()

    const fetchTeam = async () => {
        if (!activeSpace) return
        if (activeSpace.teams && activeSpace.teams.length < 1) {
            navigate('create/team')
            return
        }

        const activeTeam = activeSpace.teams[0]

        const team = await teamService.fetchById(activeTeam.id)
        if (!team) return

        await notificationService.subscribe(team.id)

        console.log(team)
        setActiveTeam(team)
    }

    useEffect(() => {
        fetchTeam()
    }, [activeSpace])

    return (
        <TeamContext.Provider value={activeTeam}>
            {activeTeam ? <Outlet /> : 'loading team ...'}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)