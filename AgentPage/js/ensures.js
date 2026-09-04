<<<<<<< HEAD
window.ensure = {
    async ensureAuthorized() {
        await customFetch(`${config.API_BASE}/Auth/Ping`, {
            method: "GET",
            credentials: "include"
        });
    },
    async applications() {
        if (state.applicationsResult.items.length === 0){
            const result = await applicationService.getApplications(state.page, state.pageSize) || [];
            state.applicationsResult = result.data;
            console.log(result.data);
        }
    },
    async vehicleCategories() {
        if (state.vehicleCategories.length === 0) {
            const categories = await vehicleService.getAllVehicleCategories();
            console.log("Категории из API:", categories);
            state.vehicleCategories = categories;
        }
    },
    async ptos() {
        if (state.ptos.length === 0) {
            const ptos = await ptoService.getAllPtos();
            console.log("ПТО из API:", ptos);
            state.ptos = ptos;
        }
    },
    async applicationsMetrics() {
        if (Object.values(state.applicationsMetrics ?? {}).every(v => v == null)) {
            const result = await applicationService.getApplicationsMetrics();
            state.applicationsMetrics = {
                totalApplicationsCount: result.totalApplicationsCount ?? 0,
                totalApplicationsInModerationCount: result.totalApplicationsInModerationCount ?? 0,
                totalApplicationsApprovedCount: result.totalApplicationsApprovedCount ?? 0,
                totalApplicationsTodayCount: result.totalApplicationsTodayCount ?? 0
            };
            console.log('Метрики загружены:', state.applicationsMetrics);
        }
    },
    async financesHistory() {
        if (state.financesHistoryResult.length === 0) {
            const result = await agentservice.getMyBalanceTransactionStory();
            state.financesHistoryResult = result;
        }
    },
    async finances() {
        if (Object.values(state.finances ?? {}).every(v => v == null)) {
            const balanceresult = await agentservice.getmybalance();
            const debtlimitresult = await agentservice.getmydebtlimit();
            const currentDebt = await agentservice.getmycurrentdebt();
            state.finances.balance = balanceresult.data;
            state.finances.debtlimit = debtlimitresult.data;
            state.finances.currentdebt = currentDebt.data;
        }
    }
}



=======
async function ensureAuthorized() {
    await customFetch(`${config.API_BASE}/Auth/Ping`, {
        method: "GET",
        credentials: "include"
    });
}
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
