import React, { createContext, useContext, useEffect, useState } from 'react'
import { users } from '../__mocks__/backend'
import { PublicClientApplication } from '@azure/msal-browser'

const redirectUri = process.env.DEVELOPMENT ? 'http://localhost:3000' : 'https://thankful-sand-0a1eb4203.1.azurestaticapps.net'

const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_SignUp_SignIn",
        editProfile: "B2C_1_ProfileEditing"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://teamlunch.b2clogin.com/teamlunch.onmicrosoft.com/B2C_1_SignUp_SignIn",
        },
        editProfile: {
            authority: "https://teamlunch.b2clogin.com/teamlunch.onmicrosoft.com/B2C_1_ProfileEditing"
        }
    },
    authorityDomain: "teamlunch.b2clogin.com"
}

const msalConfig = {
    auth: {
        clientId: "9dd2dacf-b536-460e-b7fd-307c7dc1f981",
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: redirectUri,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
}


const msalInstance = new PublicClientApplication(msalConfig)

export const AuthContext = createContext({
    userId: undefined,
    getCurrentUser: () => { },
    getAccessToken: () => { }
})


export const AuthProvider = ({ children }) => {

    const [account, setAccount] = useState()

    const loadAuth = () => {
        const accounts = msalInstance.getAllAccounts()
        if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0])
            setAccount(accounts[0])
        }

        msalInstance.handleRedirectPromise()
            .then(() => {
                const account = msalInstance.getActiveAccount()

                if (!account) {
                    msalInstance.loginRedirect({
                        scopes: ['https://teamlunch.onmicrosoft.com/api/read']
                    })
                }
            }).catch(error => {
                console.log(error)
            })
    }

    const getAccessToken = async () => {
        const response = await msalInstance.acquireTokenSilent({
            scopes: ['https://teamlunch.onmicrosoft.com/api/read']
        })

        if (response.accessToken == '') msalInstance.acquireTokenRedirect({
            scopes: ['https://teamlunch.onmicrosoft.com/api/read']
        })

        return response.accessToken
    }

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