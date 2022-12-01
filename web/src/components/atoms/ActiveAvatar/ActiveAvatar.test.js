import React from 'react'
import { renderWithDarkTheme, renderWithLightTheme, screen } from "@tests/base"
import { ActiveAvatar } from '@components/atoms'
import { red } from '@mui/material/colors'

describe('ActiveAvatar', () => {
    it('renders with border with light theme', () => {
        renderWithLightTheme(<ActiveAvatar alt='Billy Anderson' src='/img' />)
        expect(screen.getByTestId('styled-avatar')).toHaveStyle({
            border: `4px solid ${red[200]}`,
            marginRight: '0.5rem'
        })
    })

    it('renders with border with dark theme', () => {
        renderWithDarkTheme(<ActiveAvatar alt='Billy Anderson' src='/img' />)
        expect(screen.getByTestId('styled-avatar')).toHaveStyle({
            border: `4px solid ${red[400]}`,
            marginRight: '0.5rem'
        })
    })
})