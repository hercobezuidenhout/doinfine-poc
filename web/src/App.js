import React, { useEffect, useState } from "react";
import './App.css';
import { Box, ThemeProvider } from "@mui/material";
import { BottomNavigationBar } from "@components/molecules";
import { corporateTheme } from "./theme";
import { RouterProvider } from "./providers/RouterProvider";

const App = () => {
    const [mode, setMode] = useState('dark');
    const [theme, setTheme] = useState(corporateTheme(mode));

    useEffect(() => {
        setTheme(corporateTheme(mode));
    }, [mode])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                height: '100vh'
            }}>
                <RouterProvider>
                    <BottomNavigationBar />
                </RouterProvider>
            </Box>
        </ThemeProvider>
    )
}

export default App;

