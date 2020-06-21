export let hotels = [
    {
        id: 1, token: 'hotel1', title: 'Motel', desc: 'Poor', rooms: [
            { order: 1, price: 10, available: true },
            { order: 2, price: 10, available: true },
            { order: 3, price: 10, available: false },
            { order: 4, price: 10, available: false },
            { order: 5, price: 10, available: false },
        ]
    },
    {
        id: 2, token: 'hotel2', title: 'Hostel', desc: 'Middle', rooms: [
            { order: 1, price: 15, available: true },
            { order: 2, price: 15, available: false },
            { order: 3, price: 15, available: false },
        ]
    },
    {
        id: 3, token: 'hotel3', title: 'Lux', desc: 'Expensive', rooms: [
            { order: 1, price: 20, available: false },
            { order: 2, price: 20, available: true },
            { order: 3, price: 20, available: false },
        ]
    },
    {
        id: 4, token: 'hotel4', title: 'Ukraine', desc: 'Located in Kyiv', rooms: [
            { order: 1, price: 25, available: false },
            { order: 2, price: 25, available: true },
            { order: 3, price: 35, available: false },
            { order: 4, price: 35, available: false },
        ]
    },
    {
        id: 5, token: 'hotel5', title: 'President', desc: 'Super Expensive', rooms: [
            { order: 1, price: 50, available: false },
            { order: 2, price: 55, available: true },
            { order: 3, price: 65, available: false },
            { order: 4, price: 75, available: false },
        ]
    },
]
