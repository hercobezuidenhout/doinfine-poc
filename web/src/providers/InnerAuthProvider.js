import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOuterAuthContext } from './OuterAuthProvider'

export const InnerAuthContext = createContext({
    getCurrentUser: () => { },
    getAccessToken: () => { },
})

export const InnerAuthProvider = ({ children }) => {
    const { currentUser } = useOuterAuthContext()
    const [userLoggedIn, setUserLoggedIn] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        console.log('currentUser:', currentUser)
        if (currentUser === null) navigate('/login')
        setUserLoggedIn(currentUser)
    }, [currentUser])

    return userLoggedIn === undefined ? 'loading auth state...' : (
        <InnerAuthContext.Provider value={{
            getCurrentUser: () => userLoggedIn,
            getAccessToken: () => userLoggedIn.accessToken
        }}>
            {children}
        </InnerAuthContext.Provider>
    )
}

export const useInnerAuthContext = () => useContext(InnerAuthContext)