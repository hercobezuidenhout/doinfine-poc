import { Divider, ListItemButton, useTheme } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import { Box, Chip, IconButton, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const LinkListItem = ({ label, link, handleLinkClick }) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const handleClick = () => {
        link ? navigate(link) : handleLinkClick()
    }

    return (
        <>
            <ListItemButton onClick={handleClick} sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0.5rem'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Typography variant='p'>{label}</Typography>
                </Box>

                <ChevronRight />
            </ListItemButton>
            <Divider />
        </>
    )
}