import { SignUpTemplate } from '@components/templates'
import { Box } from '@mui/material'

import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CreateAccountPage = () => {
    const navigate = useNavigate()

    const handleSignUp = (response, accessToken) => {
        navigate('/')
    }

    const handleSignInClick = () => {
        navigate('/login')
    }

    return (
        <Box sx={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <SignUpTemplate handleSignUp={handleSignUp} handleSignInClick={handleSignInClick} />
            {/* <SuccessDialog
                open={isSuccess}
                title={dialogTitle}
                text={dialogMessage}
                handleDone={() => {
                    setIsForgotPassword(false)
                    setIsSuccess(false)
                }} /> */}
        </Box >
    )
}