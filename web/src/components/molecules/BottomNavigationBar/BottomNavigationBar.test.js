import React from 'react';
import { render, screen } from '@tests/base';
import '@testing-library/jest-dom';
import { BottomNavigationBar } from './BottomNavigationBar';

test('loads and displays BottomNavigationBar', () => {
    render(<BottomNavigationBar />)

    expect(screen.getByTestId('team-item')).toBeInTheDocument()
})