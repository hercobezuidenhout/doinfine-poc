import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginPage } from '@pages/LoginPage'
import { browserLocalPersistence, getAuth, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const AuthContext = createContext({
    getCurrentUserId: () => { },
    getAccessToken: () => { },
    editProfile: () => { },
    resetPassword: (email) => { },
    signOut: () => { },
    signIn: (email, password) => { },
    getCurrentEmail: () => { }
})

export const AuthProvider = ({ children }) => {
    let auth = getAuth()
    const [currentUser, setCurrentUser] = useState()

    const getCurrentUserId = () => currentUser.uid
    const getAccessToken = () => currentUser.accessToken
    const getCurrentEmail = () => currentUser.email

    const editProfile = () => { }
    const resetPassword = async (email) => {
        return await sendPasswordResetEmail(auth, email)
    }

    const logout = async () => {
        await signOut(auth)
    }

    const signIn = async (email, password) => {
        if (!auth) return
        const response = await signInWithEmailAndPassword(auth, email, password).catch(error => console.log(error))
        return response
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => setCurrentUser(user))
    }, [])

    return (
        <AuthContext.Provider value={{
            getCurrentUserId: getCurrentUserId,
            getAccessToken: getAccessToken,
            editProfile: editProfile,
            resetPassword: resetPassword,
            signOut: logout,
            signIn: signIn,
            getCurrentEmail: getCurrentEmail
        }}>
            {currentUser ? children : <LoginPage />}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)