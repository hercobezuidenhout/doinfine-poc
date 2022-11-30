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
import { firebaseConfig, isDevelopment, isProd, isTest } from './config';



const firebase = isDevelopment()
    ? firebaseConfig.test
    : (
        isTest()
            ? firebaseConfig.test
            : firebaseConfig.prod
    );

const app = initializeApp(firebase);

const analytics = getAnalytics(app);

axios.defaults.baseURL = isDevelopment()
    ? 'https://localhost:5001'
    : (
        isTest()
            ? 'https://test.api.doinfine.app'
            : 'https://api.doinfine.app'
    )

if (!isDevelopment()) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
        });
    }
}


const Corporate = () => {
    const [mode, setMode] = useState('light');
    const [theme, setTheme] = useState(corporateTheme(mode));

    useEffect(() => {
        setTheme(corporateTheme(mode));
    }, [mode]);

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