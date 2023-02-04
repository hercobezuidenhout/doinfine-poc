const { EXAMPLE_USER_ID, EXAMPLE_USERNAME, EXAMPLE_FULLNAME, EXAMPLE_TEAM_NAME, EXAMPLE_REASON } = require('@tests/constants')
const { fines } = require('../../src/__mocks__/backend')

module.exports = {
    get: jest.fn(url => {
        if (url == '/fines/1') return Promise.resolve({
            data: {
                id: 1,
                name: EXAMPLE_TEAM_NAME,
                members: [
                    { id: EXAMPLE_USER_ID, fullName: 'Billy Anderson' }
                ]
            }
        })

        if (url == '/fines/1') return Promise.resolve({
            data: {
                fines: fines.filter(fine => fine.id == 1)
            }
        })

        if (url == '/leaderboard/users') return Promise.resolve({
            data: [
                { title: 'Billy Anderson', fines: 10 },
                { title: 'Billy Anderson', fines: 9 },
                { title: 'Billy Anderson', fines: 8 },
                { title: 'Billy Anderson', fines: 7 },
                { title: 'Billy Anderson', fines: 6 },
                { title: 'Billy Anderson', fines: 5 },
            ]

        })

        if (url == '/leaderboard/teams') return Promise.resolve({
            data: [
                { title: 'Core', fines: 10 },
                { title: 'Marketing', fines: 9 }
            ]
        })

        if (url == `/users/${EXAMPLE_USER_ID}`) return Promise.resolve({
            data: {
                id: EXAMPLE_USER_ID,
                username: EXAMPLE_USERNAME,
                fullName: EXAMPLE_FULLNAME,
                teams: [1]
            }
        })

        if (url == `/fine-requests/1`) return Promise.resolve({
            data: {
                id: EXAMPLE_USER_ID,
                fullName: EXAMPLE_FULLNAME,
                reason: EXAMPLE_REASON
            }
        })

        if (url == '/fine-requests/0') return Promise.resolve(
            {
                data: 'Fine request with ID: 0',
                status: 404,
                statusText: 'Not Found'
            }
        )
    }),
    post: jest.fn(url => {
        if (url == '/payment-requests') return Promise.resolve({
            id: 1
        })
    }),
    put: jest.fn(url => {
        if (url == '/fine-requests') return Promise.resolve({
            status: 200
        })
    })
}