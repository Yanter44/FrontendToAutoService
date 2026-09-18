window.userService = {
    async getAllUsersExcept(currentuserid) {
        try {
            const response = await customFetch(`${config.API_BASE}/User/GetAllUsersExcept`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    },
    async getAllUsers() {
        try {
            const response = await customFetch(`${config.API_BASE}/User/GetAllUsers`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    },
    async getUsers(page, pageSize) {
        try {
            const response = await customFetch(`${config.API_BASE}/User/GetUsers?page=${page}&pageSize=${pageSize}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    },
    async getAllAgents() {
        try {
            const response = await customFetch(`${config.API_BASE}/User/GetAllAgents`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    },
    async deleteUser(model) {
        try {
            const response = await customFetch(`${config.API_BASE}/User/DeleteUser?userId=${model.userId}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error(error);
        }

    },
    async getAvailableRoles() {
        try {
            const response = await customFetch(`${config.API_BASE}/User/GetAvailableRoles`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },
    async getUserBlockHistory(userId) {
        try {
            const response = await customFetch(`${config.API_BASE}/User/GetUserBlocksHistory?userId=${userId}`,{ 
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' 
            });
            
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error('Ошибка загрузки истории блокировок:', error);
        }
    },
    async blockUser(blockUserModel) {
        try {
            const response = await customFetch(`${config.API_BASE}/User/BlockUser`,{
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(blockUserModel)
            });
            const result = await response.json();
            console.log(result);
            return result;
        } catch(error) {
            console.error(error);     
        }
    },
    async changeUserDebtLimit(changeuserdebtlimitModel) {
        try {
            const response = await customFetch(`${config.API_BASE}/User/ChangeUserDebtLimit`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(changeuserdebtlimitModel)
            });
            const result = await response.json();
            console.log(result);
            return result;
        }
        catch(error) {
            console.error(error);
        }
    },
    async inviteUser(inviteusermodel) {
        try {
            const response = await customFetch(`${config.API_BASE}/User/InviteUser`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(inviteusermodel)
            });
            const result = await response.json();
            console.log(result);
            return result;
        }
        catch(error){
            console.error(error);
        }
    }
}