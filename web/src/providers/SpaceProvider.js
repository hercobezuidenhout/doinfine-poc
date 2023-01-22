import React, { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import { useUserContext } from './UserProvider'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTeamService } from '@services/team-service'

export const SpaceContext = createContext({
    activeSpace: {},
    createTeam: (name) => { },
})

export const SpaceProvider = ({ children }) => {
    const userContext = useUserContext()
    const teamService = useTeamService()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [activeSpace, setActiveSpace] = useState()

    const getUserSpaces = async () => {
        const currentUser = await userContext.getCurrentUser()

        if (!currentUser.spaces || currentUser.spaces.length == 0) {
            navigate('/create/space')
            return
        }

        const space = currentUser.spaces[0]
        setActiveSpace(space)

        console.log(space.teams)

        if (!space.teams || space.teams.length == 0) navigate('create/team')
        // if (pathname == '/create/team') navigate('create/team')
    }

    const createTeam = async (name) => {
        const response = await teamService.create(activeSpace.id, name)
        await getUserSpaces()
        return response
    }

    useEffect(() => {
        getUserSpaces()
    }, [])

    return (
        <SpaceContext.Provider value={{
            activeSpace: activeSpace,
            createTeam: createTeam
        }}>
            {activeSpace ? <Outlet /> : 'loading spaces...'}
        </SpaceContext.Provider>
    )
}

export const useSpaceContext = () => useContext(SpaceContext)