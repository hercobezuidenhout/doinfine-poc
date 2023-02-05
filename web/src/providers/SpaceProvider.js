import React, { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import { useUserContext } from './UserProvider'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTeamService } from '@services/team-service'
import { useSpaceService } from '@services/space-service'

export const SpaceContext = createContext({
    activeSpace: {},
    spaces: [],
    switchSpace: (newSpace) => { },
    createTeam: (name) => { },
    userIsOwner: () => false
})

export const SpaceProvider = ({ children }) => {
    const { userId } = useUserContext()
    const teamService = useTeamService()
    const { fetchAll, fetchById } = useSpaceService()
    const navigate = useNavigate()

    const [activeSpace, setActiveSpace] = useState()
    const [spaces, setSpaces] = useState()

    const saveActiveSpace = async (space) => {
        const userStorage = localStorage.getItem(userId)

        if (userStorage) {
            const storage = JSON.parse(userStorage)
            storage.activeSpace = space
            localStorage.setItem(userId, JSON.stringify(storage))
        } else {
            localStorage.setItem(userId, JSON.stringify({
                activeSpace: space
            }))
        }
    }

    const getUserSpaces = async () => {
        const userSpaces = await fetchAll()
        if (!userSpaces || userSpaces.length == 0) {
            navigate('/create/space')
            return
        }

        setSpaces(userSpaces)

        const userStorage = localStorage.getItem(userId)
        let savedSpace = undefined

        if (userStorage) {
            savedSpace = JSON.parse(userStorage).activeSpace
        }
        const spaceId = savedSpace ? savedSpace : userSpaces[0].id
        const space = await fetchById(spaceId)

        await saveActiveSpace(space.id)

        setActiveSpace(space)
    }

    const createTeam = async (name) => {
        const response = await teamService.create(activeSpace.id, name)
        await getUserSpaces()
        return response
    }

    const switchSpace = async (newSpace) => {
        saveActiveSpace(newSpace.id)
        setActiveSpace(newSpace)
    }

    const checkIfUserIsOwner = () => {
        const value = activeSpace.roles.find(role => role.userId === userId && role.role === 'owner')
        return value !== undefined
    }

    useEffect(() => {
        getUserSpaces()
    }, [])

    return (
        <SpaceContext.Provider value={{
            spaces: spaces,
            switchSpace: switchSpace,
            activeSpace: activeSpace,
            createTeam: createTeam,
            userIsOwner: checkIfUserIsOwner
        }}>
            {activeSpace ? <Outlet /> : 'loading spaces...'}
        </SpaceContext.Provider>
    )
}

export const useSpaceContext = () => useContext(SpaceContext)