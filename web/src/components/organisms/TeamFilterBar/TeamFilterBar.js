import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ActiveAvatar } from "@components/atoms"
import { Avatar, Toolbar } from "@mui/material"
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
    }, [team]) 

    useEffect(() => {
        setActiveMember()
    }, [searchParams])

    const handleAvatarClick = (id) => {
        setSearchParams({
            member: id
        })
    }

    return (
        <Toolbar data-testid="team-filter-bar">
            {team && team.members.map(member => (
                active && member.id === active.id
                    ? <ActiveAvatar key={member.id} alt={member.name} src={member.avatar} />
                    : <Avatar sx={{
                        marginRight: '0.5rem'
                    }} onClick={() => handleAvatarClick(member.id)} key={member.id} alt={member.name} src={member.avatar} />
            ))}
        </Toolbar>
    )
}

