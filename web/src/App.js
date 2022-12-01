import { InnerAuthProvider } from '@providers/InnerAuthProvider'
import { NotificationsProvider } from '@providers/NotificationsProvider'
import { TeamProvider } from '@providers/TeamProvider'
import { UserProvider } from '@providers/UserProvider'
import { WebNotificationsProvider } from '@providers/WebNotificationsProvider'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const App = () => (
    <InnerAuthProvider>
        <UserProvider>
            <TeamProvider>
                <SnackbarProvider>
                    <WebNotificationsProvider>
                        <NotificationsProvider>
                            <Outlet />
                        </NotificationsProvider>
                    </WebNotificationsProvider>
                </SnackbarProvider>
            </TeamProvider>
        </UserProvider>
    </InnerAuthProvider>
)