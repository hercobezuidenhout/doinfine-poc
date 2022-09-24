import { TeamPage, LeaderboardPage, MenuPage } from '@pages'
import { FinePage } from '@pages/FinePage'
import { FineRequestPage } from '@pages/FineRequestPage'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from '../App'

export const RouterProvider = () => {
    return (
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='team' element={<TeamPage />} />
                <Route path='leaderboard' element={<LeaderboardPage />} />
            </Route>
            <Route path='/fine' element={<FinePage />} />
            <Route path='/fine-requests/:id' element={<FineRequestPage />} />
            <Route path='/menu' element={<MenuPage />} />
        </Routes>
    )
}