import { InnerAuthProvider } from '@providers/InnerAuthProvider'
import { UserProvider } from '@providers/UserProvider'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const App = () => (
    <InnerAuthProvider>
        <UserProvider>
            <Outlet />
        </UserProvider>
    </InnerAuthProvider>
)