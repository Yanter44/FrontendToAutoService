window.agentservice = {
    async getmyapplications(page,pageSize){
        try {
            const response = await customFetch(`${config.API_BASE}/Agent/GetMyApplications?page=${page}&pageSize=${pageSize}`, {
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
    async getmyprofile() {
        try {
            const response = await customFetch(`${config.API_BASE}/Agent/GetMyProfile`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    async getmybalance() {
        try {
            const response = await customFetch(`${config.API_BASE}/Agent/GetMyBalance`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            const result = await response.json();
            console.log("Мой баланс", result)
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    async getmydebtlimit(){
        try {
            const response = await customFetch(`${config.API_BASE}/Agent/GetMyDebtLimit`,{
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            const result = await response.json();
            console.log("Мой кредитный лимит", result);
            return result;
        } catch(error){
            console.error(error);
        }
    },   
    async getmybalancetransactionstory() {
        try {
            const response = await customFetch(`${config.API_BASE}/Agent/GetMyBalanceTransactionStory`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            const result = await response.json();
            console.log("Финансовая история:", result);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },
}