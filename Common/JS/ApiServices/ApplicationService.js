window.applicationService = {
    async getApplications(page,pageSize) {
        try {
            const response = await customFetch(`${config.API_BASE}/Application/GetApplications?page=${page}&pageSize=${pageSize}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },
    async getApplicationsMetrics(){
        try {
            const response = await customFetch(`${config.API_BASE}/Application/GetApplicationsMetrics`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            if(result.success === true){
                return result.data;
            }
        }
        catch(error){
            console.error(error);
        }
    },
    async createNewApplication(model) {
        try {
            const response = await customFetch(`${config.API_BASE}/Application/CreateNewApplication`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(model)
            });

            if (response.ok) {
                return true;
            }

            const errorData = await response.json().catch(() => null);
            const message = errorData?.message || `Ошибка ${response.status}`;
            throw new Error(message);

        } catch (error) {
            console.error("Ошибка в createNewApplication:", error);
            throw error;
        }
    }
}