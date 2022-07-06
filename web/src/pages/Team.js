import { AppBar, Avatar, Box, Divider, Paper, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { faker } from '@faker-js/faker';
import styled from '@emotion/styled';
import { FineCard } from "@components/organisms";

const StyledAvatar = styled(Avatar)({
    marginRight: '10px'
})

export const Team = ({ setToolbar, setTitle }) => {
    const InnerToolbar = () => (
        <Toolbar>
            <StyledAvatar src={faker.image.avatar()} />
            <StyledAvatar src={faker.image.avatar()} />
            <StyledAvatar src={faker.image.avatar()} />
            <StyledAvatar src={faker.image.avatar()} />
            <StyledAvatar src={faker.image.avatar()} />
        </Toolbar>
    )

    const Title = () => (
        <Typography variant="h5">Team</Typography>
    )

    useEffect(() => {
        setToolbar(InnerToolbar)
        setTitle(Title)
    }, [])

    return (
        <Box sx={{
            marginTop: '48px',
            padding: '1rem',
            height: '100vh'
        }}>
            <Typography variant="h3">Billy Anderson</Typography>
            <Box sx={{
                overflow: 'scroll',
                height: '80%'
            }}>
                <FineCard />
                <FineCard />
                <FineCard />
                <FineCard />
                <FineCard />
                <FineCard />
                <FineCard />
                <FineCard />
                <FineCard />
            </Box>
        </Box>
    )
}