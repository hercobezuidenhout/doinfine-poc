import { Divider, List, ListItem } from '@mui/material'
import { useTeamContext } from '@providers/TeamProvider'
import { useFineService } from '@services/fine-service'
import React, { useEffect, useState, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'

export const TeamPage = () => {
    const teamContext = useTeamContext()
    const [searchParams] = useSearchParams()
    const fineService = useFineService()
    const [member, setMember] = useState()
    const [fines, setFines] = useState([])

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
        if (searchParams.get('member')) {
            const teamMember = teamContext.members.filter(x => x.id == searchParams.get('member'))[0]
            setMember(teamMember)
        } else {
            const teamMember = teamContext.members[0]
            setMember(teamMember)
            searchParams.set('member', teamMember.id)
        }
    }, [searchParams, teamContext])

    return (
        <div>
            <h1 data-testid="team-page-title">{member && `${member.fullName}` || 'Team Member'}</h1>
            <List>
                {fines && fines.map(fine => (
                    <Fragment key={fine.id}>
                        <ListItem sx={{
                            padding: '1.2rem 0'
                        }}>
                            {fine.reason}
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
        </div>
    )
}