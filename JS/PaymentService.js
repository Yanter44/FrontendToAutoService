window.paymentService = {
    async credit(model) {
        try {
            const response = await customFetch(`${config.API_BASE}/Payment/CreditAgentBalance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(model)
            });
            return response.ok; 
        }
        catch (error) {
            console.error(error);
            return false;
        }
    },
    async debit(model) { // Добавили аргумент model сюда
        try {
            const response = await customFetch(`${config.API_BASE}/Payment/DebitAgentBalance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(model)
            });
            return response.ok;
        }
        catch(error) {
            console.error(error);
            return false;
        }
    },
    async getalltransactions() {
        try {
            const response = await customFetch(`${config.API_BASE}/Payment/GetAllTransaction`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const result = await response.json();
            console.log("Все транзакции: ", result);
            return result;
        }
        catch(error){
            console.error(error);
            return false;
        }
    }
};