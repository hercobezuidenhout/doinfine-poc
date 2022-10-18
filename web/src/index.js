import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider } from '@providers/AuthProvider'
import { NotificationsProvider } from '@providers/NotificationsProvider'
import { RouterProvider } from '@providers/RouterProvider'
import { TeamProvider } from '@providers/TeamProvider'
import { UserProvider } from '@providers/UserProvider'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import './index.css'
import { CorporateContext, corporateTheme } from './theme'

if (!process.env.DEVELOPMENT) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('SW registered', registration)
                })
                .catch(error => {
                    console.log('SW registration failed: ', error)
                })
        })
    }
}

axios.defaults.baseURL = process.env.DEVELOPMENT ? 'https://localhost:5001' : 'https://dev-api-team-lunch.azurewebsites.net'

const Corporate = () => {
    const [mode, setMode] = useState('dark')
    const [theme, setTheme] = useState(corporateTheme(mode))

    useEffect(() => {
        setTheme(corporateTheme(mode))
    }, [mode])

    useEffect(() => {
        const localStorageMode = localStorage.getItem('mode')
        if (localStorageMode) setMode(localStorageMode)
    }, [])

    return (
        <CorporateContext.Provider value={{ mode, setMode }}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ErrorBoundary>
                        <AuthProvider>
                            <UserProvider>
                                <TeamProvider>
                                    <CssBaseline />
                                    <SnackbarProvider>
                                        <NotificationsProvider>
                                            <RouterProvider />
                                        </NotificationsProvider>
                                    </SnackbarProvider>
                                </TeamProvider>
                            </UserProvider>
                        </AuthProvider>
                    </ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
        </CorporateContext.Provider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Corporate />)