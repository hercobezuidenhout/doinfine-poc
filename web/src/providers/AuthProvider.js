import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginPage } from '@pages/LoginPage'
import { browserLocalPersistence, getAuth, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const AuthContext = createContext({
    getCurrentUserId: () => { },
    getAccessToken: () => { },
    editProfile: () => { },
    resetPassword: (email) => { },
    signOut: () => { },
    signIn: (email, password) => { }
})

export const AuthProvider = ({ children }) => {
    let auth = getAuth()
    const [currentUser, setCurrentUser] = useState()

    const getCurrentUserId = () => currentUser.uid
    const getAccessToken = () => currentUser.accessToken
    const editProfile = () => { }
    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email, {
            url: 'https://example.com/nice'
        })
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
        auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user)
            if (user) {

            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            getCurrentUserId: getCurrentUserId,
            getAccessToken: getAccessToken,
            editProfile: editProfile,
            resetPassword: resetPassword,
            signOut: logout,
            signIn: signIn
        }}>
            {currentUser ? children : <LoginPage />}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)