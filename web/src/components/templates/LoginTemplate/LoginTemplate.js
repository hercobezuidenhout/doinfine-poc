import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useOuterAuthContext } from '@providers/OuterAuthProvider'


export const LoginTemplate = ({ title = 'DoinFine 👌', handleSignIn, handleSignUpClick }) => {
    const authContext = useOuterAuthContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const handleEmailChange = (event) => {
        const value = event.target.value
        setEmail(value)
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value
        setPassword(value)
    }

    const signIn = async () => {
        if (!authContext) return
        const response = await authContext.signIn(email, password)
        if (!response) alert('Wrong username or password.')
        handleSignIn(response)
    }

    const resetPassword = async () => {
        authContext.resetPassword(email)
            .then(response => {
                setDialogTitle('Reset Password Link Sent')
                setDialogMessage('An link to reset your password has been sent to the email which you have given.')
            })
            .catch(error => {
                if (error.message.includes('user-not-found')) {
                    setDialogTitle('User Not Found')
                    setDialogMessage('No account with given email exists. Try signing up or contact support@doinfine.app for help.')
                }
            })
        setIsSuccess(true)
    }

    return (
        <Box sx={{
            width: 'fit-content',
            padding: '1rem'
        }}>
            <Typography sx={{
                marginBottom: '2rem'
            }} variant='h1'>{title}</Typography>
            <div>
                <TextField sx={{
                    marginBottom: '1rem',
                    width: '100%'
                }} label='Email' variant='outlined' type='email' value={email} onChange={handleEmailChange} />
            </div>
            {!isForgotPassword && (
                <div>
                    <TextField sx={{
                        marginBottom: '1rem',
                        width: '100%'
                    }} label='Password' variant='outlined' type='password' value={password} onChange={handlePasswordChange} />
                </div>
            )}
            <div>
                {authContext && !isForgotPassword && (
                    <Button disabled={email.length < 5 || password.length < 5} sx={{
                        width: '100%',
                        marginBottom: '1rem'
                    }} variant='contained' onClick={signIn}>SignIn</Button>
                )}
                {authContext && isForgotPassword && (
                    <Button disabled={email.length < 5} sx={{
                        width: '100%',
                        marginBottom: '1rem'
                    }} variant='contained' onClick={resetPassword}>Send Reset Password Link</Button>
                )}
            </div>
            <div>
                <Button onClick={handleSignUpClick} sx={{
                    width: '100%'
                }}>Sign up instead?</Button>
                <Button onClick={() => setIsForgotPassword(!isForgotPassword)} sx={{
                    width: '100%'
                }}>{isForgotPassword ? 'Back to Sign In' : 'Forgot Password?'}</Button>
            </div>
        </Box>
    )
}