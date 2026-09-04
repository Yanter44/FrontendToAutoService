window.vehicleService = {
    async getAllVehicleCategories() {
        try {
            const response = await customFetch(`${config.API_BASE}/Vehicle/GetAllVehicleCategories`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    },
}