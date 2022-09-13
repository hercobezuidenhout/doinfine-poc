import { Typography } from '@mui/material'
import React from 'react'

export const InfoBox = ({ title, children }) => (
    <div>
        <Typography variant='h1'>{title}</Typography>
        <Typography variant='body1'>{children}</Typography>
    </div>
)