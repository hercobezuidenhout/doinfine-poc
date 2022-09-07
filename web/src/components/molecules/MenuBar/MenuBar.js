import { DarkMode, LightMode, Menu as MenuIcon, Notifications } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNotificationsContext } from "@providers/NotificationsProvider";
import React, { useContext, useState } from "react";
import { CorporateContext } from "../../../theme";

export const MenuBar = ({ title = 'TeamLunch' }) => {
    const { mode, setMode } = useContext(CorporateContext)
    const notificationContext = useNotificationsContext()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <IconButton sx={{
                        marginRight: '1rem'
                    }}
                        id="menu-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Badge badgeContent={notificationContext.nofiticiations.length} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>

                    {mode == 'light'
                        ? <IconButton onClick={() => handleSwitcherClick('dark')}><LightMode data-testid="theme-switcher-light" /></IconButton>
                        : <IconButton onClick={() => handleSwitcherClick('light')} ><DarkMode data-testid="theme-switcher-dark" /></IconButton>
                    }

                    <IconButton sx={{
                        marginLeft: '1rem'
                    }}>
                        <MenuIcon data-testid="menubar-icon" />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'menu-button',
                        }}
                    >
                        {notificationContext.nofiticiations.length > 0 && notificationContext.nofiticiations.filter(notification => !notification.read).map(notification => (
                            <MenuItem key={notification.id} onClick={() => notificationContext.readNotification(notification.id)}>{notification.title}</MenuItem>
                        ))}

                        {notificationContext.nofiticiations.length == 0 && <MenuItem>No notifications to display</MenuItem>}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}