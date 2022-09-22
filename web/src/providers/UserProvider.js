import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from '@providers/AuthProvider'
import { useUserService } from '@services/user-service';

export const UserContext = createContext({
    getCurrentUser: () => { }
})

export const UserProvider = ({ children }) => {
    const authContext = useAuthContext()
    const userService = useUserService()

    const [currentUser, setCurrentUser] = useState()

    const fetchUser = async () => {
        if (!authContext) return

        const user = await userService.fetchById(authContext.getCurrentUserId())
        if (!user) return

        setCurrentUser(user)
    }

    useEffect(() => {
        fetchUser()
    }, [authContext])

    return (
        <UserContext.Provider value={{
            getCurrentUser: fetchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)