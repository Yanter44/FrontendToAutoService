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

const financesPagination = new PaginationManager({
    container: document.querySelector('.FinancesPagination'),
    pageSize: 10,
    currentPage: 1,
    tableName: 'finances',
    onPageChange: async (page) => {
        const result = await agentservice.getMyBalanceTransactionStory(page, 10);
        state.financesHistoryResult = result.data;
        renderFinancesTable(state.financesHistoryResult.items);
        financesPagination.setData({
            items: state.financesHistoryResult.items,
            totalCount: state.financesHistoryResult.totalCount,
            page: state.financesHistoryResult.page,
            pageSize: state.financesHistoryResult.pageSize
        });
    }
});

window.applicationsPagination = applicationsPagination;
window.financesPagination = financesPagination;