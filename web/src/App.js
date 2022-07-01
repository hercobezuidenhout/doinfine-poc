import React, { useEffect, useState } from "react";
import './App.css';

import { BottomNavigation, BottomNavigationAction, ThemeProvider } from "@mui/material";
import { AccountCircle, AddCard, Business, Group, Money } from "@mui/icons-material";
import { corporateTheme } from "./theme";

const App = () => {
    const [mode, setMode] = useState('light');
    const [theme, setTheme] = useState(corporateTheme(mode));

    useEffect(() => {
        setTheme(corporateTheme(mode));
    }, [mode])

    return <ThemeProvider theme={theme}>
        
        <BottomNavigation sx={{
            backgroundColor: theme.palette.primary.main,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
        }} showLabels>
            <BottomNavigationAction sx={{
                color: theme.palette.secondary.dark,
            }} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} label='Team' icon={<Group />} />
            <BottomNavigationAction label='Company' icon={<Business />} />
            <BottomNavigationAction label='Fine' icon={<Money />} />
            <BottomNavigationAction label='Pay Fine' icon={<AddCard />} />
            <BottomNavigationAction label='Account' icon={<AccountCircle />} />
        </BottomNavigation>
    </ThemeProvider>
}

export default App;

