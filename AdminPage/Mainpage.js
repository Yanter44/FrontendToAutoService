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
<<<<<<< HEAD
        loader.next();
        bindAllHandlers();
        loader.next();

        loader.next();

=======
        initNewPtoModal();
        loader.next();
        initNewPromptModal();
        initPhotoRequirementModal();
        loader.next();
        initDocumentRequirementModal();
        initAccrualsModal();
        initDeductModal();
        initApplicationSidebarTabs();
        loader.next();
        initSidebarCloseOnOutsideClick();
        initEditApplicationPhotoModal();
        initRedactUserModal();
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
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

