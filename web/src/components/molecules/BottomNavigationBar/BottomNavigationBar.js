import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, useTheme } from "@mui/material";
import { Add } from '@mui/icons-material';


export const BottomNavigationBar = ({ innerToolbar }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <AppBar sx={{
            position: 'fixed',
            top: 'auto',
            bottom: 0
        }}>
            {innerToolbar}
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Link to="/team">
                    <Button data-testid="team-item" sx={{
                        marginLeft: '2rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }} centerRipple>TEAM</Button>
                </Link>
                <Add sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    margin: '0 auto'
                }} />
                <Link to="/company">
                    <Button data-testid="company-item" sx={{
                        marginRight: '2rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }} centerRipple>COMPANY</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}