import { InnerAuthProvider } from '@providers/InnerAuthProvider'
import { NotificationsProvider } from '@providers/NotificationsProvider'
import { SpaceProvider } from '@providers/SpaceProvider'
import { TeamProvider } from '@providers/TeamProvider'
import { UserProvider } from '@providers/UserProvider'
import { WebNotificationsProvider } from '@providers/WebNotificationsProvider'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const Space = () => (
    <SpaceProvider>
        <Outlet />
    </SpaceProvider>
)