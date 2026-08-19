const initApp = () => {
    loader.show();
    try {
        initLeftMenuSidebar();
        initMobileNav();
        initAdminData();
        loader.next();
        initProfileDropdown();
        loader.next();
        initNavigation();
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
        loader.next();
        initDropdownClose();
        initDropdownResize();
        loader.next();
        initNotifications();
        loader.next();
        initNotificationDropDown();
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

