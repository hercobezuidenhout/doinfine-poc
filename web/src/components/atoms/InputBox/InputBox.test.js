import { render, screen } from '@tests/base'
import React from 'react'
import { InputBox } from '@components/atoms'

describe('InputBox', () => {
    it('displays the given value', () => {
        // arrange
        render(<InputBox label='Example' value='some value'>This is an example InfoBox</InputBox>)

        // act
        const input = screen.getByRole('textbox')

        // assert
        expect(input).toBeInTheDocument()
    })
})