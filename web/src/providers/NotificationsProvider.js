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

function isIOS() {
    const browserInfo = navigator.userAgent.toLowerCase();

    if (browserInfo.match('iphone') || browserInfo.match('ipad')) {
        return true;
    }
    if (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)) {
        return true;
    }
    return false;
}

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

            if (isIOS()) return
            const notification = new Notification(data.title, {
                body: data.description,
                icon: '../assets/logo.png',
                image: '../assets/logo.png'
            })

            notification.addEventListener('click', () => {
                if (data.link) navigate(data.link)
            })

        })

    }, [connectionReady])

    useEffect(() => {
        if (connection.state !== 'Disconnected') return
        connection.start()
            .then(() => setConnectionReady(true))
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        if (isIOS()) return;
        if (notifications.length == 0) {
            navigator.clearAppBadge()
        }
        navigator.setAppBadge(notifications.length)
    }, [notifications])

    useEffect(() => {
        fetchNotifications()
        if (isIOS()) return;
        Notification.requestPermission()
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