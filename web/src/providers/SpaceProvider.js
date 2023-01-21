import React, { createContext, useContext } from 'react'
import { useUserService } from '@services/user-service'
import { useEffect, useState } from 'react'
import { useUserContext } from './UserProvider'

export const SpaceContext = createContext({
    activeSpace: {}
})

export const SpaceProvider = ({ children }) => {
    const userContext = useUserContext()
    const [spaces, setSpaces] = useState([])
    const [activeSpace, setActiveSpace] = useState()

    const getUserSpaces = async () => {
        const currentUser = await userContext.getCurrentUser()
        if (currentUser.spaces.length > 0) {
            setSpaces(currentUser.spaces)
            setActiveSpace(currentUser.spaces[0])
        } else {
            console.log('user does not have any spaces')
        }
    }

    useEffect(() => {
        getUserSpaces()
    }, [])

    return (
        <SpaceContext.Provider value={{
            activeSpace: activeSpace
        }}>
            {activeSpace ? children : 'loading spaces...'}
        </SpaceContext.Provider>
    )
}

export const useSpaceContext = () => useContext(SpaceContext)