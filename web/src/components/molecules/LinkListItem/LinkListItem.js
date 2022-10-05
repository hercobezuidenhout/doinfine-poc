import { useTheme } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import { Box, Chip, IconButton, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const LinkListItem = ({ label, link, count = 0, handleLinkClick }) => {
    const theme = useTheme()

    return (
        <ListItem sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem',
            background: theme.palette.secondary.main,
            borderRadius: '8px',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                {count !== 0 && <Chip sx={{
                    marginRight: '1rem'
                }} data-testid="count-badge" label={count} />}
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
    )
}