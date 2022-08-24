import { ListItem } from '@mui/material'
import React from 'react'

export const LeaderboardItem = ({ position, name, fines }) => (
    <ListItem>
        <h4>{position ?? '#'}</h4>
        <p>{name ?? 'TeamLunch User'}</p>
        <p>{fines ?? '?'}</p>
    </ListItem>
)