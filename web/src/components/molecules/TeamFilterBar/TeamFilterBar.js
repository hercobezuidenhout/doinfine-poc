import { ActiveAvatar } from "@components/atoms"
import { Avatar, Toolbar } from "@mui/material"
import React from "react"

export const TeamFilterBar = ({ team, activeMember = {} }) => (
    <Toolbar data-testid="team-filter-bar">
        {team && team.map(member => (
            member.id === activeMember.id
                ? <ActiveAvatar key={member.id} alt={member.name} src={member.avatar} />
                : <Avatar sx={{
                    marginRight: '0.5rem'
                }} key={member.id} alt={member.name} src={member.avatar} />
        ))}
    </Toolbar>
)