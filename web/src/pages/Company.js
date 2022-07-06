import { LeaderboardCard } from "@components/organisms";
import styled from "@emotion/styled";
import { Box, Chip, Toolbar, Typography } from "@mui/material";

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const StyledChip = styled(Chip)({
    marginRight: '1rem',
    color: 'white'
})

export const Company = ({ setToolbar, setTitle }) => {
    const [searchParams, setSearchParams] = useSearchParams({
        tab: 'Fines'
    });

    const updateTab = (tab) => {
        setSearchParams({
            tab: tab
        })
    }

    const InnerToolbar = () => (
        <Toolbar>
            <StyledChip onClick={() => updateTab('Fines')} variant={searchParams.get('tab') == 'Fines' ? 'filled' : 'outlined'} label="Fines" />
            <StyledChip onClick={() => updateTab('Payments')} variant={searchParams.get('tab') == 'Payments' ? 'filled' : 'outlined'} label="Payments" />
            <StyledChip onClick={() => updateTab('Teams')} variant={searchParams.get('tab') == 'Teams' ? 'filled' : 'outlined'} label="Teams" />
        </Toolbar>
    )

    const Title = () => (
        <Typography variant="h5">Company</Typography>
    )

    useEffect(() => {
        setToolbar(InnerToolbar)
        setTitle(Title)
    }, [searchParams])

    return (
        <Box sx={{
            marginTop: '48px',
            padding: '1rem',
        }}>
            <Typography variant="h3">{searchParams.get('tab')}</Typography>
            <Box>
                <LeaderboardCard />
                <LeaderboardCard />
                <LeaderboardCard />
                <LeaderboardCard />
            </Box>
        </Box>
    )
}