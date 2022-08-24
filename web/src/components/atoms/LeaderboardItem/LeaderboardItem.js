import { Box, Divider, ListItem, Typography } from '@mui/material'
import React from 'react'

export const LeaderboardItem = ({ position, name, fines }) => (
    <>
        <ListItem sx={{
            justifyContent: 'space-between'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography sx={{
                    marginRight: '0.5rem'
                }} variant="h4">{position ?? '#'}</Typography>
                <p>{name ?? 'TeamLunch User'}</p>
            </Box>
            <p>{fines ?? '?'}</p>
        </ListItem>
        <Divider />
    </>
)