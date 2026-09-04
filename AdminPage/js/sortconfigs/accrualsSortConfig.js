const accrualsSortConfig = {

    searchFields: [
        "externalId",
        "agentName",
        "description",
    ],

    sortOptions: {
        newest: (a,b) => new Date(b.createdAt) - new Date(a.createdAt),

        oldest: (a,b) => new Date(a.createdAt) - new Date(b.createdAt),
    }
};