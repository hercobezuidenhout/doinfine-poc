import { useTeamContext } from '@providers/TeamProvider'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const TeamPage = () => {
    const team = useTeamContext()
    const [searchParams] = useSearchParams()
    const [member, setMember] = useState()

    useEffect(() => {
        if (!team) return
        const teamMember = team.members.filter(x => x.id == searchParams.get('member'))[0]
        setMember(teamMember)
    }, [searchParams])

    return (
        <div>
            <h1 data-testid="team-page-title">{member && `${member.firstName} ${member.lastName}`}</h1>
        </div>
    )
}