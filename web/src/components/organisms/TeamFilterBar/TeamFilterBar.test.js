import React from 'react'
import { renderWithProviders, renderWithRouter, screen } from '@tests/base'
import { TeamFilterBar } from '@components/organisms'

describe('TeamFilterBar', () => {
    it('renders with no children', async () => {
        renderWithProviders(<TeamFilterBar />)
        const teamFilterBar = await screen.findByTestId('team-filter-bar')
        expect(teamFilterBar.children.length).toBe(3)
    })
})