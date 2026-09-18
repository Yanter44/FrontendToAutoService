window.neuronNetworkService = {
    async getNeuronNetworks(page, pageSize){
        try {
            const response = await customFetch(`${config.API_BASE}/NeuronNetwork/GetNeuronNetworks?page=${page}&pageSize=${pageSize}`,{
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            return result;
        }
        catch(error){
            console.error(error);
        }
    },
    async getAllNeuronNetworks(){
        try {
            const response = await customFetch(`${config.API_BASE}/NeuronNetwork/GetAllNeuronNetworks`,{
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            return result;
        }
        catch(error){
            console.error(error);
        }
    },
    async addNewNeuronNetwork(model){
        try {
            const response = await customFetch(`${config.API_BASE}/NeuronNetwork/AddNewNeuronNetwork`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(model),
            });
            return !!(response && response.ok);

        } catch (error) {
            console.error('Ошибка при попытке отправить модели нейронной сети на бэкенд:', error);
            return false;
        }
    },
    async deleteNeuronNetwork(neuronNetworkId) {
        try {
            const response = await customFetch(`${config.API_BASE}/NeuronNetwork/DeleteNeuronNetwork?neuronNetworkId=${neuronNetworkId}`, {
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
    },
    async generatePhoto(generatePhotoModel){
        try {
            const response = await customFetch(`${config.API_BASE}/NeuronNetwork/GeneratePhoto`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },           
                body: JSON.stringify(generatePhotoModel),
            });
            const result = await response.json();
            return result;
        }
        catch(error){
            console.error(error);
        }
    },
    async confirmGeneratedPhotoByAI(confirmGeneratedPhotoByAI){
        try {
            const response = await customFetch(`${config.API_BASE}/NeuronNetwork/ConfirmGeneratedPhoto`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },           
                body: JSON.stringify(confirmGeneratedPhotoByAI),
            });
            const result = await response.json();
            return result;
        }
        catch(error){
            console.error(error);
        }
    },
}