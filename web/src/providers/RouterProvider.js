import { TeamPage, LeaderboardPage } from '@pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from '../App';

export const RouterProvider = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="team/:id" element={<TeamPage />} />
                    <Route path="leaderboard" element={<LeaderboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}