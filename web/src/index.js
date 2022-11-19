import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from '@providers/AuthProvider';
import { NotificationsProvider } from '@providers/NotificationsProvider';
import { RouterProvider } from '@providers/RouterProvider';
import { TeamProvider } from '@providers/TeamProvider';
import { UserProvider } from '@providers/UserProvider';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import './index.css';
import { CorporateContext, corporateTheme } from './theme';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { WebNotificationsProvider } from '@providers/WebNotificationsProvider';

const packageJson = require('../package.json')
console.log(packageJson.version)

const app = initializeApp({
    apiKey: "AIzaSyAR_1Yfan_Ru-09BRPmqnSXjNwAk6rvfss",
    authDomain: "doin-fine.firebaseapp.com",
    projectId: "doin-fine",
    storageBucket: "doin-fine.appspot.com",
    messagingSenderId: "852724502631",
    appId: "1:852724502631:web:429d35119d234cdb5004c2",
    measurementId: "G-45SECZFJMV"
});

const analytics = getAnalytics(app);

axios.defaults.baseURL = process.env.DEVELOPMENT ? 'https://localhost:5001' : 'https://api.doinfine.app';

const Corporate = () => {
    const [mode, setMode] = useState('light');
    const [theme, setTheme] = useState(corporateTheme(mode));

    useEffect(() => {
        setTheme(corporateTheme(mode));
    }, [mode]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('SW registered', registration);
                    })
                    .catch(error => {
                        console.log('SW registration failed: ', error);
                    });
            });
        }
    }, [])

    useEffect(() => {
        const localStorageMode = localStorage.getItem('mode');
        if (localStorageMode) setMode(localStorageMode);
    }, []);

    return (
        <CorporateContext.Provider value={{ mode, setMode }}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ErrorBoundary>

                        <CssBaseline />
                        <AuthProvider>
                            <UserProvider>
                                <TeamProvider>
                                    <SnackbarProvider>
                                        <WebNotificationsProvider>
                                            <NotificationsProvider>
                                                <RouterProvider />
                                            </NotificationsProvider>
                                        </WebNotificationsProvider>
                                    </SnackbarProvider>
                                </TeamProvider>
                            </UserProvider>
                        </AuthProvider>

                    </ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
        </CorporateContext.Provider>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Corporate />);