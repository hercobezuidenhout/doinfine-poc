import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ActiveAvatar } from "@components/atoms"
import { Avatar, Toolbar, Typography } from "@mui/material"
import { useTeamContext } from "@providers/TeamProvider"

export const TeamFilterBar = () => {
    const team = useTeamContext()

    const [searchParams, setSearchParams] = useSearchParams()
    const [active, setActive] = useState()

    const setActiveMember = () => {
        if (!team) return
        const id = searchParams.get('member')
        setActive(team.members.filter(member => member.id == id)[0])
    }

    useEffect(() => {
        if (!team) return
        setActive(team.members[0])
        setSearchParams({
            member: team.members[0].id
        })
    }, [team])

    useEffect(() => {
        setActiveMember()
    }, [searchParams])

    const handleAvatarClick = (id) => {
        setSearchParams({
            member: id
        })
    }

    const initials = (fullName) => {
        const name = fullName.split(' ')
        const initials = name.shift().charAt(0) + name.pop().charAt(0)
        return initials.toUpperCase()
    }

    return (
        <Toolbar data-testid="team-filter-bar" sx={{
            overflowX: 'auto'
        }}>
            {team && team.members.map(member => (
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

