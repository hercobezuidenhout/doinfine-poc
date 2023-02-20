import React from 'react'
import {
    TeamPage,
    LeaderboardPage,
    MenuPage,
    FinePage,
    FineRequestPage,
    PaymentPage,
    PaymentRequestPage,
    LoginPage,
    CreateAccountPage,
    CreateSpacePage,
    CreateTeamPage,
    InvitePage,
    ManageTeamPage
} from '@pages'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from '../Dashboard'
import { App } from '../App'
import { Space } from '../Space'
import { Team } from '../Team'

export const RouterProvider = () => {
    return (
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='' element={<Space />}>
                    <Route path='' element={<Team />}>
                        <Route path='' element={<Dashboard />}>
                            <Route path='fines' element={<TeamPage />} />
                            <Route path='leaderboard' element={<LeaderboardPage />} />
                        </Route>
                        <Route path='teams/:id/manage' element={<ManageTeamPage />} />
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
            <Route path='/invite/:space' element={<InvitePage />} />
            <Route path='/invite/:space/:team' element={<InvitePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<CreateAccountPage />} />
        </Routes>
    )
}