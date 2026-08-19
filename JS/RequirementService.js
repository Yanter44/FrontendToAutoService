window.requirementService = {
    async getAllPhotoRequirements(){
        try {
            const response = await customFetch(`${config.API_BASE}/Requirements/GetAllPhotoRequirements`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Ошибка при отправке ПТО на бэкенд:', error);
        }
    },
    async addphotorequirement(model) {
        try {
            const response = await customFetch(`${config.API_BASE}/Requirements/AddNewPhotoRequirement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(model),
            });
            if (!response.ok) {
                console.error(`Ошибка сервера: ${response.status}`);
                return null; 
            }
            const result = await response.json();
            return result;

        } catch (error) {
            console.error('Ошибка сети при добавлении требования:', error);
            return null;
        }
    },
    async deletephotorequirement(photoRequirementId) {
        try {
            const response = await customFetch(`${config.API_BASE}/Requirements/DeletePhotoRequirement?photoRequirementId=${photoRequirementId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            return response;
        }
        catch (error) {
            console.error(error);
        }
    },
    async getAllDocumentRequirements(){
        try {
            const response = await customFetch(`${config.API_BASE}/Requirements/GetAllDocumentRequirements`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const result = await response.json();
            return result;
        }
        catch(error){
            console.error(error);
        }
    },
    async adddocumentrequirement(model) {
        try {
            const response = await customFetch(`${config.API_BASE}/Requirements/AddNewDocumentRequirement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(model)
            });
            const result = await response.json();
            return result;
        }
        catch(error){
            console.error(error);
        }  
    },
    async deletedocumentrequirement(documentrequirementid){
        try {
            const response = await customFetch(`${config.API_BASE}/Requirements/DeleteDocumentRequirement?documentRequirementId=${documentrequirementid}`,{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            return response;
        }
        catch(error){
            console.error(error);
        }
    }
}