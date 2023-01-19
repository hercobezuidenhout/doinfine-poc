import { TextField } from '@mui/material'
import React from 'react'

export const InputBox = ({ value, handleValueChange }) => (
    <div>
        <TextField sx={{
            marginBottom: '1rem',
            width: '100%'
        }} label='Email' variant='outlined' type='email' value={value} onChange={handleValueChange} />
    </div>
)