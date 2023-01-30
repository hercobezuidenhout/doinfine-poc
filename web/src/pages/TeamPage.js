import { Box, Button, Divider, List, ListItem, Skeleton, Typography } from '@mui/material'
import { useTeamContext } from '@providers/TeamProvider'
import { useUserContext } from '@providers/UserProvider'
import React, { useEffect, useState, Fragment } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export const TeamPage = () => {
    const { members } = useTeamContext().activeTeam
    const { userId } = useUserContext()

    const [searchParams] = useSearchParams()
    const [member, setMember] = useState()
    const [fines, setFines] = useState()

    const fetchFines = async () => {
        if (!member) return
        setFines(undefined)

        const userFines = member.fines

        setFines(userFines)
    }

    useEffect(() => {
        fetchFines()
    }, [member])

    useEffect(() => {
        if (searchParams.get('member')) {
            const teamMember = members.filter(x => x.id == searchParams.get('member'))[0]
            setMember(teamMember)
        } else {
            let teamMember = undefined
            teamMember = members[0]

            setMember(teamMember)
            searchParams.set('member', teamMember.id)
        }
    }, [searchParams])

    const renderFines = () => {
        return fines.length > 0 ? fines.map((fine, index) => (
            <Fragment key={index}>
                <ListItem sx={{
                    padding: '1.2rem 0'
                }}>
                    For {fine.reason}
                </ListItem>
                <Divider />
            </Fragment>
        )) : (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '10rem 0'
            }}>
                <Box sx={{ textAlign: 'center ' }}>
                    <Typography variant='h1'>🎉</Typography>
                    <Typography variant='body1'>No fines to show</Typography>
                </Box>
            </Box>
        )
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 data-testid="team-page-title">{member ? member.fullName : <Skeleton variant='text' width={300} sx={{ fontSize: '3rem ' }} />}</h1>
                {member && (member.id == userId) && <Link to='/payment'><Button variant='outlined'>Log Payment</Button></Link>}
            </Box>
            <List>
                {fines
                    ? renderFines()
                    : (
                        <>
                            <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                            <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                            <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                        </>
                    )
                }
            </List>
        </div >
    )
}