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
    getCurrentUserId: () => { },
    getAccessToken: () => { }
})


export const AuthProvider = ({ children }) => {

    const [account, setAccount] = useState()

    const loadAuth = async () => {
        const accounts = msalInstance.getAllAccounts()
        if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0])
            setAccount(accounts[0])
        }

        msalInstance.handleRedirectPromise()
            .then(() => {
                const activeAccount = msalInstance.getActiveAccount()

                if (!activeAccount) {
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
        }).catch(error => {
            msalInstance.acquireTokenRedirect({
                scopes: ['https://teamlunch.onmicrosoft.com/api/read']
            })
        })

        if (response.accessToken == '') msalInstance.acquireTokenRedirect({
            scopes: ['https://teamlunch.onmicrosoft.com/api/read']
        })

        return response.accessToken
    }

    const getCurrentUserId = () => {
        if (!account) return
        return account.localAccountId
    }

    useEffect(() => {
        loadAuth()
    }, [])

    return (
        <AuthContext.Provider value={{
            getCurrentUserId: getCurrentUserId,
            getAccessToken: getAccessToken
        }}>
            {account && children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)