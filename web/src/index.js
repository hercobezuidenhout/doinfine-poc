import { Box, ThemeProvider } from '@mui/material';
import { RouterProvider } from '@providers/RouterProvider';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CorporateContext, corporateTheme } from './theme';

const Corporate = () => {
    const [mode, setMode] = useState('dark');
    const [theme, setTheme] = useState(corporateTheme(mode));

    useEffect(() => {
        setTheme(corporateTheme(mode));
    }, [mode])

    return (
        <CorporateContext.Provider value={{ mode, setMode }}>
            <ThemeProvider theme={theme}>
                <RouterProvider />
            </ThemeProvider>
        </CorporateContext.Provider>
    )
}

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<Corporate />);