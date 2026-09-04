const usersSortConfig = {

    searchFields: [
        "userId",
        "fio",
        "email",
        "role"
    ],

    sortOptions: {
        newest: (a,b) => new Date(b.regDate) - new Date(a.regDate),

        oldest: (a,b) => new Date(a.regDate) - new Date(b.regDate),

        numberAsc: (a,b) => a.userId - b.userId,

        numberDesc: (a,b) => b.userId - a.userId,
    }
};