window.notificationHub = {
    init() {
        signalRClient.on(NotificationTypes.ApplicationFinished, this.onApplicationFinished.bind(this));
        signalRClient.on(NotificationTypes.BalanceCredited, this.onBalanceCredited.bind(this));
        signalRClient.on(NotificationTypes.BalanceDebited, this.onBalanceDebited.bind(this));
        signalRClient.on(NotificationTypes.ApplicationSendToModeration, this.onApplicationSendToModeration.bind(this));
        signalRClient.on(NotificationTypes.ApplicationRejected, this.onApplicationRejected.bind(this));
    },

    onApplicationFinished(notification) {
        state.unreadNotificationsCount++;
        renderNotificationCountField(state.unreadNotificationsCount);
        const htmlresult = NotificationTemplates.ApplicationFinished(notification);
        renderNotification(htmlresult);
        console.log(notification);
    },
    onBalanceCredited(notification) {
        state.unreadNotificationsCount++;
        renderNotificationCountField(state.unreadNotificationsCount);
        const htmlresult = NotificationTemplates.BalanceCredited(notification);
        renderNotification(htmlresult);
        console.log(notification);
    },
    onBalanceDebited(notification) {
        state.unreadNotificationsCount++;
        renderNotificationCountField(state.unreadNotificationsCount);
        const htmlresult = NotificationTemplates.BalanceDebited(notification);
        renderNotification(htmlresult);
        console.log(notification);
    },
    onApplicationSendToModeration(notification) {
        state.unreadNotificationsCount++;
        renderNotificationCountField(state.unreadNotificationsCount);
        const htmlresult = NotificationTemplates.ApplicationSendToModeration(notification);
        renderNotification(htmlresult);
        console.log(notification);
    },
    onApplicationRejected(notification) {
        state.unreadNotificationsCount++;
        renderNotificationCountField(state.unreadNotificationsCount);
        const htmlresult = NotificationTemplates.ApplicationRejected(notification);
        renderNotification(htmlresult);
        console.log(notification);
    },
};