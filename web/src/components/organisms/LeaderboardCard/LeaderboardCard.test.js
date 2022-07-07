import React from 'react';
import { render, renderWithProviders, screen } from '@tests/base';
import '@testing-library/jest-dom';
import { LeaderboardCard } from './LeaderboardCard';

describe('LeaderboardCard', () => {
    it('loads and displays LeaderboardCard', () => {
        const name = 'Billy Anderson';
        const position = 1;
        const count = 12;
        const filter = 'Fines';

        renderWithProviders(<LeaderboardCard name={name} position={position} count={count} filter={filter} />)
    
        expect(screen.getByTestId('leaderboard-position').innerHTML).toBe("1")
        expect(screen.getByTestId('leaderboard-name').innerHTML).toBe("Billy Anderson")
        expect(screen.getByTestId('leaderboard-count').innerHTML).toBe("12 Fines")
    })
})