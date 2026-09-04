window.ptoService = {
    async addNewPto(ptoData) {
        try {
            const response = await customFetch(`${config.API_BASE}/Pto/AddNewPto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(ptoData),
            });
            return !!(response && response.ok);

        } catch (error) {
            console.error('Ошибка при отправке ПТО на бэкенд:', error);
            return false;
        }
    },
    async getAllPtos() {
        try {
            const response = await customFetch(`${config.API_BASE}/Pto/GetAllPtos`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Ошибка при получении ПТО:", error);
        }
    },
    async getPtos(page, pageSize) {
        try {
            const response = await customFetch(`${config.API_BASE}/Pto/GetPtos?page=${page}&pageSize=${pageSize}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Ошибка при получении ПТО:", error);
        }
    },
    async deletePto(ptoid) {
        try {
            const response = await customFetch(`${config.API_BASE}/Pto/DeletePto?ptoId=${ptoid}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            const result = await response.json()
            return result;
        }
        catch(error){
            console.log(error);
        }
    }
}
