import { useLeaderboardService } from '@services'
import { renderHook } from '@testing-library/react-hooks'

describe('useLeaderboard', () => {
    it('returns list of users with total fines in leaderboard format', async () => {
        // arrange
        const { result } = renderHook(() => useLeaderboardService())

        // act
        const items = await result.current.fetchUsersLeaderboard()
        const hasCorrectLength = items.length > 0 && items.length <= 10

        // assert
        expect(hasCorrectLength).toBeTruthy()
    })

    it('returns list of teams with total accumulated fines in leaderboard format', async () => {
        // arrange
        const { result } = renderHook(() => useLeaderboardService())

        // act
        const items = await result.current.fetchTeamsLeaderboard()
        const hasCorrectLength = items.length > 0 && items.length <= 10

        // assert
        expect(hasCorrectLength).toBeTruthy()
    })
})