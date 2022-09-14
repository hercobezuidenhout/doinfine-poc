import React from 'react'
import { renderWithProviders, screen } from '@tests/base'
import userEvent from '@testing-library/user-event';
import { BottomNavigationBar } from '@components/templates'
import { act } from 'react-dom/test-utils';


describe('BottomNavigationBar', () => {
    it('has three elements in total in primary bar', async () => {
        let totalChildren = 0

        await act(() => {
            renderWithProviders(<BottomNavigationBar />)
        })

        const primaryBar = await screen.findByTestId('primary-bar')
        totalChildren = primaryBar.children.length

        expect(totalChildren).toBe(3)
    })

    it('renders TeamFilterBar by default', async () => {
        let teamFilterBar;

        renderWithProviders(<BottomNavigationBar />)

        await act(() => {
            teamFilterBar = screen.findByTestId('team-filter-bar')
        })

        expect(teamFilterBar).resolves.toBeInTheDocument()
    })

    it('renders CompanyFilterBar if url is /leaderboard', async () => {
        renderWithProviders(<BottomNavigationBar />)

        userEvent.click(screen.getByText('LEADERBOARD'))

        expect(screen.findByTestId('company-filter-bar')).resolves.toBeInTheDocument()
    })
})