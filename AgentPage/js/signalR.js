window.signalRClient = {
    connection: null,
    async start() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${config.API_BASE}/notificationHub`, {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();
        await this.connection.start();
        console.log(this.connection.connectionId);
    },
    
    on(eventName, callback) {
        this.connection.on(eventName, callback);

    },

    async invoke(method, ...args) {
        return await this.connection.invoke(method, ...args);
    }

};