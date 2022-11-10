import { Chip, Toolbar } from "@mui/material"
import React from "react"
import { useSearchParams } from "react-router-dom"

export const CompanyFilterBar = ({ setActiveTab }) => (
    <Toolbar data-testid="company-filter-bar">
        <Chip sx={{
            color: 'white',
            marginRight: '1rem'
        }} label="Users" variant="outlined" onClick={() => setActiveTab('users')} />
        <Chip sx={{
            color: 'white'
        }} label="Teams" variant="outlined" onClick={() => setActiveTab('teams')} />
    </Toolbar>
)
