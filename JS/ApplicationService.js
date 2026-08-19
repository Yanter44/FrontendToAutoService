window.applicationService = {
    async getAllApplications(page,pageSize) {
        try {
            console.log('начали запрос');
            const response = await customFetch(`${config.API_BASE}/Application/GetAllApplications?page=${page}&pageSize=${pageSize}`, {
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