import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from '@components/templates';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from '@components/molecules';
import { Container } from '@mui/material';
import { TeamProvider } from '@providers/TeamProvider';
import { useAuthContext } from '@providers/AuthProvider';
import { useTeamService } from './services';

// retrigger pipeline


export const App = () => {
    const [title, setTitle] = useState()
    const [team, setTeam] = useState()
    
    const location = useLocation()
    const navigate = useNavigate()
    const authContext = useAuthContext()
    const teamService = useTeamService()
    
    const fetchTeam = async () => {
        const user = await authContext.getCurrentUser()

        const team = await teamService.fetchById(user.teams[0])
        setTeam(team)
    }

    const navigateToTeam = () => {
        if (!team) return
        navigate(`/team/${team.id}`)
    }

    useEffect(() => {
        fetchTeam()
    }, [authContext])

    useEffect(() => {
        const pathname = location.pathname

        if (pathname === '/') navigateToTeam()
        if (pathname.includes('/team')) team ? setTitle(team.name) : setTitle('Team')
        if (pathname === '/leaderboard') setTitle('Leaderboard')
    }, [location, team])

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