import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'

export const MemberListItem = ({ member, memberRole, handleRoleChange }) => {
    const [currentRole, setCurrentRole] = useState(memberRole.role)

    const handleSelectChange = (event) => {
        const newValue = event.target.value
        setCurrentRole(newValue)
        handleRoleChange({
            userId: member.id,
            newRole: newValue
        })
    }

    return (
        <Box sx={{
            marginBottom: '1rem'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                margin: '0.5rem 0',
                alignItems: 'center'
            }}>
                <Typography key={member.fullName} variant='body1'>{member.fullName}</Typography>
                <FormControl size='small' sx={{ minWidth: 120 }}>
                    <InputLabel>Role</InputLabel>
                    <Select label='Role' value={currentRole} onChange={handleSelectChange}>
                        <MenuItem value='member'>Member</MenuItem>
                        <MenuItem value='owner'>Owner</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Divider />
        </Box>
    )
}