window.promptService = {
    async addNewPrompt(usertag, userdescription) {
        try {
            const response = await customFetch(`${config.API_BASE}/Prompt/AddNewPrompt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    tag: usertag,
                    description: userdescription
                }),
            });
            return !!(response && response.ok);
        } catch (error) {
            console.error('Ошибка при отправке промпта:', error);
        }
    },
    async getAllPrompts() {
        try {
            const response = await customFetch(`${config.API_BASE}/Prompt/GetAllPrompts`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            console.log("Все промпты: ", result);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },
    async deletePrompt(promptId) {
        try {
            const response = await customFetch(`${config.API_BASE}/Prompt/DeletePrompt?promptId=${promptId}`, {
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
    async redactPrompt(model) {
        try {
            const response = await customFetch(`${config.API_BASE}/Prompt/UpdatePrompt`,{
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(model),
            });
            const result = await response.json();
            return result;
        }
        catch(error){
            console.error(error);
        }
    }
}