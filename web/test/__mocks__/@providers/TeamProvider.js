import React, { createContext, useContext } from 'react'
import { teams } from '../../../src/__mocks__/backend'

export const TeamContext = createContext({
    id: undefined,
    name: undefined,
    members: []
})

export const TeamProvider = ({ children }) => {

    return (
        <TeamContext.Provider value={teams[0]}>
            {children}
        </TeamContext.Provider>
    )
}

export const useTeamContext = () => useContext(TeamContext)