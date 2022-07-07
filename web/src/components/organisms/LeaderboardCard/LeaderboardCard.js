import { useTheme } from '@emotion/react';
import { Box, Paper, Typography, Avatar, Divider } from "@mui/material";
import React from 'react';
import { faker } from '@faker-js/faker';

export const LeaderboardCard = (props) => {
    const theme = useTheme();
    const { position, name, count, filter } = props;

    return (
        <Box>
            <Paper elevation={0} sx={{
                padding: theme.spacing(2),
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box>
                    <Typography data-testid="leaderboard-position" variant="h5">{position}</Typography>
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
                        <Typography data-testid="leaderboard-name" sx={{
                            marginLeft: theme.spacing(2)
                        }} variant="p">{name}</Typography>
                    </Box>
                    <Box>
                        <Typography data-testid="leaderboard-count" variant="p">{count} {filter}</Typography>
                    </Box>
                </Box>
            </Paper>
            <Divider />
        </Box>

    )
}