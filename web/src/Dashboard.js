import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from '@components/templates';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from '@components/molecules';
import { Box, Container, Drawer, List, ListItemButton, Typography } from '@mui/material';
import { useTeamContext } from '@providers/TeamProvider';

export const Dashboard = () => {
    const [title, setTitle] = useState()
    const [showDrawer, setShowDrawer] = useState()

    const location = useLocation()
    const navigate = useNavigate()
    const { activeTeam, teams, switchActiveTeam } = useTeamContext()

    const handleTeamClick = async (team) => {
        await switchActiveTeam(team)
        setShowDrawer(false)
    }

    const handleDrawerClose = () => setShowDrawer(false)

    useEffect(() => {
        const pathname = location.pathname

        switch (pathname) {
            case '/team':
                setTitle({ onClick: () => setShowDrawer(true), title: activeTeam.name })
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
            <Drawer
                anchor='bottom'
                open={showDrawer}
                onClose={handleDrawerClose}>
                <Box sx={{
                    padding: '1rem'
                }}>
                    <Typography variant='h6'>Switch Team</Typography>
                    <List>
                        {teams.filter(team => team.id !== activeTeam.id).map((team, index) => (
                            <ListItemButton key={index} onClick={() => handleTeamClick(team)}>
                                <Typography variant='p'>{team.name}</Typography>
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    )
}