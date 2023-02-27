import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ActiveAvatar } from "@components/atoms"
import { Avatar, Toolbar, Typography } from "@mui/material"
import { useTeamContext } from "@providers/TeamProvider"

export const TeamFilterBar = () => {
    const { activeTeam } = useTeamContext()
    const { id: teamId, members } = activeTeam

    const [searchParams, setSearchParams] = useSearchParams()
    const [active, setActive] = useState()

    const setActiveMember = () => {
        const id = searchParams.get('member')
        setActive(members.filter(member => member.id == id)[0])
    }

    useEffect(() => {
        setActive(members[0])
        setSearchParams({
            member: members[0].id
        })
    }, [teamId])

    useEffect(() => {
        setActiveMember()
    }, [searchParams])

    const handleAvatarClick = (id) => {
        setSearchParams({
            member: id
        })
    }

    const initials = (fullName) => {
        if (!fullName) return;
        const name = fullName.split(' ')
        if (name.length == 1) return name.shift().charAt(0)
        const initials = name.shift().charAt(0) + name.pop().charAt(0)
        return initials.toUpperCase()
    }

    return (
        <Toolbar data-testid="team-filter-bar" sx={{
            overflowX: 'auto'
        }}>
            {members && members.map(member => (
                active && member.id === active.id
                    ? (
                        <ActiveAvatar key={member.id} alt={member.name} src={member.avatar}>
                            <Typography variant='body1'>{initials(member.fullName)}</Typography>
                        </ActiveAvatar>
                    )
                    : (
                        <Avatar sx={{
                            marginRight: '0.5rem'
                        }} onClick={() => handleAvatarClick(member.id)} key={member.id} alt={member.name} src={member.avatar}>
                            <Typography variant='body1'>{initials(member.fullName)}</Typography>
                        </Avatar>
                    )
            ))}
        </Toolbar>
    )
}

