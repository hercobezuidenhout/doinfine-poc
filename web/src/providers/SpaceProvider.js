import React, { createContext, useContext } from 'react'
import { useUserService } from '@services/user-service'
import { useEffect, useState } from 'react'
import { useUserContext } from './UserProvider'
import { useSpaceService } from '@services/space-service'
import { Outlet, useNavigate } from 'react-router-dom'

export const SpaceContext = createContext({
    activeSpace: {},
    createSpace: (name) => { }
})

export const SpaceProvider = ({ children }) => {
    const userContext = useUserContext()
    const spaceService = useSpaceService()
    const navigate = useNavigate()
    const [spaces, setSpaces] = useState([])
    const [activeSpace, setActiveSpace] = useState()

    const getUserSpaces = async () => {
        const currentUser = await userContext.getCurrentUser()
        if (currentUser.spaces.length > 0) {
            setSpaces(currentUser.spaces)
            setActiveSpace(currentUser.spaces[0])
            navigate(`/${currentUser.spaces[0].id}`)
        } else {
            console.log('user does not have any spaces')
            navigate('/spaces/create')
        }
    }

    const createSpace = async (name) => {
        const space = await spaceService.create(name)
        const currentSpaces = spaces
        currentSpaces.push(space)
        setSpaces(currentSpaces)
        setActiveSpace(space)
        navigate('/')
    }

    useEffect(() => {
        getUserSpaces()
    }, [])

    return (
        <SpaceContext.Provider value={{
            activeSpace: activeSpace,
            createSpace: createSpace
        }}>
            {activeSpace ? <Outlet /> : 'loading spaces...'}

        </SpaceContext.Provider>
    )
}

export const useSpaceContext = () => useContext(SpaceContext)