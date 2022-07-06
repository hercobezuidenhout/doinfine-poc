import React, { useEffect, useState } from "react";
import './App.css';
import { AppBar, Box, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { BottomNavigationBar } from "@components/molecules";
import { corporateTheme } from "./theme";
import { RouterProvider } from "./providers/RouterProvider";
import { Menu } from "@mui/icons-material";

const App = () => {
    const [mode, setMode] = useState('light');
    const [theme, setTheme] = useState(corporateTheme(mode));
    const [toolbar, setToolbar] = useState(undefined);
    const [title, setTitle] = useState(undefined);

    useEffect(() => {
        setTheme(corporateTheme(mode));
    }, [mode])

    const handleSetToolbar = (innerNavToolbar) => setToolbar(innerNavToolbar);

    const handleSetTitle = (title) => setTitle(title);

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider setToolbar={handleSetToolbar} setTitle={handleSetTitle}>
                <AppBar elevation={0} sx={{
                    backgroundColor: 'white',
                    color: 'black',
                }}>
                    <Toolbar sx={{
                        justifyContent: 'space-between'
                    }}>
                        {title}
                        <Menu />
                    </Toolbar>
                </AppBar>
                <BottomNavigationBar innerToolbar={toolbar} />
            </RouterProvider>
        </ThemeProvider>
    )
}

export default App;

