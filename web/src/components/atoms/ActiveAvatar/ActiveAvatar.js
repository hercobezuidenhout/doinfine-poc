import React from 'react'
import { Avatar, useTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const ActiveAvatar = ({ alt, src, children }) => {
    const theme = useTheme()

    return (
        <Avatar data-testid="styled-avatar" sx={{
            border: `4px solid ${theme.palette.primary.light}`,
            marginRight: '0.5rem'
        }} alt={alt} src={src}>{children}</Avatar>
    )
}
