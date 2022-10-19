import { Box, Button, Divider, List, ListItem, Skeleton } from '@mui/material'
import { useAuthContext } from '@providers/AuthProvider'
import { useTeamContext } from '@providers/TeamProvider'
import { useFineService } from '@services/fine-service'
import React, { useEffect, useState, Fragment } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export const TeamPage = () => {
    const teamContext = useTeamContext()
    const authContext = useAuthContext()

    const [searchParams] = useSearchParams()
    const fineService = useFineService()
    const [member, setMember] = useState()
    const [fines, setFines] = useState()

    const fetchFines = async () => {
        if (!member) return
        const userFines = await fineService.fetchById(member.id)
        setFines(userFines)
    }

    useEffect(() => {
        fetchFines()
    }, [member])

    useEffect(() => {
        if (!teamContext) return
        setFines(undefined)
        if (searchParams.get('member')) {
            const teamMember = teamContext.members.filter(x => x.id == searchParams.get('member'))[0]
            setMember(teamMember)
        } else {
            let teamMember = undefined

            if (authContext) {
                teamMember = teamContext.members.filter(x => x.id == authContext.getCurrentUserId())[0]
            } else {
                teamMember = teamContext.members[0]
            }

            setMember(teamMember)
            searchParams.set('member', teamMember.id)
        }
    }, [searchParams, teamContext])

    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 data-testid="team-page-title">{member ? member.fullName : <Skeleton variant='text' width={300} sx={{ fontSize: '3rem ' }} />}</h1>
                {member && (member.id == authContext.getCurrentUserId()) && <Link to='/payment'><Button variant='outlined'>Log Payment</Button></Link>}
            </Box>
            <List>
                {fines ? fines.map(fine => (
                    <Fragment key={fine.id}>
                        <ListItem sx={{
                            padding: '1.2rem 0'
                        }}>
                            {fine.reason}
                        </ListItem>
                        <Divider />
                    </Fragment>
                )) :
                    <>
                        <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                        <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                        <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                    </>
                }
            </List>
        </div>
    )
}