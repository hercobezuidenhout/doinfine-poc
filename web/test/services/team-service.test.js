import { renderHook } from "@testing-library/react-hooks"
import { useTeamService } from "@services"
import { EXAMPLE_TEAM_NAME } from "@tests/constants"

describe('useTeamService', () => {
    it('returns a team with members when given the id', async () => {
        const { result } = renderHook(() => useTeamService())

        const team = await result.current.fetchById(1)

        expect(team.name).toBe(EXAMPLE_TEAM_NAME)

        expect(team.members.length).toBeGreaterThan(0)
    })
})