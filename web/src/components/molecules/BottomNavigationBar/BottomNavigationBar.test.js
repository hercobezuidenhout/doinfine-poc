import React from 'react';
import { renderWithProviders, screen } from '@tests/base';
import '@testing-library/jest-dom';
import { BottomNavigationBar } from './BottomNavigationBar';

describe('BottomNavigationBar', () => {
    it('loads and displays BottomNavigationBar', () => {
        renderWithProviders(<BottomNavigationBar />)
    
        expect(screen.getByTestId('team-item')).toBeInTheDocument()
    })
})