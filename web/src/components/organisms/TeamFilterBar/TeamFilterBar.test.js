import React from 'react'
import { renderWithRouter, screen } from '@tests/base'
import { TeamFilterBar } from '@components/organisms'

describe('TeamFilterBar', () => {
    it('renders with no children', async () => {
        renderWithRouter(<TeamFilterBar />)
        const teamFilterBar = await screen.findByTestId('team-filter-bar')
        expect(teamFilterBar.children.length).toBe(3)
    })

    it('renders initials of team', async () => {
        renderWithRouter(<TeamFilterBar />)
        const initials = await screen.findByText('BA')
        expect(initials).toBeInTheDocument()
    })
})