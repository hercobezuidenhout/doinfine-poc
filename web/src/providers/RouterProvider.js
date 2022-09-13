import { TeamPage, LeaderboardPage } from '@pages'
import { FinePage } from '@pages/FinePage'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from '../App'

export const RouterProvider = () => {
    return (
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='team/:id' element={<TeamPage />} />
                <Route path='leaderboard' element={<LeaderboardPage />} />
            </Route>
            <Route path='/fine' element={<FinePage />} />
        </Routes>
    )
}