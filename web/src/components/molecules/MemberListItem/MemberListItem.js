import { Delete } from '@mui/icons-material'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'

export const MemberListItem = ({ member, memberRole, handleRoleChange, handleRemoveClick }) => {
    const [currentRole, setCurrentRole] = useState(memberRole.role)
    const [confirmRemove, setConfirmRemove] = useState(false)

    const handleSelectChange = (event) => {
        const newValue = event.target.value
        setCurrentRole(newValue)
        handleRoleChange({
            userId: member.id,
            newRole: newValue
        })
    }

    const handleConfirm = () => {
        setConfirmRemove(true)
        handleRemoveClick()
    }

    return (
        <>

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
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <FormControl size='small' sx={{ minWidth: 120 }}>
                            <InputLabel>Role</InputLabel>
                            <Select label='Role' value={currentRole} onChange={handleSelectChange}>
                                <MenuItem value='member'>Member</MenuItem>
                                <MenuItem value='owner'>Owner</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={() => setConfirmRemove(true)} sx={{ marginLeft: '0.2rem' }}>
                            <Delete fontSize='small' />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
            </Box>
            <ConfirmationDialog
                open={confirmRemove}
                handleClose={() => setConfirmRemove(false)}
                handleConfirm={handleConfirm}
                text={`Are you sure you want to remove ${member.fullName}?`}
            />
        </>
    )
}