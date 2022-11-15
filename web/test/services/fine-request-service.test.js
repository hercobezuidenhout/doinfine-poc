import { renderHook } from '@testing-library/react-hooks'
import { useFineRequestService } from '@services'

describe('useFineRequestService', () => {
    it('returns a fine request by id', async () => {
        const { result } = renderHook(() => useFineRequestService())

        const fineRequest = await result.current.fetchById(1)

        expect(fineRequest).not.toBeNull()
    })

    it('handles 404 by throwing an NotFoundError', async () => {
        const { result } = renderHook(() => useFineRequestService())

        const fineRequest = result.current.fetchById(0)

        expect(fineRequest).rejects.toThrowError("Fine request with ID: 0")
    })
})