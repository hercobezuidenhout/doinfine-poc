import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Account, Fine, Payment } from '@pages';
import { App } from '@containers/App';
import { Settings } from '@containers/Settings';
import { Auth } from '@containers/Auth';
import { Team } from '@pages/Team';
import { Company } from '@pages/Company';

export const RouterProvider = () => {

    const handleSetToolbar = (toolbar) => { }

    const handleSetTitle = (title) => { }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
                <Route path="/settings" element={<Settings />}>
                    <Route path="account" element={<Account />} />
                </Route>
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}