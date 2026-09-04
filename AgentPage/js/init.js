const initAgentData = async () => {
    const profileresult = await agentservice.getmyprofile();
    const balanceresult = await agentservice.getmybalance();
    renderProfile(profileresult);
    renderBalance(balanceresult.data);
};

const initDropdownClose = () => {
    document.addEventListener('click', (event) => {
        const clickedProfile =
            ui.profileDropdown?.contains(event.target) ||
            ui.profileTrigger?.contains(event.target);

        const clickedNotification =
            ui.NotificationModalDropDown?.contains(event.target) ||
            ui.NotificationTrigger?.contains(event.target);

        if (!clickedProfile && !clickedNotification) {
            closeAllDropdowns();
        }
    });
};

const toggleDropdown = (dropdown, trigger) => {
    const isOpen = dropdown.classList.contains('Active');
    closeAllDropdowns();
    if (!isOpen) {
        dropdown.classList.add('Active');
        trigger.classList.add('Active');
        if (isMobileLayout()) {
            document.body.classList.add('SheetOpen');
        }
    }
};
const closeAllDropdowns = () => {
    ui.profileDropdown?.classList.remove('Active');
    ui.profileTrigger?.classList.remove('Active');

    ui.NotificationModalDropDown?.classList.remove('Active');
    ui.NotificationTrigger?.classList.remove('Active');
    document.body.classList.remove('SheetOpen');
};

const initDropdownResize = () => {
    window.addEventListener('resize', () => {
        if (ui.profileDropdown?.classList.contains('Active')) {
            positionDropdown();
        }
        if (ui.NotificationModalDropDown?.classList.contains('Active')) {
            positionNotificationModalDropDown();
        }
    });
};

const initProfileDropdown = () => {
    if (ui.profileTrigger && ui.profileDropdown) {
        ui.profileTrigger.addEventListener('click', (event) => {
            event.stopPropagation();

            toggleDropdown(ui.profileDropdown, ui.profileTrigger);

            if (ui.profileDropdown.classList.contains('Active')) {
                positionDropdown();
            }
        });
    }
};

const initNotificationDropDown = () => {
    if (ui.NotificationTrigger && ui.NotificationModalDropDown) {
        ui.NotificationTrigger.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log("успешно нажал на уведомления");
            toggleDropdown(
                ui.NotificationModalDropDown,
                ui.NotificationTrigger
            );

            if (ui.NotificationModalDropDown.classList.contains('Active')) {
                positionNotificationModalDropDown();
            }
        });
    }
    else{console.log("не удалось");}
};

const initNotifications = async () => {
    const notifications = await notificationService.getNotifications(1, 10);
    console.log('Нотификации:');
    console.dir(notifications);
    const sortedNotifications = [...notifications].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB; 
    });

    console.log(`Загружено уведомлений: ${sortedNotifications.length}`);
    renderNotificationCountField(sortedNotifications.length);
    sortedNotifications.forEach(notification => {
        const template = NotificationTemplates[notification.notificationType];
        const htmlresult = template(notification);
        renderNotification(htmlresult);
    });
};

const initNavigation = () => {
    if (!ui.navLinks.length || !ui.screens.length) return;

    const switchScreen = async (targetScreenName) => {
        ui.navLinks.forEach(link => {
            const isActive = link.getAttribute('data-target') === targetScreenName;
            link.classList.toggle('Active', isActive);
        });

        ui.screens.forEach(screen => {
            const isTarget = screen.getAttribute('data-screen') === targetScreenName;
            screen.classList.toggle('Hidden', !isTarget);
        });

        closeMobileNav();

        if (ui.Workspace) {
            ui.Workspace.classList.remove('SidebarOpen');
        }
        
        try {
            switch (targetScreenName) {
                case 'applications': 
                    await ensure.applications();
                    await ensure.vehicleCategories();
                    renderVehicleCategories(state.vehicleCategories);
                    await ensure.ptos();
                    await ensure.applicationsMetrics();
                    renderApplicationsMetrics(state.applicationsMetrics);
                    await applicationsPagination.loadPage(1);          
                    bindSortEvents(document.querySelector(".ApplicationsSortSelect select"),
                                   document.getElementById("ApplicationsSearchSortInput"),
                                   filterAndSortApplications);
                    break;
                case 'finances':
                    await ensure.financesHistory();
                    await ensure.finances();
                    await financesPagination.loadPage(1);
                    renderAgentFinanceStatus(state.finances.balance, state.finances.debtlimit, state.finances.currentdebt);
                    break;
                    
                default:
                    break;
            }
        } catch (error) {
            console.error(`Ошибка при загрузке данных для вкладки ${targetScreenName}:`, error);
        }
    };

    ui.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchScreen(target);
        });
    });

    const defaultActiveLink = document.querySelector('[data-target].Active') || ui.navLinks[0];
    if (defaultActiveLink) {
        const defaultTarget = defaultActiveLink.getAttribute('data-target');
        switchScreen(defaultTarget);
    }
};


const closeMobileNav = () => {
    document.body.classList.remove('MobileNavOpen');
    const btn = document.getElementById('mobileMenuButton');
    if (btn) btn.setAttribute('aria-expanded', 'false');
};

const initMobileNav = () => {
    const btn = document.getElementById('mobileMenuButton');
    const overlay = document.getElementById('sidebarOverlay');
    const sheetBackdrop = document.getElementById('sheetBackdrop');
    const profileClose = document.getElementById('ProfileSettingCloseBtn');
    const notificationClose = document.getElementById('NotificationModalCloseBtn');

    btn?.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = document.body.classList.toggle('MobileNavOpen');
        btn.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) closeAllDropdowns();
    });

    overlay?.addEventListener('click', closeMobileNav);
    sheetBackdrop?.addEventListener('click', closeAllDropdowns);
    profileClose?.addEventListener('click', (event) => {
        event.stopPropagation();
        closeAllDropdowns();
    });
    notificationClose?.addEventListener('click', (event) => {
        event.stopPropagation();
        closeAllDropdowns();
    });

    window.addEventListener('resize', () => {
        if (!isMobileLayout()) {
            closeMobileNav();
        }
    });
};
const bindAllHandlers = () => {
    console.log('🔄 Биндинг всех обработчиков...');
    bindAllApplicationHandlers();
    bindPhotoModalHandlers();
    bindDocumentModalHandlers();
};
const initDatePicker = () => {
    const pickerInput = document.getElementById('FinanceDatePicker');
    if (!pickerInput) return;

    flatpickr(pickerInput, {
        mode: "range",          
        dateFormat: "d.m.Y",    
        locale: "ru",           
        allowInput: false,   
        
        onClose: function(selectedDates) {
            if (selectedDates.length === 2) {
                const startDate = selectedDates[0];
                const endDate = selectedDates[1];
                
                console.log("Выбран старт:", startDate.toLocaleDateString('ru-RU'));
                console.log("Выбран конец:", endDate.toLocaleDateString('ru-RU'));

                const formatDate = (date) => {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}.${month}.${year}`;
                };
                console.log("Отформатированный старт:", formatDate(startDate));
                console.log("Отформатированный конец:", formatDate(endDate));
            }
        }
    });
};