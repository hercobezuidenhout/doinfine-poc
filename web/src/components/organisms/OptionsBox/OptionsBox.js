import { Box, List, Typography } from '@mui/material'
import React from 'react'

export const OptionsBox = ({ label, children }) => {
    return (
        <Box sx={{
            padding: '1rem 0',
        }}>
            <Typography variant='h4'>{label}</Typography>
            <List>
                {children}
            </List>
        </Box>
    )
}