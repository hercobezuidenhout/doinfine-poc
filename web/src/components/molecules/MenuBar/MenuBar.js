import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { CorporateContext } from "../../../theme";

export const MenuBar = ({ title = 'Corporate' }) => {
    const { mode, setMode } = useContext(CorporateContext)
    // const [mode, setMode] = useState(corporateContext.mode)

    const handleSwitcherClick = (newMode) => {
        console.log('click', mode, newMode)
        setMode(newMode)
    }

    return (
        <AppBar data-testid="menu-bar" position='sticky'>
            <Toolbar sx={{
                justifyContent: 'space-between'
            }}>
                <Typography data-testid="menubar-title">{title}</Typography>
                <Box>
                    {mode == 'light'
                        ? <LightMode data-testid="theme-switcher-light" onClick={() => handleSwitcherClick('dark')} />
                        : <DarkMode data-testid="theme-switcher-dark" onClick={() => handleSwitcherClick('light')} />
                    }
                    <Menu sx={{
                        marginLeft: '1rem'
                    }} data-testid="menubar-icon" />
                </Box>
            </Toolbar>
        </AppBar>
    )
}