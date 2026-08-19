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
        initNotificationDropDown();
        loader.next();
        initApplicationSidebarTabs();
        initAddTsPhotoModal();
        loader.next();
        initAddTsDocumentModal();
        initDatePicker();
        loader.next();
        initSidebarCloseOnOutsideClick();
        initCreateApplicationModal();
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