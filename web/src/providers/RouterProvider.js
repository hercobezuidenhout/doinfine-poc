import React from 'react'
import { TeamPage, LeaderboardPage, MenuPage, FinePage, FineRequestPage, PaymentPage, PaymentRequestPage } from '@pages'
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
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/payment-requests/:id' element={<PaymentRequestPage />} />
            <Route path='/menu' element={<MenuPage />} />
        </Routes>
    )
}