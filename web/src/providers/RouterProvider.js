import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { App } from '../App';

export const RouterProvider = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index path="team" element={<div>Team Page</div>} />
                    <Route path="company" element={<div>Company Page</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}