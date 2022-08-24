const { fines } = require("../../src/__mocks__/backend")

module.exports = {
    get: jest.fn(url => {
        if (url == '/team/1') return Promise.resolve({
            data: {
                id: 1,
                name: 'Example Team',
                members: [
                    { id: 1, username: 'billy', firstName: 'Billy', lastName: 'Anderson', email: 'billy@example.com' },
                    { id: 2, username: 'steve', firstName: 'Steve', lastName: 'Wack', email: 'steve@example.com' },
                    { id: 3, username: 'andrew', firstName: 'Andrew', lastName: 'Pickle', email: 'andrew@example.com' }
                ]
            }
        })

        if (url == '/fines/1') return Promise.resolve({
            data: {
                fines: fines.filter(fine => fine.id == 1)
            }
        })

        if (url == '/leaderboard/users') return Promise.resolve({
            data: {
                items: [
                    { title: 'Billy Anderson', fines: 10 },
                    { title: 'Billy Anderson', fines: 9 },
                    { title: 'Billy Anderson', fines: 8 },
                    { title: 'Billy Anderson', fines: 7 },
                    { title: 'Billy Anderson', fines: 6 },
                    { title: 'Billy Anderson', fines: 5 },
                ]
            }
        })
    })
}