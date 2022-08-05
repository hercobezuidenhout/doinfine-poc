import { renderHook } from '@testing-library/react-hooks'
import { useFineService } from '@services'

describe('useFineService', () => {
    it('returns a list of fines when given user id', async () => {
        const { result } = renderHook(() => useFineService())

        const fines = await result.current.fetchById(1)

        expect(fines.length).toBe(1)
    })
})