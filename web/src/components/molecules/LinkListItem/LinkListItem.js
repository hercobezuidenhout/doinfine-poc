import { Divider, useTheme } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import { Box, Chip, IconButton, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const LinkListItem = ({ label, link, handleLinkClick }) => {
    const theme = useTheme()

    return (
        <>
            <ListItem sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Typography variant='p'>{label}</Typography>
                </Box>
                {handleLinkClick
                    ? <IconButton onClick={handleLinkClick}>
                        <ChevronRight />
                    </IconButton>
                    : <Link to={link}>
                        <IconButton>
                            <ChevronRight />
                        </IconButton>
                    </Link>
                }
            </ListItem>
            <Divider />
        </>
    )
}