import { BottomNavigationBar } from '@components/molecules';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const App = () => (
    <div>
        <Outlet />
        <BottomNavigationBar />
    </div>
);