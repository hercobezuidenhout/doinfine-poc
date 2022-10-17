import React, { createContext, useContext, useEffect, useState } from 'react'
import { EventType, PublicClientApplication } from '@azure/msal-browser'
import axios from 'axios'

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
    getAccessToken: () => { },
    editProfile: () => { },
    signOut: () => { }
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

    const editProfile = () => {
        const request = {
            scopes: ['https://teamlunch.onmicrosoft.com/api/read'],
            authority: b2cPolicies.authorities.editProfile.authority,
            redirectUri: redirectUri
        }

        msalInstance.acquireTokenRedirect(request);
    }

    const getCurrentUserId = () => {
        if (!account) return
        return account.localAccountId
    }

    const signOut = () => {
        msalInstance.logoutRedirect()
    }

    useEffect(() => {
        const callbackId = msalInstance.addEventCallback(async (event) => {
            // if (!event.eventType == 'msal:acquireTokenSuccess') return
            // if (!event.payload.account.idTokenClaims.tfp == 'B2C_1_ProfileEditing') return


            if (event.eventType == EventType.ACQUIRE_TOKEN_SUCCESS) {
                if (event?.payload) {
                    if (event.payload.idTokenClaims['newUser']) {
                        const lastName = event.payload.account.idTokenClaims.family_name
                        const firstName = event.payload.account.idTokenClaims.name
                        const accessToken = event.payload.accessToken

                        await axios.post('/users', {
                            firstName: firstName,
                            lastName: lastName
                        }, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }).catch(error => console.error(error))
                    }
                    if (event.payload.idTokenClaims['tfp'] == b2cPolicies.names.editProfile) {
                        const lastName = event.payload.account.idTokenClaims.family_name
                        const firstName = event.payload.account.idTokenClaims.name
                        const accessToken = event.payload.accessToken

                        await axios.put('/users', {
                            firstName: firstName,
                            lastName: lastName
                        }, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }).catch(error => console.error(error))

                        console.log('Update success')
                    }
                }
            }
        })
        loadAuth()

        return () => {
            msalInstance.removeEventCallback(callbackId)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            getCurrentUserId: getCurrentUserId,
            getAccessToken: getAccessToken,
            editProfile: editProfile,
            signOut: signOut
        }}>
            {account && children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)