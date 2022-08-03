import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from '@components/organisms';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from '@components/molecules';
import { Box, Container, CssBaseline } from '@mui/material';

export const App = () => {
    const [title, setTitle] = useState()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const pathname = location.pathname

        if (pathname === '/') navigate('/team/1')
        if (pathname === '/team') setTitle('Team')
        if (pathname === '/company') setTitle('Leaderboard')
    }, [location])

    return (
        <div data-testid="app">
            <MenuBar title={title} />
            <Container>
                <Outlet />
            </Container>
            <BottomNavigationBar />
        </div>
    )
}