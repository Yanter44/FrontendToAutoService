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
    async createNewApplication(formData) {
        const response = await customFetch(`${config.API_BASE}/Application/CreateNewApplication`, {
            method: "POST",
            credentials: "include",
            body: formData
        });
        console.log(response);
        if (!response.ok) {
            const text = await response.text();
            console.log("Ответ сервера:", text);
        }
        return true;
    }
}