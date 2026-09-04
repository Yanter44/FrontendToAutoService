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
        try {
            const response = await customFetch(`${config.API_BASE}/Application/CreateNewApplication`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Успех:', data);
                return true;
            }

            const errorData = await response.json();
            console.log('❌ Ошибка:', errorData);
            return false;

        } catch (error) {
            console.error('Ошибка в createNewApplication:', error);
            return false;
        }
    }
}