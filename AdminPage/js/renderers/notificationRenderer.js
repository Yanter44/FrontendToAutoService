const renderNotification = (html) => {
    ui.NotificationModalBody.insertAdjacentHTML("afterbegin", html);
};

const renderNotificationCountField = (notificationsTotalCount) => {
    if(ui.NotificationCountField){
        ui.NotificationCountField.textContent = notificationsTotalCount;
    }
};