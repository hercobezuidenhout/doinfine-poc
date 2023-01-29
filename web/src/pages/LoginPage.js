import { SuccessDialog } from '@components/molecules'
import { LoginTemplate } from '@components/templates'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const navigate = useNavigate()

    const handleSignIn = (signInResponse) => {
        navigate('/')
    }

    const handleSignUpClick = () => {
        navigate('/signup')
    }

    return (
        <Box sx={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <LoginTemplate handleSignIn={handleSignIn} handleSignUpClick={handleSignUpClick} />
        </Box>
    )
}