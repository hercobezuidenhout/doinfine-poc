import { useTheme } from '@emotion/react';
import { Box, Paper, Typography, Avatar, Divider } from "@mui/material";
import React from 'react';
import { faker } from '@faker-js/faker';

export const LeaderboardCard = (props) => {
    const theme = useTheme();

    return (
        <Box>
            <Paper elevation={0} sx={{
                padding: theme.spacing(2),
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box>
                    <Typography variant="h5">1</Typography>
                </Box>
                <Box sx={{
                    marginLeft: theme.spacing(2),
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
                        <Typography sx={{
                            marginLeft: theme.spacing(2)
                        }} variant="p">{faker.name.firstName()} {faker.name.lastName()}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="p">{faker.random.numeric(2)} Fines</Typography>
                    </Box>
                </Box>
            </Paper>
            <Divider />
        </Box>

    )
}