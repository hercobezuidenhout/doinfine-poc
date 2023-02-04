import { ActionBar } from '@components/atoms'
import { ConfirmationDialog, LinkListItem, SuccessDialog } from '@components/molecules'
import { OptionsBox } from '@components/organisms'
import { Add, ChevronRight } from '@mui/icons-material'
import { Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@mui/material'
import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import { useNotificationsContext } from '@providers/NotificationsProvider'
import { useUserContext } from '@providers/UserProvider'
import { useFineRequestService } from '@services/fine-request-service'
import { usePaymentRequestService } from '@services/payment-request-service'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSpaceContext } from '@providers/SpaceProvider'
import { useTeamContext } from '@providers/TeamProvider'
import { useTeamService } from '@services/team-service'
import { isDevelopment, isTest } from '../config'

export const MenuPage = () => {
    const nofiticiationsContext = useNotificationsContext()
    const { resetPassword, signOut } = useOuterAuthContext()
    const { userId, email } = useUserContext()
    const fineRequestService = useFineRequestService()
    const paymentRequestService = usePaymentRequestService()
    const teamService = useTeamService()
    const { activeSpace, spaces, switchSpace } = useSpaceContext()
    const { activeTeam, userIsOwner } = useTeamContext()
    const navigate = useNavigate()

    const [activeFineRequests, setActiveFineRequests] = useState([])
    const [activePaymentRequests, setActivePaymentRequests] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [showSpacesDrawer, setShowSpacesDrawer] = useState(false)
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false)
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [confirmLeaveTeam, setConfirmLeaveTeam] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
    };

    const fetchActiveFineRequests = async () => {
        const requests = await fineRequestService.fetchAll();
        if (!requests) return

        setActiveFineRequests(requests)
    }

    const fetchActivePaymentRequests = async () => {
        const requests = await paymentRequestService.fetchAll()
        if (!requests) return

        setActivePaymentRequests(requests)
    }

    const handleResetPasswordClick = async () => {
        await resetPassword(email)
        setIsPasswordResetSuccess(true)
    }

    const handleSpacesDrawerClose = () => {
        setShowSpacesDrawer(false)
    }

    const handleSpaceClick = async (newSpace) => {
        await switchSpace(newSpace)
        setShowSpacesDrawer(false)
    }

    const handleInviteTeamClick = async () => {
        const inviteLinkBase = isDevelopment()
            ? 'http://localhost:3000/invite'
            : (
                isTest() ? 'https://test.doinfine.app/invite' : 'https://doinfine.app/invite'
            )

        const inviteLink = `${inviteLinkBase}/${activeSpace.id}/${activeTeam.id}`

        if (navigator.share) {
            await navigator.share({
                title: 'Invite team members',
                text: 'Join DoinFine!',
                url: inviteLink
            })
        } else {
            navigator.clipboard.writeText(inviteLink).then(() => {
                setShowCopySuccess(true)
            })
        }
    }

    const handleLeaveTeamClick = async () => {
        await teamService.leave(activeTeam.id)
        const userStorage = JSON.parse(localStorage.getItem(userId))
        userStorage.activeTeam = undefined
        localStorage.setItem(userId, JSON.stringify(userStorage))
        navigate(0)
    }

    useEffect(() => {
        fetchActiveFineRequests();
        fetchActivePaymentRequests();
    }, [nofiticiationsContext])

    return <div>
        <ActionBar title="Menu" link="/fines" />
        <Container>
            {email && <OptionsBox label={email}>
                <LinkListItem label="Reset Password" handleLinkClick={handleResetPasswordClick} />
                <LinkListItem label="Sign Out" handleLinkClick={() => signOut()} />
            </OptionsBox>
            }
            <OptionsBox label="Manage Fines">
                <LinkListItem label="View active requests" handleLinkClick={() => toggleDrawer()} />
                <LinkListItem label="Log payment" link="/payment" />
            </OptionsBox>
            <OptionsBox label={activeSpace.name ? activeSpace.name : 'Space'}>
                <LinkListItem label="Switch Space" handleLinkClick={() => setShowSpacesDrawer(true)} />
            </OptionsBox>
            <OptionsBox label={activeTeam.name ? activeTeam.name : 'Team'}>
                {userIsOwner() && <LinkListItem label="Manage Team" handleLinkClick={() => navigate(`/teams/${activeTeam.id}/manage`)} />}
                <LinkListItem label="Invite members" handleLinkClick={handleInviteTeamClick} />
                <LinkListItem label="Leave team" handleLinkClick={() => setConfirmLeaveTeam(true)} />
            </OptionsBox>
            <Box sx={{
                display: 'flex',
                justifyContent: 'end'
            }}>
                <Typography variant='caption'>v{require('../../package.json').version}</Typography>
            </Box>
        </Container>
        <SuccessDialog open={isPasswordResetSuccess} title='Password Reset Link Sent' text='A link to reset your password has been sent to your email.' handleDone={() => setIsPasswordResetSuccess(false)} />
        <Drawer
            anchor='bottom'
            open={drawerOpen}
            onClose={() => toggleDrawer()}>
            <List>
                {activeFineRequests.map((request, index) => (
                    <Link key={index} to={`/fine-requests/${request.id}`}>
                        <ListItemButton sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} key={index}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Typography variant='p'>{`Fine for ${request.finee}`}</Typography>
                            </Box>

                            <IconButton>
                                <ChevronRight />
                            </IconButton>
                        </ListItemButton>
                    </Link>
                ))}
                {activePaymentRequests.map((request, index) => (
                    <Link key={index} to={`/payment-requests/${request.id}`}>
                        <ListItemButton sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} key={index}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Typography variant='p'>{`Payment request for ${request.fullName}`}</Typography>
                            </Box>

                            <IconButton>
                                <ChevronRight />
                            </IconButton>

                        </ListItemButton>
                    </Link>
                ))}
                {!activeFineRequests.length && !activePaymentRequests.length &&
                    <Box sx={{
                        padding: '2rem',
                        textAlign: 'center'
                    }}>
                        <Typography variant='h4'>No active fine requests</Typography>
                    </Box>
                }
            </List>
        </Drawer>
        <Drawer
            anchor='bottom'
            open={showSpacesDrawer}
            onClose={handleSpacesDrawerClose}>
            <Box sx={{
                padding: '1rem'
            }}>
                <Typography variant='h6'>Switch Space</Typography>
                <List>
                    {spaces.filter(space => space.id !== activeSpace.id).map((space, index) => (
                        <ListItemButton key={index} onClick={() => handleSpaceClick(space)}>
                            <ListItemText primary={space.name} />
                        </ListItemButton>
                    ))}
                    <Link to='/create/space'>
                        <ListItemButton>
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary='Create New Space' />
                        </ListItemButton>
                    </Link>
                </List>
            </Box>
        </Drawer>
        <SuccessDialog open={showCopySuccess} title='Invite To Team' text='The invite link has been copied to your clipboard.' handleDone={() => setShowCopySuccess(false)} />
        <ConfirmationDialog open={confirmLeaveTeam} title='Leave Team' text={`Are you sure you want to leave ${activeTeam.name}`} handleClose={() => setConfirmLeaveTeam(false)} handleConfirm={handleLeaveTeamClick} />
    </div>
}