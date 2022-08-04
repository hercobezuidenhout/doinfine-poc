import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from '@components/templates';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from '@components/molecules';
import { Container } from '@mui/material';
import { TeamProvider } from '@providers/TeamProvider';

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
            <TeamProvider>
                <MenuBar title={title} />
                <Container>
                    <Outlet />
                </Container>
                <BottomNavigationBar />
            </TeamProvider>
        </div>
    )
}