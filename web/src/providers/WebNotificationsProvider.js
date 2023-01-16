import { useNotificationService } from "@services/notification-service"
import { SnackbarProvider, useSnackbar } from "notistack"
import React, { createContext, useContext, useEffect, useState } from "react"
import { getNotificationsToken, onMessageListener } from "../firebase"
import { useTeamContext } from "./TeamProvider"

export const WebNotificationsContext = createContext({
    createNotification: (title, body, link) => { }
})

export const WebNotificationsProvider = ({ children }) => {
    const [token, setToken] = useState()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    useEffect(() => {
        getNotificationsToken(setToken)
        onMessageListener()
            .then(payload => {
                enqueueSnackbar(payload.notification.title, {
                    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
                })
            })
            .catch(error => console.log('failed: ', error))
    }, [])

    return (
        <WebNotificationsContext.Provider value={{
            createNotification: () => true
        }}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </WebNotificationsContext.Provider>
    )
}

export const useWebNotificationsContext = () => useContext(WebNotificationsContext)