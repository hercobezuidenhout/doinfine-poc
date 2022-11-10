import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from '@components/templates';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from '@components/molecules';
import { Container } from '@mui/material';
import { useTeamContext } from '@providers/TeamProvider';

export const App = () => {
    const [title, setTitle] = useState()

    const location = useLocation()
    const navigate = useNavigate()
    const team = useTeamContext()

    useEffect(() => {
        const pathname = location.pathname

        switch (pathname) {
            case '/team':
                team ? setTitle(team.name) : setTitle('Team')
                break;
            case '/leaderboard':
                setTitle('Leaderboard')
                break;
            default:
                navigate('/team')
        }
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