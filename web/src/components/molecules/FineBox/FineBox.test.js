import React from 'react'
import { render, screen } from '@tests/base'
import userEvent from '@testing-library/user-event'
import { FineBox } from '@components/molecules'

describe('FineBox', () => {
    it('filters username and reason from fine', async () => {
        let username = ''
        let reason = ''

        render(<FineBox setUsername={(x) => username = x} setReason={(x) => reason = x} />)

        await userEvent.type(screen.getByRole('textbox'), 'Fine @someone for something')

        expect(username).toBe('@someone')
        expect(reason).toBe('something')
    })

    it('does not allow a fine not starting with "Fine ... "', async () => {
        render(<FineBox setUsername={jest.fn()} setReason={jest.fn()} />)

        await userEvent.type(screen.getByRole('textbox'), '@someone for something')

        expect(screen.getByText('HOW TO FINE')).toBeInTheDocument()
    })
})