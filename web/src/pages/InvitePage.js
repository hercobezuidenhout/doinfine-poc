import { LoginTemplate, SignUpTemplate } from '@components/templates'
import { Box, Button, Drawer, Typography } from '@mui/material'
import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import { useInviteService } from '@services/invites-service'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const InvitePage = () => {
    const navigate = useNavigate()
    const { space, team } = useParams()
    const { currentUser } = useOuterAuthContext()
    const { fetchSpaceName, fetchTeamName, acceptSpaceInvite, acceptTeamInvite } = useInviteService()
    const [spaceName, setSpaceName] = useState()
    const [teamName, setTeamName] = useState()
    const [openLoginDrawer, setOpenLoginDrawer] = useState(false)
    const [openSignUpDrawer, setOpenSignUpDrawer] = useState(false)

    const handleSignIn = (signInResponse) => {
        if (!signInResponse) {
            alert('Something went wrong with sign in.')
            return
        }
        setOpenLoginDrawer(false)
    }

    const handleSignUp = (signUpResponse, accessToken) => {
        if (!signUpResponse) {
            alert('Something went wrong with creating an account.')
            return
        }

        setOpenSignUpDrawer(false)
    }

    const openSignUpDrawerClick = () => {
        setOpenSignUpDrawer(true)
        setOpenLoginDrawer(false)
    }

    const openSignInDrawerClick = () => {
        setOpenSignUpDrawer(false)
        setOpenLoginDrawer(true)
    }

    const fetchInviteDetails = async () => {
        if (space && team) {
            const fetchSpaceResponse = await fetchSpaceName(space, currentUser.accessToken)
            if (!fetchSpaceResponse) return
            setSpaceName(fetchSpaceResponse)

            const fetchTeamResponse = await fetchTeamName(space, team, currentUser.accessToken)
            if (!fetchTeamResponse) return
            setTeamName(fetchTeamResponse)
        } else if (space) {
            const fetchSpaceResponse = await fetchSpaceName(space, currentUser.accessToken)
            if (!fetchSpaceResponse) return
            setSpaceName(fetchSpaceResponse)
        } else {
            alert('Invalid invite.')
        }
    }

    const acceptInvite = async () => {
        if (space && team) {
            const response = await acceptTeamInvite(space, team, currentUser.uid, currentUser.accessToken)
            if (!response) {
                alert('Failed joining team')
                return
            }
            navigate('/')
        } else if (space) {
            const response = await acceptSpaceInvite(space, currentUser.uid, currentUser.accessToken)
            if (!response) {
                alert('Failed joining space')
                return
            }
            navigate('/')
        } else {
            alert('Invalid invite.')
        }
    }

    const declineInvite = () => { }

    const inviteIsReady = () => currentUser && currentUser.accessToken && spaceName

    useEffect(() => {
        if (currentUser === undefined) return
        if (currentUser === null) {
            setOpenLoginDrawer(true)
            return
        }

        setOpenLoginDrawer(false)
        setOpenSignUpDrawer(false)
        if (currentUser.accessToken) fetchInviteDetails()
    }, [currentUser])

    return (
        <div>
            {inviteIsReady() &&
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '60vh',
                    justifyContent: 'space-around',
                    textAlign: 'center'
                }}>
                    <Box sx={{
                        width: '60%',
                    }}>
                        {team
                            ? (
                                <Typography variant='h2'>You are invited to join the <b>{teamName}</b> team in the <b>{spaceName}</b> space.</Typography>
                            )
                            : (
                                <Typography variant='h2'>You are invited to join the <b>{spaceName}</b> space.</Typography>
                            )
                        }
                        <Box sx={{
                            marginTop: '2rem'
                        }}>
                            <Button variant='outlined' sx={{
                                marginRight: '1rem'
                            }} onClick={declineInvite}>Decline</Button>
                            <Button variant='contained' onClick={acceptInvite}>Accept</Button>
                        </Box>
                    </Box>
                </Box>
            }

            <Drawer anchor='bottom' open={openLoginDrawer} onClose={() => setOpenLoginDrawer(false)}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2rem 0rem'
                }}>
                    <LoginTemplate title='Sign in to join' handleSignIn={handleSignIn} handleSignUpClick={openSignUpDrawerClick} />
                </Box>
            </Drawer>

            <Drawer anchor='bottom' open={openSignUpDrawer}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2rem 0rem'
                }}>
                    <SignUpTemplate title='Sign up to join' handleSignUp={handleSignUp} handleSignInClick={openSignInDrawerClick} />
                </Box>
            </Drawer>
        </div>
    )
}