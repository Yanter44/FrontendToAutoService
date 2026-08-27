window.state = {
    page:  1,
    pageSize: 5,

    notifications: [],
    uploadedFiles: [],
    MAX_PHOTOS: 8,
    ptos: [],
    prompts: [],
    users: [],
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
    
    redactUser: {
        userId: null,
        activeTab: null
    },

    vehicleCategories: [],
    photorequirements: [],
    documentrequirements: [],

    availableagents: [],
    alltransactions: [],
    
    availableNeuronNetworks: [],
    selectedphoto: null,
    selectedApplication: null,
    photoTagsTagify: null,
    choosedtagsids: [],
};