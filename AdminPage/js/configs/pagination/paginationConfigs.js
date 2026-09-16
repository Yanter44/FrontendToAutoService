const applicationsPagination = new PaginationManager({
    container: document.querySelector('.ApplicationsPagination'),
    pageSize: 10,
    currentPage: 1,
    tableName: 'applications',
    onPageChange: async (page) => {
        const result = await applicationService.getApplications(page, 10);
        state.applicationsResult = result.data;
        renderApplicationsTable(state.applicationsResult.items);
        applicationsPagination.setData({
            items: state.applicationsResult.items,
            totalCount: state.applicationsResult.totalCount,
            page: state.applicationsResult.page,
            pageSize: state.applicationsResult.pageSize
        });
    }
});


const usersPagination = new PaginationManager({
    container: document.querySelector('.UsersPagination'),
    pageSize: 15,
    currentPage: 1,
    tableName: 'users',
    onPageChange: async (page) => {
        const result = await userService.getUsers(page, 15);
        state.usersResult = result.data;
        renderUsersTable(state.usersResult.items);
        
        usersPagination.setData({
            items: state.usersResult.items,
            totalCount: state.usersResult.totalCount,
            page: state.usersResult.page,
            pageSize: state.usersResult.pageSize
        });
    }
});


const ptosPagination = new PaginationManager({
    container: document.querySelector('.PtosPagination'),
    pageSize: 10,
    currentPage: 1,
    tableName: 'ptos',
    onPageChange: async (page) => {
        const result = await ptoService.getPtos(page, 10);
        state.ptosResult = result.data;
        renderPtosTable(result.data.items);
        
        ptosPagination.setData({
            items: result.data.items,
            totalCount: result.data.totalCount,
            page: result.data.page,
            pageSize: result.data.pageSize
        });
    }
});

const promptsPagination = new PaginationManager({
    container: document.querySelector('.PromptsPagination'),
    pageSize: 5,
    currentPage: 1,
    tableName: 'prompts',
    onPageChange: async (page) => {
        const result = await promptService.getPrompts(page, 5);
        state.promptsResult = result.data;
        renderPromptsTable(state.promptsResult.items);
        
        promptsPagination.setData({
            items: state.promptsResult.items,
            totalCount: state.promptsResult.totalCount,
            page: state.promptsResult.page,
            pageSize: state.promptsResult.pageSize
        });
    }
});

const neuronNetworksPagination = new PaginationManager({
    container: document.querySelector('.NeuronNetworksPagination'),
    pageSize: 5,
    currentPage: 1,
    tableName: "neuronNetworks",
    onPageChange: async (page) => {
        const result = await neuronNetworkService.getNeuronNetworks(page, 10);
        state.neuronNetworksResult  = result.data;
        renderNeuronNetworksTable(state.neuronNetworksResult.items);
        neuronNetworksPagination.setData({
            items: state.neuronNetworksResult.items,
            totalCount: state.neuronNetworksResult.totalCount,
            page: state.neuronNetworksResult.page,
            pageSize: state.neuronNetworksResult.pageSize
        });
    }
});

const transactionsPagination = new PaginationManager({
    container: document.querySelector('.TransactionsPagination'),
    pageSize: 15,
    currentPage: 1,
    tableName: 'transactions',
    onPageChange: async (page) => {
        const result = await paymentService.getTransactions(page, 10);
        state.transactionsResult = result.data;
        renderTransactionsTable(state.transactionsResult.items);
        transactionsPagination.setData({
            items: state.transactionsResult.items,
            totalCount: state.transactionsResult.totalCount,
            page: state.transactionsResult.page,
            pageSize: state.transactionsResult.pageSize
        });
    }
});

window.applicationsPagination = applicationsPagination;
window.usersPagination = usersPagination;
window.ptosPagination = ptosPagination;
window.promptsPagination = promptsPagination;
window.neuronNetworksPagination = neuronNetworksPagination;
window.transactionsPagination = transactionsPagination;