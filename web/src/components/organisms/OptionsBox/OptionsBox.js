import { Box, List, Typography } from '@mui/material'
import React from 'react'

export const OptionsBox = ({ label, children }) => {
    return (
        <Box sx={{
            padding: '1rem',
            border: '1px solid'
        }}>
            <Typography variant='h4'>{label}</Typography>
            <List>
                {children}
            </List>
        </Box>
    )
}