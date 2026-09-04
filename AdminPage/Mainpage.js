const initApp = async () => {
    loader.show();
    try {
        initLeftMenuSidebar();
        initMobileNav();
        initAdminData();
        loader.next();
        initProfileDropdown();
        loader.next();
        initNavigation();
        loader.next();
        bindAllHandlers();
        loader.next();

        loader.next();

        loader.next();
        initDropdownClose();
        initDropdownResize();
        loader.next();
        initNotifications();
        loader.next(); 
        initNotificationDropDown();
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

