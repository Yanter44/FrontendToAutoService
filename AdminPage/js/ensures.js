window.ensure = {
    async prompts() {
        if (state.prompts && state.prompts.length > 0)
            return;
        state.prompts = await promptService.getAllPrompts() || [];
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
    async applications() {
        if (state.applications && state.applications.length > 0)
            return;
        state.applications = await api.getApplications() || [];
    },
};