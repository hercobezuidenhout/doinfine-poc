import { NotificationsProvider } from '@providers/NotificationsProvider'
import { TeamProvider } from '@providers/TeamProvider'
import { WebNotificationsProvider } from '@providers/WebNotificationsProvider'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const Team = () => (
    <TeamProvider>
        <SnackbarProvider>
            <WebNotificationsProvider>
                <NotificationsProvider>
                    <Outlet />
                </NotificationsProvider>
            </WebNotificationsProvider>
        </SnackbarProvider>
    </TeamProvider>
)