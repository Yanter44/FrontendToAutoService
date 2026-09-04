const promptsSortConfig = {

    searchFields: [
        "promptId",
        "tag",
        "description",
    ],

    sortOptions: {
        numberAsc: (a,b) => a.promptId - b.promptId,

        numberDesc: (a,b) => b.promptId - a.promptId,
    }
};