import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider } from '@providers/AuthProvider'
import { RouterProvider } from '@providers/RouterProvider'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CorporateContext, corporateTheme } from './theme'

axios.defaults.baseURL = process.env.DEVELOPMENT ? 'https://localhost:5001' : 'https://dev-api-team-lunch.azurewebsites.net'
const Corporate = () => {
    const [mode, setMode] = useState('dark')
    const [theme, setTheme] = useState(corporateTheme(mode))

    useEffect(() => {
        setTheme(corporateTheme(mode))
    }, [mode])

    return (
        <CorporateContext.Provider value={{ mode, setMode }}>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <CssBaseline />
                    <RouterProvider />
                </AuthProvider>
            </ThemeProvider>
        </CorporateContext.Provider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Corporate />)