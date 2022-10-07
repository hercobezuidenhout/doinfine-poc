import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export const ConfirmationDialog = ({ open, title, text, handleClose, handleConfirm }) => {

    return (
        <Dialog open={open}>
            <DialogTitle>{title ? title : 'Please Confirm'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text ? text : 'Are you sure you want to do this?'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}