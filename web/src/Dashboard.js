import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from '@components/templates';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from '@components/molecules';
import { Container } from '@mui/material';
import { useTeamContext } from '@providers/TeamProvider';

export const Dashboard = () => {
    const [title, setTitle] = useState()

    const location = useLocation()
    const navigate = useNavigate()
    const { name: teamName } = useTeamContext()

    useEffect(() => {
        const pathname = location.pathname

        switch (pathname) {
            case '/team':
                teamName ? setTitle(teamName) : setTitle('Team')
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