import React from "react"

export const TeamFilterBar = ({ team }) => (
    <div data-testid="team-filter-bar">
        {team && team.map(member => <div key={member}>{member}</div>)}
    </div>
)