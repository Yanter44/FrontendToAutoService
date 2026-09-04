const initAdminData = async () => {
    const result = await adminService.getmyprofile();
    console.log(result);
    renderProfile(result);
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

            toggleDropdown(
                ui.NotificationModalDropDown,
                ui.NotificationTrigger
            );

            if (ui.NotificationModalDropDown.classList.contains('Active')) {
                positionNotificationModalDropDown();
            }
        });
    }
};

const initNotifications = async () => {
    const notifications = await notificationService.getNotifications(1, 10);
    const sortedNotifications = [...notifications].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB; 
    });
    renderNotificationCountField(sortedNotifications.length);
    sortedNotifications.forEach(notification => {
        const template = NotificationTemplates[notification.notificationType];

        if (!template) {
            console.warn(`Не найден шаблон для уведомления: ${notification.notificationType}`);
            return;
        }
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
                    await ensure.applicationsMetrics();
                    await applicationsPagination.loadPage(1);
                    bindApplicationsTableEvents();
                    renderApplicationsMetrics(state.applicationsMetrics);
                    bindSortEvents(document.querySelector(".ApplicationsSortSelect select"),
                                   document.getElementById("ApplicationsSearchSortInput"),
                                   filterAndSortApplications);
                    break;
                case 'users':
                    await ensure.users();
                    await usersPagination.loadPage(1);
                    bindSortEvents(document.querySelector(".UsersSortSelect select"),
                                   document.getElementById("UsersSearchSortInput"),
                                   filterAndSortUsers);
                    break;
                case 'ptos': 
                    await ensure.ptos();
                    await ptosPagination.loadPage(1);
                    bindSortEvents(document.querySelector(".PtosSortSelect select"),
                                   document.getElementById("PtosSearchSortInput"),
                                   filterAndSortPtos);
                    break;
                case 'prompts': 
                    await ensure.prompts();
                    await promptsPagination.loadPage(1);
                    bindSortEvents(document.querySelector(".PromptsSortSelect select"),
                                   document.getElementById("PromptsSearchSortInput"),
                                   filterAndSortPrompts);
                    break;

                case 'requirements':
                    const photorequirements = await requirementService.getAllPhotoRequirements();
                    const documentrequirements = await requirementService.getAllDocumentRequirements();
                    console.log("Типы фотографий: ", photorequirements);
                    console.log("Типы документов: ", documentrequirements);
                    state.photorequirements = photorequirements;
                    state.documentrequirements = documentrequirements;
                    await renderPhotoRequirementsTable(state.photorequirements);
                    await renderDocumentRequirementsTable(state.documentrequirements);
                    break;

                case 'accruals':
                    await ensure.allAgents();
                    await ensure.transactions();
                    await transactionsPagination.loadPage(1);
                    await renderAvailableAgents(state.availableagents);
                    bindSortEvents(document.querySelector(".AccrualsSortSelect select"),
                                   document.getElementById("AccrualsSearchSortInput"),
                                   filterAndSortAccruals);
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

const bindAllHandlers = () => {
    console.log('🔄 Биндинг всех обработчиков...');
    bindApplicationSidebarHandlers();
    bindUserHandlers();
    bindPtoHandlers();
    bindPromptHandlers();

    // Модалки
    bindAccrualModalHandlers();
    bindDocumentRequirementModalHandlers();
    bindPhotoRequirementModalHandlers();
    bindDeductModalHandlers();
    bindEditApplicationPhotoModalHandlers();
    bindPromptModalHandlers();
    bindPtoModalHandlers();
    bindRedactUserModalHandlers();
};

const applyDesktopSidebarWidth = () => {
    const sidebar = document.querySelector('.Sidebar');
    const agentPage = document.querySelector('.AgentPage');
    if (!sidebar || !agentPage) return;

    if (isMobileLayout()) {
        agentPage.style.gridTemplateColumns = '';
        return;
    }

    const isCollapsed = sidebar.classList.contains('Collapsed');
    agentPage.style.gridTemplateColumns = isCollapsed ? '80px 1fr' : '260px 1fr';
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
        applyDesktopSidebarWidth();
        if (!isMobileLayout()) {
            closeMobileNav();
        }
    });
};

const initLeftMenuSidebar = () => {
    const sidebar = document.querySelector('.Sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const agentPage = document.querySelector('.AgentPage');
    
    if (!sidebar || !toggleBtn || !agentPage) {
        console.warn('Элементы сайдбара не найдены');
        return;
    }
    
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('Collapsed');
    }

    applyDesktopSidebarWidth();
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('Collapsed');
        const isCollapsed = sidebar.classList.contains('Collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
        applyDesktopSidebarWidth();
    });
};


