const ptosSortConfig = {

    searchFields: [
        "id",
        "name",
        "rsaNumber",
        "address"
    ],

    sortOptions: {
        numberAsc: (a,b) => a.id - b.id,
        numberDesc: (a,b) => b.id - a.id,
    }
};