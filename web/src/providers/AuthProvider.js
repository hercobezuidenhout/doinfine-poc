import React, { createContext, useContext } from "react";
import { users } from "../__mocks__/backend";

export const AuthContext = createContext({
    userId: undefined,
    getCurrentUser: () => {}
})

export const AuthProvider = ({ children }) => {
    const getCurrentUser = () => users.find(user => user.id == 1)
    return (
        <AuthContext.Provider value={{
            userId: 1,
            getCurrentUser: getCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)