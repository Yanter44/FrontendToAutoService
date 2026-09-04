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
        renderUsersTable(result.data.items);
        
        usersPagination.setData({
            items: result.data.items,
            totalCount: result.data.totalCount,
            page: result.data.page,
            pageSize: result.data.pageSize
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
        renderPromptsTable(result.data.items);
        
        promptsPagination.setData({
            items: result.data.items,
            totalCount: result.data.totalCount,
            page: result.data.page,
            pageSize: result.data.pageSize
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
        renderTransactionsTable(result.data.items);
        transactionsPagination.setData({
            items: result.data.items,
            totalCount: result.data.totalCount,
            page: result.data.page,
            pageSize: result.data.pageSize
        });
    }
});

window.applicationsPagination = applicationsPagination;
window.usersPagination = usersPagination;
window.ptosPagination = ptosPagination;
window.promptsPagination = promptsPagination;
window.transactionsPagination = transactionsPagination;