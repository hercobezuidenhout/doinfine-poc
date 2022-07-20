import { CompanyFilterBar, TeamFilterBar } from "@components/molecules";
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

export const BottomNavigationBar = () => {
    const location = useLocation();

    const [pathname, setPathname] = useState(location.pathname)

    useEffect(() => {
        setPathname(location.pathname)
    }, [location])

    return (
        <div>
            <div data-testid="secondary-bar">
                {pathname === '/team' || pathname === '/' && <TeamFilterBar />}
                {pathname === '/company' && <CompanyFilterBar />}
            </div>
            <div data-testid="primary-bar">
                <a href="#">TEAM</a>
                <a href="#">ADD</a>
                <Link data-testid="link-company" to='/company'>COMPANY</Link>
            </div>
        </div>
    )
}