import { CompanyFilterBar, TeamFilterBar } from "@components/molecules";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const team = [
    { id: 1, name: 'Billy Anderson', avatar: '/img' },
    { id: 2, name: 'Steve Wonderland', avatar: '/img' }
]

export const BottomNavigationBar = () => {
    const location = useLocation();

    const [pathname, setPathname] = useState(location.pathname)

    useEffect(() => {
        setPathname(location.pathname)
    }, [location])

    const renderToolbar = () => {
        if (pathname === '/team' || pathname === '/') return <TeamFilterBar team={team} activeMember={team[1]} />
        if (pathname === '/company') return <CompanyFilterBar />
    }

    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: '0px' }}>
            {renderToolbar()}
            <Toolbar data-testid="primary-bar" sx={{ justifyContent: 'space-between' }}>
                <Link to='/team'>TEAM</Link>
                <Link to='/add'>
                    <Add sx={{
                        position: 'absolute',
                        zIndex: 1,
                        bottom: '18px',
                        left: 0,
                        right: 0,
                        margin: '0 auto'
                    }} />
                </Link>
                <Link data-testid="link-company" to='/company'>COMPANY</Link>
            </Toolbar>
        </AppBar>
    )
}