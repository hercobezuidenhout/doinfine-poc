import React, { createContext, useContext, useEffect, useState } from 'react'
import { users } from '../../../src/__mocks__/backend'

export const AuthContext = createContext({
    userId: undefined,
    getCurrentUser: () => { },
    getAccessToken: () => { }
})


export const AuthProvider = ({ children }) => {

    const [account, setAccount] = useState()

    const loadAuth = () => setAccount({ name: 'Nice' })

    const getAccessToken = async () => 'dummy-token'

    useEffect(() => {
        loadAuth()
    }, [])

    const getCurrentUser = () => users.find(user => user.id == 1)

    return (
        <AuthContext.Provider value={{
            userId: 1,
            getCurrentUser: getCurrentUser,
            getAccessToken: getAccessToken
        }}>
            {account && children}

        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)