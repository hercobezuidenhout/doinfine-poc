import React, { createContext, useContext, useEffect, useState } from "react"
import { getNotificationsToken, onMessageListener } from "../firebase"

export const WebNotificationsContext = createContext({
    createNotification: (title, body, link) => { }
})

export const WebNotificationsProvider = ({ children }) => {
    const [token, setToken] = useState()

    useEffect(() => {
        getNotificationsToken(setToken)
        onMessageListener()
            .then(payload => {
                console.log(payload)
            })
            .catch(error => console.log('failed: ', error))
    }, [])

    return (
        <WebNotificationsContext.Provider value={{
            createNotification: () => true
        }}>
            {children}
        </WebNotificationsContext.Provider>
    )
}

export const useWebNotificationsContext = () => useContext(WebNotificationsContext)