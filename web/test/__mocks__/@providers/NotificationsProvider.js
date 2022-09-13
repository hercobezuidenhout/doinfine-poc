import React, { createContext, useContext, useState } from 'react'

import { SnackbarProvider } from 'notistack'

export const NotificationsContext = createContext({
    nofiticiations: [],
    readNotification: (id) => { }
})

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const readNotification = async (id) => {
        setNotifications([])
    }

    return (
        <NotificationsContext.Provider value={{
            nofiticiations: notifications,
            readNotification: readNotification
        }}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </NotificationsContext.Provider>
    )
}

export const useNotificationsContext = () => useContext(NotificationsContext);