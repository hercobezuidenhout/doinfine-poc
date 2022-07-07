import React from 'react';
import { render, renderWithProviders, screen } from '@tests/base';
import '@testing-library/jest-dom';
import { FineCard } from './FineCard';

describe('FineCard', () => {
    it('loads and displays FineCard correctly', () => {
        const value = '1';
        const reason = 'For showing up late to standup.';
        const by = 'Billy Anderson';
        const date = '07/06/22';

        const fine = {
            value: value,
            reason: reason,
            by: by,
            date: date
        }

        render(<FineCard fine={fine} />)
    
        expect(screen.getByTestId('fine-value').innerHTML).toBe("1")
    })
})