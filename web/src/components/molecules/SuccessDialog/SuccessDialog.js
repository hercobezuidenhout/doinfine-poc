import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export const SuccessDialog = ({ open, title, text, handleDone }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title ? title : 'Success'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text ? text : 'Well, that was successful.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDone}>Done</Button>
            </DialogActions>
        </Dialog>
    )
}