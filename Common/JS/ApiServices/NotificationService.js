window.notificationService = {
    async getNotifications(page, pageSize) {
        try {
            console.log('начали запрос нотификаций');
            const response = await customFetch(`${config.API_BASE}/Notification/GetNotifications?page=${page}&pageSize=${pageSize}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            console.log(result);
            return result;
        }
        catch (error) {
            console.error(error);
        }

    }
};