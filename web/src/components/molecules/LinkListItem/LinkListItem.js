import { ChevronRight } from '@mui/icons-material'
import { IconButton, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const LinkListItem = ({ label, link }) => {
    return (
        <ListItem sx={{
            justifyContent: 'space-between'
        }}>
            <Typography variant='p'>{label}</Typography>
            <Link to={link}>
                <IconButton>
                    <ChevronRight />
                </IconButton>
            </Link>
        </ListItem>
    )
}