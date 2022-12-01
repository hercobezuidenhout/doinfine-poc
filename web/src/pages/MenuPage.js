import { ActionBar } from '@components/atoms'
import { LinkListItem, SuccessDialog } from '@components/molecules'
import { OptionsBox } from '@components/organisms'
import { ChevronRight } from '@mui/icons-material'
import { Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, SwipeableDrawer, Typography } from '@mui/material'
import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import { useNotificationsContext } from '@providers/NotificationsProvider'
import { useTeamContext } from '@providers/TeamProvider'
import { useUserContext } from '@providers/UserProvider'
import { useFineRequestService } from '@services/fine-request-service'
import { usePaymentRequestService } from '@services/payment-request-service'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const MenuPage = () => {
    const nofiticiationsContext = useNotificationsContext()
    const { resetPassword, signOut } = useOuterAuthContext()
    const { getCurrentUser } = useUserContext()
    const fineRequestService = useFineRequestService()
    const paymentRequestService = usePaymentRequestService()
    const { id: teamId } = useTeamContext()
    const notificationContext = useNotificationsContext()

    const [activeFineRequests, setActiveFineRequests] = useState([])
    const [activePaymentRequests, setActivePaymentRequests] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
    };

    const fetchActiveFineRequests = async () => {
        const requests = await fineRequestService.fetchAll(teamId);
        if (!requests) return

        setActiveFineRequests(requests)
    }

    const fetchActivePaymentRequests = async () => {
        const requests = await paymentRequestService.fetchAll()
        if (!requests) return

        setActivePaymentRequests(requests)
    }

    const handleResetPasswordClick = async () => {
        await resetPassword(getCurrentUser().email)
        setIsPasswordResetSuccess(true)
    }

    useEffect(() => {
        fetchActiveFineRequests();
        fetchActivePaymentRequests();
    }, [nofiticiationsContext])

    return <div>
        <ActionBar title="Menu" link="/team" />
        <Container>
            {getCurrentUser() && <OptionsBox label={getCurrentUser().email}>
                <LinkListItem label="Reset Password" handleLinkClick={handleResetPasswordClick} />
                <LinkListItem label="Sign Out" handleLinkClick={() => signOut()} />
            </OptionsBox>
            }
            <OptionsBox label="Manage Fines">
                <LinkListItem label="View active requests" handleLinkClick={() => toggleDrawer()} />
                <LinkListItem label="Log payment" link="/payment" />
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
                    <Link to={`/fine-requests/${request.id}`}>
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
                    <Link to={`/payment-requests/${request.id}`}>
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
    </div >
}