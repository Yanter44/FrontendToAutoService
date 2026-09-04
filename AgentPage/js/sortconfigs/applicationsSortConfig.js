const applicationsSortConfig = {

    searchFields: [
        "id",
        "fio",
        "vin",
        "gosNumber",
        "brand",
        "model"
    ],

    sortOptions: {

        newest: (a,b) =>
            new Date(b.createdAt) - new Date(a.createdAt),

        oldest: (a,b) =>
            new Date(a.createdAt) - new Date(b.createdAt),

        numberAsc: (a,b) => a.id - b.id,

        numberDesc: (a,b) => b.id - a.id,
    }
};