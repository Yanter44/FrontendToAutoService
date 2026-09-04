window.ensure = {
    async applications() {
        if (state.applicationsResult.items.length === 0){
            const result = await applicationService.getApplications(state.page, state.pageSize) || [];
            state.applicationsResult = result.data;
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
        }
    },
    async users(){
        if(state.usersResult.items.length === 0){
            const result = await userService.getUsers(state.page, state.pageSize) || [];
            state.usersResult = result.data;
            console.log(state.usersResult);
        }
    },
    async prompts() {
        if (state.promptsResult.items.length === 0) {
            const result = await promptService.getPrompts(state.page, state.pageSize) || [];
            state.promptsResult = result.data;
            console.log(state.promptsResult);
        }
    },
    async ptos(){
        if(state.ptosResult.items.length === 0){
            const result = await ptoService.getPtos(state.page, state.pageSize) || [];
            state.ptosResult = result.data;
            console.log(state.ptosResult);
        }
    },
    async neuronNetworks() {
        if(state.availableNeuronNetworks && state.availableNeuronNetworks.length > 0)
            return;
        state.availableNeuronNetworks = await neuronNetworkService.getAvailableNeuronNetworks();
    },
    async availableroles(){
        if(state.availableRoles && state.availableRoles.length > 0)
            return;      
        state.availableRoles = await userService.getAvailableRoles();
        console.log(state.availableRoles);
    },
    async allAgents(){
        if (!state.availableagents || state.availableagents.length === 0) {
            const result = await userService.getAllAgents();
            state.availableagents = result.data;
        }
    },
    async transactions(){
        if(state.transactionsResult.items.length === 0){
            const result = await paymentService.getTransactions(state.page, state.pageSize);
            state.transactions = result.data;
            console.log(state.transactions);
        }
    }

};