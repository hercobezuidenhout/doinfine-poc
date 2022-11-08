import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material'
import { useAuthContext } from '@providers/AuthProvider'
import React, { useState } from 'react'

export const LoginPage = () => {
    const authContext = useAuthContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        if (!response) console.log('login failed')
    }

    return (
        <Box sx={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: 'fit-content',
                padding: '1rem'
            }}>
                <Typography sx={{
                    marginBottom: '2rem'
                }} variant='h1'>DoinFine 👌</Typography>
                <div>
                    <TextField sx={{
                        marginBottom: '1rem',
                        width: '100%'
                    }} label='Email' variant='outlined' type='email' value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <TextField sx={{
                        marginBottom: '1rem',
                        width: '100%'
                    }} label='Password' variant='outlined' type='password' value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    {authContext && <Button sx={{
                        width: '100%',
                        marginBottom: '1rem'
                    }} variant='contained' onClick={signIn}>SignIn</Button>}
                </div>
                <div>
                    <Button sx={{
                        width: '100%'
                    }}>Forgot Password?</Button>
                </div>
            </Box>
        </Box>
    )
}