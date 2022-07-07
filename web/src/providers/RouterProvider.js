import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Team, Company, Account, Fine, Payment } from '@pages';

export const RouterProvider = ({ children, setToolbar = () => {}, setTitle = () => {} }) => {
    const handleSetToolbar = (innerToolbar) => setToolbar(innerToolbar)
    const handleSetTitle = (title) => setTitle(title)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Team setToolbar={handleSetToolbar} setTitle={handleSetTitle} />} />
                <Route path="/app"></Route>
                
                <Route path="/team" element={<Team setToolbar={handleSetToolbar} setTitle={handleSetTitle} />} />
                <Route path="/company" element={<Company setToolbar={handleSetToolbar} setTitle={handleSetTitle} />} />
                <Route path="/account" element={<Account />} />
                <Route path="/fine" element={<Fine />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
            {children}
        </BrowserRouter>
    )
}