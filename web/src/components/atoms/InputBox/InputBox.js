import { TextField } from '@mui/material'
import React from 'react'

export const InputBox = ({ label, value, handleValueChange, type = 'text' }) => (
    <div>
        <TextField sx={{
            marginBottom: '1rem',
            width: '100%'
        }} label={label} variant='outlined' type={type} value={value} onChange={(event) => handleValueChange(event.target.value)} />
    </div>
)