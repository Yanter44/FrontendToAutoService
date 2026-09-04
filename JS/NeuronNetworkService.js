window.neuronNetworkService = {
    async getAvailableNeuronNetworks(){
        try {
            const response = await customFetch(`${config.API_BASE}/NeuronNetwork/GetSupportedNeuronNetworks`,{
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
}