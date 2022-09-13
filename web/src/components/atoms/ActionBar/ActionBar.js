import { Close } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const ActionBar = ({ title, link }) => (
    <AppBar position='sticky'>
        <Toolbar sx={{
            justifyContent: 'space-between'
        }}>
            <Typography>{title ? title : "Doin' Fine 👌"}</Typography>
            {link &&
                <Link to={link}>
                    <IconButton sx={{
                        color: 'white'
                    }}>
                        <Close />
                    </IconButton>
                </Link>
            }
        </Toolbar>
    </AppBar>
)