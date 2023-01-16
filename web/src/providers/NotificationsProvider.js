import React, { createContext, useContext, useEffect, useState } from 'react'
import * as signalr from '@microsoft/signalr'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useNotificationService } from '@services/notification-service'
import { useTeamContext } from './TeamProvider'
import { useWebNotificationsContext } from './WebNotificationsProvider'
import { isDevelopment, isTest, isProd } from '../config'

export const NotificationsContext = createContext({
    nofiticiations: [],
    readNotification: (id) => { },
    readAll: () => { }
})

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const notificationService = useNotificationService()
    const { id: teamId } = useTeamContext()

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

    return (
        <NotificationsContext.Provider value={{
            nofiticiations: [],
            readNotification: () => true,
            readAll: () => true
        }}>
            {children}
        </NotificationsContext.Provider>
    )
}

export const useNotificationsContext = () => useContext(NotificationsContext)