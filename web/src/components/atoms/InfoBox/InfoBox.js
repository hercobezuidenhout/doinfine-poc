import { Box, Typography } from '@mui/material'
import React from 'react'

export const InfoBox = ({ title, children }) => (
    <Box sx={{
        backgroundColor: 'lightgray',
        padding: '0.5rem',
        borderRadius: '5px',
        marginTop: '1rem'
    }}>
        <Typography variant='h4'>{title}</Typography>
        <Typography variant='body1'>{children}</Typography>
    </Box>
)