import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserService } from '@services/user-service';
import { useInnerAuthContext } from './InnerAuthProvider';

export const UserContext = createContext({
    getCurrentUser: () => { }
})

export const UserProvider = ({ children }) => {
    const authContext = useInnerAuthContext()
    const userService = useUserService()

    const [currentUser, setCurrentUser] = useState()

    const fetchUser = async () => {
        if (!authContext) return
        const authUser = authContext.getCurrentUser()
        const user = await userService.fetchById(authUser.uid)
        if (!user) return

        setCurrentUser({ ...user, email: authUser.email })
    }

    useEffect(() => {
        fetchUser()
    }, [authContext])

    return (
        <UserContext.Provider value={{
            getCurrentUser: () => currentUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)