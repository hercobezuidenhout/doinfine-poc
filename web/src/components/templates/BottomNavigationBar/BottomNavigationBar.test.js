import React from 'react'
import { renderWithRouter, screen } from '@tests/base'
import userEvent from '@testing-library/user-event';
import { BottomNavigationBar } from '@components/templates'
import { act } from 'react-test-renderer';

describe('BottomNavigationBar', () => {
    it('has three elements in total in primary bar', () => {
        renderWithRouter(<BottomNavigationBar />)
        
        const totalChildren = screen.getByTestId('primary-bar').children.length
        expect(totalChildren).toBe(3)
    })

    it('renders TeamFilterBar by default', () => {
        renderWithRouter(<BottomNavigationBar />)
        expect(screen.getByTestId('team-filter-bar')).toBeInTheDocument()
    })

    it('renders TeamFilterBar if url is /team or /', () => {
        renderWithRouter(<BottomNavigationBar />)
        expect(screen.getByTestId('team-filter-bar')).toBeInTheDocument()
    })

    it('renders CompanyFilterBar if url is /company', async () => {
        renderWithRouter(<BottomNavigationBar />)
        userEvent.click(screen.getByTestId('link-company'))
        expect(screen.findByTestId('company-filter-bar')).resolves.toBeInTheDocument()
    })
})