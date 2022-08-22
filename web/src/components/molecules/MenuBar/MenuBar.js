import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CorporateContext } from "../../../theme";

export const MenuBar = ({ title = 'TeamLunch' }) => {
    const { mode, setMode } = useContext(CorporateContext)

    const handleSwitcherClick = (newMode) => {
        setMode(newMode)
        localStorage.setItem('mode', newMode)
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