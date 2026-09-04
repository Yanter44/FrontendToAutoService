const renderNotificationCountField = (notificationsTotalCount) => {
    if(ui.NotificationCountField){
        ui.NotificationCountField.textContent = notificationsTotalCount;
    }
};

const renderNotification = (html) => {
    ui.NotificationModalBody.insertAdjacentHTML("afterbegin", html);
};
