import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider } from '@providers/AuthProvider'
import { NotificationsProvider } from '@providers/NotificationsProvider'
import { RouterProvider } from '@providers/RouterProvider'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { CorporateContext, corporateTheme } from './theme'

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
                    <AuthProvider>
                        <CssBaseline />
                        <SnackbarProvider>
                            <NotificationsProvider>
                                <RouterProvider />
                            </NotificationsProvider>
                        </SnackbarProvider>
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </CorporateContext.Provider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Corporate />)