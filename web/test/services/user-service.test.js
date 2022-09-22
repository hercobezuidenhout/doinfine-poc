import { renderHook } from '@testing-library/react-hooks'
import { useUserService } from '@services'
import { EXAMPLE_FULLNAME, EXAMPLE_USERNAME, EXAMPLE_USER_ID } from '@tests/constants'

describe('useUserService', () => {
    it('fetchById returns user with teams', async () => {
        const expectedUser = {
            id: EXAMPLE_USER_ID,
            username: EXAMPLE_USERNAME,
            fullName: EXAMPLE_FULLNAME,
            teams: [1]
        }

        const { result } = renderHook(() => useUserService())

        const user = await result.current.fetchById(EXAMPLE_USER_ID)

        expect(user).toStrictEqual(expectedUser)
    })
})