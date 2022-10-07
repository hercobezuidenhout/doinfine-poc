import { ActionBar } from '@components/atoms'
import { LinkListItem } from '@components/molecules'
import { OptionsBox } from '@components/organisms'
import { ChevronRight } from '@mui/icons-material'
import { Box, Drawer, IconButton, List, ListItem, SwipeableDrawer, Typography } from '@mui/material'
import { useAuthContext } from '@providers/AuthProvider'
import { useNotificationsContext } from '@providers/NotificationsProvider'
import { useFineRequestService } from '@services/fine-request-service'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const MenuPage = () => {
    const nofiticiationsContext = useNotificationsContext()
    const authContext = useAuthContext()
    const fineRequestService = useFineRequestService()

    const [activeFineRequests, setActiveFineRequests] = useState([])
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
    };

    const fetchActiveFineRequests = async () => {
        const requests = await fineRequestService.fetchAll();
        if (!requests) return

        setActiveFineRequests(requests)
    }

    const editProfile = () => {
        if (!authContext) return

        authContext.editProfile()
    }

    useEffect(() => {
        fetchActiveFineRequests();
    }, [nofiticiationsContext])

    return <div>
        <ActionBar title="Menu" link={-1} />
        <OptionsBox label="Account">
            <LinkListItem label="billy@example.com" handleLinkClick={editProfile} />
        </OptionsBox>
        <OptionsBox label="Manage Fines">
            <LinkListItem label="View active requests" handleLinkClick={() => toggleDrawer()} />
            <LinkListItem label="Log payment" link="/payment" />
        </OptionsBox>
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
                {!activeFineRequests.length &&
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