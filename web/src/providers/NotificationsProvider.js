import React, { createContext, useContext, useEffect, useState } from 'react'
import * as signalr from '@microsoft/signalr'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useNotificationService } from '@services/notification-service'
import { useTeamContext } from './TeamProvider'
import { useWebNotificationsContext } from './WebNotificationsProvider'
import { isDevelopment, isTest, isProd } from '../config'

const hubsUrlBase = isDevelopment()
    ? 'https://localhost:5001'
    : (
        isTest()
            ? 'https://test.api.doinfine.app'
            : 'https://api.doinfine.app'
    )

export const NotificationsContext = createContext({
    nofiticiations: [],
    readNotification: (id) => { },
    readAll: () => { }
})

export const NotificationsProvider = ({ children }) => {
    const [connection, setConnection] = useState()
    const [connectionReady, setConnectionReady] = useState(false)
    const [notifications, setNotifications] = useState([])
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const notificationService = useNotificationService()
    const { id: teamId } = useTeamContext()
    const webNotificationsContext = useWebNotificationsContext()

    const fetchNotifications = async () => {
        const result = await notificationService.fetchAll()
        if (!result) return
        setNotifications(result)
    }

    const readNotification = async (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id))
        await notificationService.update(id)
    }

    const readAll = async () => {
        const notificationsToRead = notifications

        setNotifications([])

        for (let index = 0; index < notificationsToRead.length; index++) {
            const notificationToRead = notifications[index]
            await notificationService.update(notificationToRead.id)
        }
    }

    const handleReceiveNotification = async (data) => {
        setNotifications(prevNotifications => [...prevNotifications, data])

        const action = snackbarId => (
            <>
                <Button onClick={() => navigate(data.link)}>
                    View
                </Button>
            </>
        )


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

        webNotificationsContext.createNotification(data.title, data.description, data.link)
    }

    useEffect(() => {
        if (!connection) return
        if (connection.state !== 'Disconnected') return

        connection.start()
            .then(() => {
                setConnectionReady(true)
            })
            .catch(error => console.error(error))
    }, [connection])

    useEffect(() => {
        if (!connectionReady) return
        connection.on('ReceiveNofication', handleReceiveNotification)
    }, [connectionReady])

    useEffect(() => {
        if (!connectionReady) return

        const roomName = teamId.toString()
        connection.invoke('JoinRoom', roomName)
            .then(() => console.info('Connected to room: ', roomName))
            .catch(error => console.log(error))
    }, [teamId, connectionReady])


    return (
        <NotificationsContext.Provider value={{
            nofiticiations: [],
            readNotification: () => true,
            readAll: () => true
        }}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </NotificationsContext.Provider>
    )
}

export const useNotificationsContext = () => useContext(NotificationsContext)