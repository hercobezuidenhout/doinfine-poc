import React from 'react'
import { render, renderWithProviders, screen } from '@tests/base'
import { TeamPage } from '@pages'

describe('TeamPage', () => {
    it('renders by correctly', () => {
        renderWithProviders()
        expect(screen.findByTestId('team-page-title')).resolves.toBeInTheDocument()
    })
})