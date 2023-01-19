import { EXAMPLE_FULLNAME, EXAMPLE_USER_ID } from '../constants'
import { createUser } from '../../src/commands/create-user.command'

jest.mock('../../src/repositories/user.repository', () => ({
    userRepository: () => ({
        fetchById: (id) => (
            id == 'idOfUserInDatabase'
                ? {
                    userId: 'abcdefghijklmnop',
                    fullName: 'Example User'
                }
                : undefined
        ),
        add: ({ id, fullName }) => {
            if (id == 'idOfUserInDatabase') throw new Error('User already exists')
        }
    })
}))

describe('createUser', () => {
    it('adds a new user to the database', async () => {
        // arrange
        const user = {
            userId: EXAMPLE_USER_ID,
            fullName: EXAMPLE_FULLNAME
        }

        // act
        const result = await createUser(user)

        // assert
        expect(result).toBe(user)
    })

    it('returns undefined if user is already in the database', async () => {
        // arrange
        const user = {
            userId: 'idOfUserInDatabase',
            fullName: EXAMPLE_FULLNAME
        }

        // act
        const result = await createUser(user)

        // assert
        expect(result).toBe(undefined)
    })
})