import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginPage } from '@pages/LoginPage'
import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { LandingPage } from '@pages/LandingPage'
import { useNavigate } from 'react-router-dom'

export const OuterAuthContext = createContext({
    resetPassword: (email) => { },
    signOut: () => { },
    signIn: (email, password) => { },
    signUp: (email, password) => { },
    currentUser: undefined
})

export const OuterAuthProvider = ({ children }) => {
    let auth = getAuth()
    const [currentUser, setCurrentUser] = useState()

    const getCurrentUser = () => currentUser

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

    const signUp = async (email, password, fullName) => {
        const newUser = await createUserWithEmailAndPassword(auth, email, password)
        return { uid: newUser.user.uid, accessToken: newUser.user.accessToken }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <OuterAuthContext.Provider value={{
            currentUser: currentUser,
            getCurrentUser: getCurrentUser,
            getAccessToken: () => getCurrentUser().accessToken,
            resetPassword: resetPassword,
            signOut: logout,
            signIn: signIn,
            signUp: signUp
        }}>
            {children}
        </OuterAuthContext.Provider>
    )
}

export const useOuterAuthContext = () => useContext(OuterAuthContext)