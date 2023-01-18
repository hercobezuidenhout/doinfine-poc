import { CssBaseline, ThemeProvider } from '@mui/material';
import { OuterAuthProvider } from '@providers/OuterAuthProvider';
import { RouterProvider } from '@providers/RouterProvider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import './index.css';
import { CorporateContext, corporateTheme } from './theme';
import { isDevelopment, isTest } from './config';
import './firebase'


axios.defaults.baseURL = isDevelopment()
    ? 'http://localhost:5001/doinfine-test/us-central1/api'
    : (
        isTest()
            ? 'https://us-central1-doinfine-test.cloudfunctions.net/api'
            : 'https://us-central1-doin-fine.cloudfunctions.net/api'
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
                        <OuterAuthProvider>
                            <RouterProvider />
                        </OuterAuthProvider>
                    </ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
        </CorporateContext.Provider>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Corporate />);

export const env = process.env