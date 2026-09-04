const initApp = async () => {
    loader.show();
    try {
        await ensureAuthorized();
        loader.next();
        initAgentData();
        loader.next();
        initNavigation();
        loader.next();
        initMobileNav();
        initProfileDropdown();
        loader.next();
        initDropdownClose();
        initDropdownResize();
        loader.next();
        initNotifications();
        loader.next();
        initNotificationDropDown();
        loader.next();
        initDatePicker();
        loader.next();
        bindAllHandlers();
        loader.next();
        await signalRClient.start();
        notificationHub.init();
        loader.next();
    }
    catch (error) {
        console.error('Ошибка инициализации приложения:', error);
    }
    finally {
        loader.hide();
    }
};

initApp();