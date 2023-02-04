import React, { createContext, useContext, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useTeamService } from "@services/team-service"
import { useUserContext } from "./UserProvider"
import { useNotificationService } from "@services/notification-service"
import { useSpaceContext } from "./SpaceProvider"

export const TeamContext = createContext({
    teams: [],
    activeTeam: {},
    switchActiveTeam: (newTeam) => { }
})

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState()
    const [activeTeam, setActiveTeam] = useState()
    const { userId } = useUserContext()
    const { fetchAll, fetchById } = useTeamService()
    const { activeSpace } = useSpaceContext()
    const navigate = useNavigate()
    const notificationService = useNotificationService()

    const saveActiveTeam = async (team) => {
        const userStorage = JSON.parse(localStorage.getItem(userId))
        userStorage.activeTeam = team.id
        localStorage.setItem(userId, JSON.stringify(userStorage))
    }

    const fetchTeam = async () => {
        const teams = await fetchAll()
        if (teams && teams.length < 1) {
            navigate('create/team')
            return
        }

        setTeams(teams)

        const userStorage = JSON.parse(localStorage.getItem(userId))
        const savedTeam = userStorage.activeTeam

        const activeTeam = savedTeam ? { id: savedTeam } : teams[0]

        saveActiveTeam(activeTeam)

        const team = await fetchById(activeTeam.id)
        if (!team) return

        await notificationService.subscribe(team.id)

        console.log(team)

        setActiveTeam(team)
    }

    const handleSwitchActiveTeam = async (newTeam) => {
        console.log(newTeam)
        saveActiveTeam(newTeam)
        const team = await fetchById(newTeam.id)
        setActiveTeam(team)
    }

    useEffect(() => {
        fetchTeam()
    }, [activeSpace])

    return (
        <TeamContext.Provider value={{
            teams: teams,
            activeTeam: activeTeam,
            switchActiveTeam: handleSwitchActiveTeam
        }}>
            {activeTeam ? <Outlet /> : 'loading team ...'}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)