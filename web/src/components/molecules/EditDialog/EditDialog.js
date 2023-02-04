import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

export const EditDialog = ({ open, title, description, inputLabel, value, handleValueChange, handleClose }) => {
    const [newValue, setNewValue] = useState(value || '')

    const handleOnChange = (event) => {
        setNewValue(event.target.value)
    }

    const handleOnClick = () => {
        handleValueChange(newValue)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title ? title : 'Edit'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description ? description : 'Enter the new value'}
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    variant='standard'
                    label={inputLabel ? inputLabel : 'New Value'}
                    type='text'
                    value={value}
                    onChange={handleOnChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleOnClick}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}