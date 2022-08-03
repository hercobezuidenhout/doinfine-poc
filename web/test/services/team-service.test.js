import { renderHook } from "@testing-library/react-hooks"
import { useTeamService } from "@services"

describe('useTeamService', () => {
    it('returns a team with 3 members when given the id', async () => {

        const { result } = renderHook(() => useTeamService())

        const response = await result.current.fetchById(1)
        const team = response.data

        expect(team.name).toBe('Example Team')
        expect(team.members.length).toBe(3)
    })
})