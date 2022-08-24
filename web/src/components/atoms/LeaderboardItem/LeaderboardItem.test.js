import React from 'react'
import { render, screen } from '@tests/base'
import { LeaderboardItem } from '@components/atoms'

describe('LeaderboardItem', () => {
    it('Renders default values for name and fine count', () => {
        render(<LeaderboardItem />)

        const name = screen.getByText('TeamLunch User')
        const position = screen.getByText('#')
        const fineCount = screen.getByText('?')

        expect(name).toBeInTheDocument()
        expect(position).toBeInTheDocument()
        expect(fineCount).toBeInTheDocument()
    })

    it('Renders correct values when props are passed in', () => {
        render(<LeaderboardItem position={1} name='Billy Anderson' fines={10} />)

        const name = screen.getByText('Billy Anderson')
        const position = screen.getByText('1')
        const fineCount = screen.getByText('10')

        expect(name).toBeInTheDocument()
        expect(position).toBeInTheDocument()
        expect(fineCount).toBeInTheDocument()
    })
})