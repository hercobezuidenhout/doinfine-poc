import { InputBox } from '@components/atoms'
import { Box, Button, Typography } from '@mui/material'
import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import { useUserService } from '@services/user-service'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CreateAccountPage = () => {
    const authContext = useOuterAuthContext()
    const userService = useUserService()
    const navigate = useNavigate()

    const [fullName, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const signUp = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!')
            return
        }

        const { accessToken } = await authContext.signUp(email, password)
        const response = await userService.createUser(fullName, accessToken)

        if (!response) alert('Failed creating account')

        navigate('/')
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
                <InputBox label='Fullname' value={fullName} handleValueChange={(value) => setFullname(value)} />
                <InputBox label='Email' type='email' value={email} handleValueChange={(value) => setEmail(value)} />
                <InputBox label='Password' type='password' value={password} handleValueChange={(value) => setPassword(value)} />
                <InputBox label='Confirm Password' type='password' value={confirmPassword} handleValueChange={(value) => setConfirmPassword(value)} />

                <Button disabled={email.length < 5 || password.length < 5} sx={{
                    width: '100%',
                    marginBottom: '1rem'
                }} variant='contained' onClick={signUp}>SignIn</Button>

                <Button sx={{
                    width: '100%'
                }}>Back To Sign In</Button>

            </Box>
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