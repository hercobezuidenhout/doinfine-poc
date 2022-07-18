import { TeamFilterBar } from "@components/molecules";
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const BottomNavigationBar = () => {
    const location = useLocation();

    const [pathname, setPathname] = useState(location.pathname)

    useEffect(() => {
        setPathname(location.pathname)
    }, [location])

    return (
        <div>
            <div data-testid="secondary-bar">
                {pathname == 'team' && <TeamFilterBar />}
            </div>
            <div data-testid="primary-bar">
                <a href="#">TEAM</a>
                <a href="#">ADD</a>
                <a href="#">COMPANY</a>
            </div>
        </div>
    )
}