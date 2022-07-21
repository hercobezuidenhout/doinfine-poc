import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from '@components/organisms';
import { Outlet, useLocation } from 'react-router-dom';
import { MenuBar } from '@components/molecules';

export const App = () => {
    const [title, setTitle] = useState()
    const location = useLocation()

    useEffect(() => {
        const pathname = location.pathname
        if (pathname === '/' || pathname === '/team') setTitle('Team')
        if (pathname === '/company') setTitle('Leaderboard')
    }, [location])

    return (
        <div data-testid="app">
            <MenuBar title={title} />
            <Outlet />
            <BottomNavigationBar />
        </div>
    )
}