import React from 'react';
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { AccountCircle, AddCard, Business, Group, Money } from "@mui/icons-material";

export const BottomNavigationBar = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <BottomNavigation sx={{
            backgroundColor: theme.palette.primary.main,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
        }} showLabels>
            <BottomNavigationAction data-testid="team-item" sx={{
                color: theme.palette.secondary.dark,
            }} onClick={() => navigate('/team')} label='Team' icon={<Group />} />
            <BottomNavigationAction sx={{
                color: theme.palette.secondary.dark,
            }} onClick={() => navigate('/company')} label='Company' icon={<Business />} />
            <BottomNavigationAction sx={{
                color: theme.palette.secondary.dark,
            }} onClick={() => navigate('/fine')} label='Fine' icon={<Money />} />
            <BottomNavigationAction sx={{
                color: theme.palette.secondary.dark,
            }} onClick={() => navigate('/payment')} label='Payment' icon={<AddCard />} />
            <BottomNavigationAction sx={{
                color: theme.palette.secondary.dark,
            }} onClick={() => navigate('/account')} label='Account' icon={<AccountCircle />} />
        </BottomNavigation>
    )
}