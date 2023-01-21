import React, { createContext, useContext } from 'react'
import { useUserService } from '@services/user-service'
import { useEffect, useState } from 'react'
import { useUserContext } from './UserProvider'
import { useSpaceService } from '@services/space-service'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTeamService } from '@services/team-service'

export const SpaceContext = createContext({
    activeSpace: {},
    createTeam: (name) => { }
})

export const SpaceProvider = ({ children }) => {
    const userContext = useUserContext()
    const spaceService = useSpaceService()
    const teamService = useTeamService()
    const navigate = useNavigate()
    const [spaces, setSpaces] = useState([])
    const [activeSpace, setActiveSpace] = useState()

    const getUserSpaces = async () => {
        const currentUser = await userContext.getCurrentUser()

        if (currentUser.spaces.length > 0) {
            setSpaces(currentUser.spaces)
            setActiveSpace(currentUser.spaces[0])
        } else {
            console.log('user does not have any spaces')
            navigate('/create/space')
        }
    }



    const createTeam = async (name) => {
        const response = await teamService.create(activeSpace.id, name)
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