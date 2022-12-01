import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginPage } from '@pages/LoginPage'
import { browserLocalPersistence, getAuth, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { LandingPage } from '@pages/LandingPage'
import { useNavigate } from 'react-router-dom'

export const OuterAuthContext = createContext({
    resetPassword: (email) => { },
    signOut: () => { },
    signIn: (email, password) => { },
    getCurrentUser: () => { },
    getAccessToken: () => { }
})

export const OuterAuthProvider = ({ children }) => {
    let auth = getAuth()
    const navigate = useNavigate()
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

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user)

            if (user) {
                navigate('/')
            } else {
                navigate('/login')
            }
        })
    }, [])

    return (
        <OuterAuthContext.Provider value={{
            getCurrentUser: getCurrentUser,
            getAccessToken: () => getCurrentUser().accessToken,
            resetPassword: resetPassword,
            signOut: logout,
            signIn: signIn,
        }}>
            {children}
        </OuterAuthContext.Provider>
    )
}

export const useOuterAuthContext = () => useContext(OuterAuthContext)