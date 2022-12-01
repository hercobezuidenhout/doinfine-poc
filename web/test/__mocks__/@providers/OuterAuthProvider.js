import React, { createContext, useContext, useEffect, useState } from 'react'
import { users } from '../../../src/__mocks__/backend'

export const OuterAuthContext = createContext({
    userId: undefined,
    getCurrentUser: () => { },
    getAccessToken: () => { }
})


export const OuterAuthProvider = ({ children }) => {

    const [account, setAccount] = useState()

    const loadAuth = () => setAccount({ name: 'Nice' })

    const getAccessToken = async () => 'dummy-token'

    useEffect(() => {
        loadAuth()
    }, [])

    const getCurrentUser = () => users.find(user => user.id == 1)

    return (
        <OuterAuthContext.Provider value={{
            userId: 1,
            getCurrentUser: getCurrentUser,
            getAccessToken: getAccessToken
        }}>
            {account && children}

        </OuterAuthContext.Provider>
    )
}

export const useOuterAuthContext = () => useContext(OuterAuthContext)