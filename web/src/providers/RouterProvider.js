import React from 'react'
import { TeamPage, LeaderboardPage, MenuPage, FinePage, FineRequestPage, PaymentPage, PaymentRequestPage } from '@pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from '../Dashboard'
import { App } from '../App'
import { LoginPage } from '@pages/LoginPage'
import { CreateAccountPage } from '@pages/CreateAccountPage'
import { CreateSpacePage } from '@pages/CreateSpacePage'
import { Space } from '../Space'
import { CreateTeamPage } from '@pages/CreateTeamPage'
import { Team } from '../Team'

export const RouterProvider = () => {
    return (
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='' element={<Space />}>
                    <Route path='' element={<Team />}>
                        <Route path='' element={<Dashboard />}>
                            <Route path='team' element={<TeamPage />} />
                            <Route path='leaderboard' element={<LeaderboardPage />} />
                        </Route>
                        <Route path='fine' element={<FinePage />} />
                        <Route path='fine-requests/:id' element={<FineRequestPage />} />
                        <Route path='payment' element={<PaymentPage />} />
                        <Route path='payment-requests/:id' element={<PaymentRequestPage />} />
                        <Route path='menu' element={<MenuPage />} />
                    </Route>
                    <Route path='create/team' element={<CreateTeamPage />} />
                </Route>
                <Route path='create/space' element={<CreateSpacePage />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<CreateAccountPage />} />
        </Routes>
    )
}