import React from 'react'
import { render, screen } from '@tests/base'
import { TeamPage } from '@pages'

describe('TeamPage', () => {
    it('renders by correctly', () => {
        render(<TeamPage />)
        expect(screen.getByTestId('team-page-title')).toBeInTheDocument()

    })
})