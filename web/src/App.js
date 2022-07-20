import React from 'react';
import { BottomNavigationBar } from '@components/organisms';
import { Outlet } from 'react-router-dom';

export const App = () => {
    return (
        <div data-testid="app">
            <Outlet />
            <BottomNavigationBar />
        </div>
    )
}