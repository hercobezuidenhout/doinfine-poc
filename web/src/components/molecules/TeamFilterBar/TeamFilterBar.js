import { Avatar, Toolbar } from "@mui/material"
import React from "react"

export const TeamFilterBar = ({ team }) => (
    <Toolbar data-testid="team-filter-bar">
        {team && team.map(member => <Avatar key={member.id} alt={member.name} src={member.avatar} />)}
    </Toolbar>
)