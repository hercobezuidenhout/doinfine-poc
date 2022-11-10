import { ActionBar } from '@components/atoms'
import { LinkListItem, SuccessDialog } from '@components/molecules'
import { OptionsBox } from '@components/organisms'
import { ChevronRight } from '@mui/icons-material'
import { Box, Drawer, IconButton, List, ListItem, SwipeableDrawer, Typography } from '@mui/material'
import { useAuthContext } from '@providers/AuthProvider'
import { useNotificationsContext } from '@providers/NotificationsProvider'
import { useFineRequestService } from '@services/fine-request-service'
import { usePaymentRequestService } from '@services/payment-request-service'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const MenuPage = () => {
    const nofiticiationsContext = useNotificationsContext()
    const authContext = useAuthContext()
    const fineRequestService = useFineRequestService()
    const paymentRequestService = usePaymentRequestService()

    const [activeFineRequests, setActiveFineRequests] = useState([])
    const [activePaymentRequests, setActivePaymentRequests] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState()

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

    const editProfile = () => {
        if (!authContext) return

        authContext.editProfile()
    }

    useEffect(() => {
        fetchActiveFineRequests();
        fetchActivePaymentRequests();
    }, [nofiticiationsContext])

    return <div>
        <ActionBar title="Menu" link="/team" />
        <OptionsBox label="Account">
            <LinkListItem label="Edit Profile" handleLinkClick={editProfile} />
            <LinkListItem label="Reset Password" handleLinkClick={async () => {
                console.log('click')
                await authContext.resetPassword(authContext.getCurrentEmail())
                console.log('done')
                setIsPasswordResetSuccess(true)
            }
            } />
            <LinkListItem label="Sign Out" handleLinkClick={() => authContext.signOut()} />
        </OptionsBox>
        <OptionsBox label="Manage Fines">
            <LinkListItem label="View active requests" handleLinkClick={() => toggleDrawer()} />
            <LinkListItem label="Log payment" link="/payment" />
        </OptionsBox>
        <SuccessDialog open={isPasswordResetSuccess} title='Password Reset Link Sent' text='A link to reset your password has been sent to your email.' handleDone={() => setIsPasswordResetSuccess(false)} />
        <Drawer
            anchor='bottom'
            open={drawerOpen}
            onClose={() => toggleDrawer()}>
            <List>
                {activeFineRequests.map((request, index) => (
                    <ListItem sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} key={index}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Typography variant='p'>{`Fine for ${request.fullName}`}</Typography>
                        </Box>
                        <Link to={`/fine-requests/${request.id}`}>
                            <IconButton>
                                <ChevronRight />
                            </IconButton>
                        </Link>
                    </ListItem>
                ))}
                {activePaymentRequests.map((request, index) => (
                    <ListItem sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} key={index}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Typography variant='p'>{`Payment request for ${request.fullName}`}</Typography>
                        </Box>
                        <Link to={`/payment-requests/${request.id}`}>
                            <IconButton>
                                <ChevronRight />
                            </IconButton>
                        </Link>
                    </ListItem>
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