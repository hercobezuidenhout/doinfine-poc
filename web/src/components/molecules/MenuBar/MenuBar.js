import { Menu } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export const MenuBar = ({ title = 'Corporate' }) => (
    <AppBar>
        <Toolbar>
            <Typography data-testid='menubar-title'>{title}</Typography>
            <Menu data-testid='menubar-icon' />
        </Toolbar>
    </AppBar>
)