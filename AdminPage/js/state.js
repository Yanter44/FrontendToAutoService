window.state = {
    page:  1,
    pageSize: 5,

    notifications: [],
    uploadedFiles: [],
    MAX_PHOTOS: 8,
   
    availableRoles: [],

    applicationsResult: {
        items: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,
        totalPages: 0
    },
    applicationsMetrics: {
        totalApplicationsCount: null,
        totalApplicationsInModerationCount: null,
        totalApplicationsApprovedCount: null,
        totalApplicationsTodayCount: null
    },
    usersResult: {
        items: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,
        totalPages: 0
    },
    ptosResult: {
        items: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,
        totalPages: 0
    },

    promptsResult: {
        items: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,
        totalPages: 0
    },

    redactUser: {
        userId: null,
        activeTab: null
    },

    vehicleCategories: [],
    photorequirements: [],
    documentrequirements: [],

    availableAgentsResult: {
        items: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,
        totalPages: 0
    },
    transactionsResult: {
        items: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,
        totalPages: 0
    },
    
    availableNeuronNetworks: [],
    selectedphoto: null,
    selectedApplication: null,
    photoTagsTagify: null,
    choosedtagsids: [],
};