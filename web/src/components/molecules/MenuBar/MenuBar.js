import { DarkMode, ExpandMore, LightMode, Menu as MenuIcon, Notifications } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNotificationsContext } from "@providers/NotificationsProvider";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CorporateContext } from "../../../theme";

export const MenuBar = ({ title = 'TeamLunch' }) => {
    const { mode, setMode } = useContext(CorporateContext)
    const notificationContext = useNotificationsContext()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleReadAllClick = () => {
        notificationContext.readAll()
    }

    const handleSwitcherClick = (newMode) => {
        setMode(newMode)
        localStorage.setItem('mode', newMode)
    }

    const handleNotificationClick = (notification) => {
        notificationContext.readNotification(notification.id)

        if (notification.link) navigate(notification.link)
    }

    return (
        <AppBar data-testid="menu-bar" position='sticky'>
            <Toolbar sx={{
                justifyContent: 'space-between'
            }}>
                {title.onClick
                    ? <Button color='secondary' onClick={title.onClick} endIcon={<ExpandMore />}>{title.title}</Button>
                    : <Typography data-testid="menubar-title">{title}</Typography>
                }
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
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'menu-button',
                        }}
                    >

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 0.8rem'
                        }}>
                            <Typography variant='h6'>Notifications</Typography>
                            {notificationContext.nofiticiations.length > 3 && <Button onClick={handleReadAllClick}>Read All</Button>}
                        </Box>
                        {notificationContext.nofiticiations.length > 0 && notificationContext.nofiticiations.filter(notification => !notification.read).map(notification => (
                            <MenuItem key={notification.id} onClick={() => handleNotificationClick(notification)}>{notification.title}</MenuItem>
                        ))}

                        {notificationContext.nofiticiations.length == 0 && <MenuItem>No notifications to display</MenuItem>}
                    </Menu>

                    {mode == 'light'
                        ? <IconButton onClick={() => handleSwitcherClick('dark')}><LightMode data-testid="theme-switcher-light" /></IconButton>
                        : <IconButton onClick={() => handleSwitcherClick('light')} ><DarkMode data-testid="theme-switcher-dark" /></IconButton>
                    }

                    <Link to="/menu">
                        <IconButton sx={{
                            marginLeft: '1rem'
                        }}>
                            <MenuIcon data-testid="menubar-icon" />
                        </IconButton>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}