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
<<<<<<< HEAD
        loader.next();
        initNotificationDropDown();
        loader.next();
        initDatePicker();
        loader.next();
        bindAllHandlers();
=======
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
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
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