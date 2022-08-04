import { renderHook } from "@testing-library/react-hooks"
import { useTeamService } from "@services"

describe('useTeamService', () => {
    it('returns a team with 3 members when given the id', async () => {

        const { result } = renderHook(() => useTeamService())

        const team = await result.current.fetchById(1)

        expect(team.name).toBe('Core')
        expect(team.members.length).toBe(3)
    })
})