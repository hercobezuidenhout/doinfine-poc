export const users = [
    { id: 1, username: 'billy', firstName: 'Billy', lastName: 'Anderson', email: 'billy@example.com', teams: [1] },
    { id: 2, username: 'steve', firstName: 'Steve', lastName: 'Pickleman', email: 'steve@example.com', teams: [1] },
    { id: 3, username: 'andrew', firstName: 'Andrew', lastName: 'Stew', email: 'andrew@example.com', teams: [1] },
    { id: 4, username: 'melissa', firstName: 'Melissa', lastName: 'Becky', email: 'melissa@example.com', teams: [2] },
    { id: 5, username: 'tick', firstName: 'Tickman', lastName: 'Strongarm', email: 'tickman@example.com', teams: [2] },
]

export const teams = [
    { id: 1, name: 'Core', members: users.filter(user => user.teams.includes(1)) },
    { id: 2, name: 'Watercooler', members: users.filter(user => user.teams.includes(2)) },
]