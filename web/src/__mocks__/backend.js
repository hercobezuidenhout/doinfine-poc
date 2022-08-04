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

export const fines = [
    { id: 1, user: 1, reason: 'For showing up late.' },
    { id: 2, user: 1, reason: 'For wearing a Blue Bulls shirt.' },
    { id: 3, user: 1, reason: 'For not using the correct teams background.' },
    { id: 4, user: 1, reason: 'For making a bad dad joke.' },
    { id: 5, user: 1, reason: 'For having a fine rejected.' },
    { id: 6, user: 2, reason: 'For not attending coffee break.' },
    { id: 7, user: 2, reason: 'For talking work during social.' },
    { id: 8, user: 2, reason: 'For showing up late.' },
    { id: 9, user: 2, reason: 'For pushing buggy code to develop.' },
    { id: 10, user: 2, reason: 'For leaving pull request unattended.' },
    { id: 11, user: 2, reason: 'For showing up late.' },
    { id: 12, user: 2, reason: 'For having a fine rejected.' },
    { id: 13, user: 3, reason: 'For showing up late.' },
    { id: 14, user: 3, reason: 'For not managing expections.' },
    { id: 15, user: 3, reason: 'For not bringing me coke when we were at the office.' },
]