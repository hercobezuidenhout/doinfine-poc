import React, { createContext, useContext, useEffect, useState } from 'react'
import * as signalr from '@microsoft/signalr'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useNotificationService } from '@services/notification-service'

var hubsUrlBase = process.env.DEVELOPMENT ? 'https://localhost:5001' : 'https://dev-api-team-lunch.azurewebsites.net'

var connection = new signalr.HubConnectionBuilder().withUrl(`${hubsUrlBase}/hubs/notifications`).build()

export const NotificationsContext = createContext({
    nofiticiations: [],
    readNotification: (id) => { }
})

export const NotificationsProvider = ({ children }) => {
    const [connectionReady, setConnectionReady] = useState(false)
    const [notifications, setNotifications] = useState([])
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const notificationService = useNotificationService()

    const fetchNotifications = async () => {
        const result = await notificationService.fetchAll()
        if (!result) return
        setNotifications(result)
    }

    const readNotification = async (id) => {
        const result = await notificationService.update(id)
        setNotifications(notifications.filter(notification => notification.id !== id))
    }

    useEffect(() => {
        if (!connectionReady) return

        connection.on('ReceiveNofication', data => {
            setNotifications(prevNotifications => [...prevNotifications, data])

            const action = snackbarId => (
                <>
                    <Button onClick={() => navigate(data.link)}>
                        View
                    </Button>
                </>
            );

            if (data.link) {
                enqueueSnackbar(data.title, {
                    action,
                    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
                })
            } else {
                enqueueSnackbar(data.title, {
                    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
                })
            }
        })

    }, [connectionReady])

    useEffect(() => {
        if (connection.state !== 'Disconnected') return
        connection.start()
            .then(() => setConnectionReady(true))
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        fetchNotifications()
    }, [])

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