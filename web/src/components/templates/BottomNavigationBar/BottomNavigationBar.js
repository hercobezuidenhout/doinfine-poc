import { CompanyFilterBar } from "@components/molecules";
import { TeamFilterBar } from "@components/organisms";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

export const BottomNavigationBar = () => {
    const location = useLocation()

    const [pathname, setPathname] = useState(location.pathname)

    useEffect(() => {
        setPathname(location.pathname)
    }, [location])

    const renderToolbar = () => {
        if (pathname === '/team') return <TeamFilterBar />
        if (pathname === '/leaderboard') return <CompanyFilterBar setActiveTab={(tab) => setSearchParams({ tab: tab })} />
    }

    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: '0px' }}>
            {renderToolbar()}
            <Toolbar data-testid="primary-bar" sx={{ justifyContent: 'space-between' }}>
                <Link to={`/team`}>TEAM</Link>
                <Link to='/fine'>
                    <Add sx={{
                        position: 'absolute',
                        zIndex: 1,
                        bottom: '18px',
                        left: 0,
                        right: 0,
                        margin: '0 auto'
                    }} />
                </Link>
                <Link to='/leaderboard'>LEADERBOARD</Link>
            </Toolbar>
        </AppBar>
    )
}