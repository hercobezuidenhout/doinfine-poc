import React from 'react'
import { render, renderWithRouter, screen } from '@tests/base'
import { TeamFilterBar } from '@components/molecules'
import { faker } from '@faker-js/faker'

const mockTeam = [
    { id: 1, name: 'Billy Anderson', avatar: '/img' },
    { id: 2, name: 'Steve Pickleman', avatar: '/img' },
    { id: 3, name: 'Andrew Nice', avatar: faker.image.avatar() }
]

describe('TeamFilterBar', () => {
    it('renders with no children', () => {
        render(<TeamFilterBar />)
        const totalChildren = screen.getByTestId('team-filter-bar').children.length
        expect(totalChildren).toBe(0)
    })

    it('renders with avatars when a team is given', () => {
        render(<TeamFilterBar team={mockTeam} />)
        const totalChildren = screen.getByTestId('team-filter-bar').children.length
        expect(totalChildren).toBe(3)
    })

    it('renders avatar for each team member with default', () => {
        render(<TeamFilterBar team={mockTeam} />)
        expect(screen.findByText('B')).resolves.toBeInTheDocument()
    })

    it('renders avatar for a member with a image', () => {
        render(<TeamFilterBar team={mockTeam} />)
        expect(screen.findByRole('img')).resolves.toBeInTheDocument()
    })
})