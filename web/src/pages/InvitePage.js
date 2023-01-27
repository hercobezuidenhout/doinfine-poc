import { LoginTemplate } from '@components/templates'
import { Box, Drawer } from '@mui/material'
import { useOuterAuthContext } from '@providers/OuterAuthProvider'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const InvitePage = () => {
    const { space, team } = useParams()
    const { currentUser } = useOuterAuthContext()
    const [openLoginDrawer, setOpenLoginDrawer] = useState(false)

    const handleSignIn = (signInResponse) => {
        console.log(signInResponse)
    }

    useEffect(() => {
        if (currentUser === undefined) return
        if (currentUser === null) {
            setOpenLoginDrawer(true)
            return
        }

        setOpenLoginDrawer(false)
    }, [currentUser])

    return (
        <div>
            <h1>Invite Page</h1>
            <p>Space: {space}</p>
            <p>Team: {team}</p>
            {currentUser && <p>currentUser: {currentUser.uid}</p>}

            <Drawer anchor='bottom' open={openLoginDrawer} onClose={() => setOpenLoginDrawer(false)}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2rem 0rem'
                }}>
                    <LoginTemplate title='Sign In to Join' handleSignIn={handleSignIn} />
                </Box>
            </Drawer>
        </div>
    )
}