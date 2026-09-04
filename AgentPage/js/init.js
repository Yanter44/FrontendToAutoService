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
<<<<<<< HEAD
    else{console.log("не удалось");}
=======
    else{console.log("не удалос");}
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
};

const initNotifications = async () => {
    const notifications = await notificationService.getNotifications(1, 10);
<<<<<<< HEAD
    console.log('Нотификации:');
    console.dir(notifications);
=======
    console.log(`Нотификации: ${notifications}`);
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
    const sortedNotifications = [...notifications].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB; 
    });

    console.log(`Загружено уведомлений: ${sortedNotifications.length}`);
    renderNotificationCountField(sortedNotifications.length);
    sortedNotifications.forEach(notification => {
        const template = NotificationTemplates[notification.notificationType];
<<<<<<< HEAD
=======

        if (!template) {
            console.warn(`Не найден шаблон для уведомления: ${notification.notificationType}`);
            return;
        }
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
        const htmlresult = template(notification);
        renderNotification(htmlresult);
    });
};

<<<<<<< HEAD
=======
const initApplicationSidebarTabs = () => {
    const tabsContainer = document.querySelector('.DetailsTabs');
    if (!tabsContainer) return;

    tabsContainer.addEventListener('click', (e) => {
        const clickedTab = e.target.closest('span');
        if (!clickedTab) return;

        const tabs = tabsContainer.querySelectorAll('span');
        tabs.forEach(t => t.classList.remove('Active'));
        clickedTab.classList.add('Active');

        const isMedia = clickedTab.textContent.includes('Фото');

        const vehicleTab = document.getElementById('Tab-VehicleData');
        const mediaTab = document.getElementById('Tab-MediaData');

        if (isMedia) {
            vehicleTab?.classList.remove('Active', 'FadeIn');
            mediaTab?.classList.add('Active');
            setTimeout(() => mediaTab?.classList.add('FadeIn'), 10);
        } else {
            mediaTab?.classList.remove('Active', 'FadeIn');
            vehicleTab?.classList.add('Active');
            setTimeout(() => vehicleTab?.classList.add('FadeIn'), 10);
        }
    });
};

const initSidebarCloseOnOutsideClick = () => {

    document.addEventListener('click', (e) => {
        const isOpen = ui.Workspace.classList.contains('SidebarOpen');
        if (!isOpen) return;

        const sidebar = document.querySelector('.DetailsSidebar');
        const clickedInsideSidebar = e.target.closest('.DetailsSidebar');
        const clickedRow = e.target.closest('.ApplicationTableRow');

        if (!clickedInsideSidebar && !clickedRow) {
            closeApplicationSidebar();
        }
    });
};

const closeApplicationSidebar = () => {
    ui.Workspace.classList.remove('SidebarOpen');
};

>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
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
<<<<<<< HEAD
                    await ensure.applications();
                    await ensure.vehicleCategories();
                    renderVehicleCategories(state.vehicleCategories);
                    await ensure.ptos();
                    await ensure.applicationsMetrics();
                    renderApplicationsMetrics(state.applicationsMetrics);
                    await applicationsPagination.loadPage(1);          
=======
                    if (state.applicationsResult.items.length === 0) {
                        const page = 1;
                        const pageSize = 5;
                        const result = await applicationService.getApplications(page, pageSize);
                        state.applicationsResult = result;
                        console.log(result);
                    }
                    if(state.vehicleCategories.length === 0){
                        const categories = await vehicleService.getAllVehicleCategories();
                        console.log("Категории из API:", categories);
                        state.vehicleCategories = categories;
                        renderVehicleCategories(categories);
                    }
                    if(state.ptos.length === 0){
                        const ptos = await ptoService.getAllPtos();
                        console.log("ПТО из API:", ptos);                  
                        state.ptos = ptos;
                    }
                    if (Object.values(state.applicationsMetrics ?? {}).every(v => v == null)) {
                        const result = await applicationService.getApplicationsMetrics();
                        state.applicationsMetrics = {
                            totalApplicationsCount: result.totalApplicationsCount ?? 0,
                            totalApplicationsInModerationCount: result.totalApplicationsInModerationCount ?? 0,
                            totalApplicationsApprovedCount: result.totalApplicationsApprovedCount ?? 0,
                            totalApplicationsTodayCount: result.totalApplicationsTodayCount ?? 0
                        };
                        console.log('Метрики загружены:', state.applicationsMetrics);
                        renderApplicationsMetrics(state.applicationsMetrics);
                    } else {
                        renderApplicationsMetrics(state.applicationsMetrics);
                    }
                    renderApplicationsTable(state.applicationsResult.items);
                    renderApplicationsPagination(state.applicationsResult.page, state.applicationsResult.totalPages);
                    bindApplicationsTableEvents();
                    bindApplicationsPaginationEvents();
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
                    bindSortEvents(document.querySelector(".ApplicationsSortSelect select"),
                                   document.getElementById("ApplicationsSearchSortInput"),
                                   filterAndSortApplications);
                    break;
                case 'finances':
<<<<<<< HEAD
                    await ensure.financesHistory();
                    await ensure.finances();
                    await financesPagination.loadPage(1);
                    renderAgentFinanceStatus(state.finances.balance, state.finances.debtlimit, state.finances.currentdebt);
=======
                    if (state.financesHistory.length === 0) {
                        const result = await agentservice.getmybalancetransactionstory();  
                        state.financesHistory = result;                
                    }  
                    if (Object.values(state.finances ?? {}).every(v => v == null)) {
                        const balanceresult = await agentservice.getmybalance();
                        const debtlimitresult = await agentservice.getmydebtlimit();
                        const currentDebt = await agentservice.getmycurrentdebt();
                        state.finances.balance = balanceresult.data;
                        state.finances.debtlimit = debtlimitresult.data;
                        state.finances.currentdebt = currentDebt.data;
                        renderAgentFinanceStatus(state.finances.balance, state.finances.debtlimit, state.finances.currentdebt);
                    }
                    else {
                        renderAgentFinanceStatus(state.finances.balance, state.finances.debtlimit, state.finances.currentdebt);
                    }
                    renderFinancesTable(state.financesHistory);
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
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
<<<<<<< HEAD
const bindAllHandlers = () => {
    console.log('🔄 Биндинг всех обработчиков...');
    bindAllApplicationHandlers();
    bindPhotoModalHandlers();
    bindDocumentModalHandlers();
};
=======

const initCreateApplicationModal = () => {
    if (!ui.BtnAddNewApplication || !ui.CreateApplicationModal) return;

    ui.BtnAddNewApplication.addEventListener('click', () => {
        ui.CreateApplicationModal.classList.add('Active');
    });

    ui.CreateApplicationCancelButton?.addEventListener('click', () => {
        ui.CreateApplicationModal.classList.remove('Active');
    });

    ui.CreateApplicationModal.addEventListener('click', (e) => {
        if (e.target === ui.CreateApplicationModal) {
            ui.CreateApplicationModal.classList.remove('Active');
        }
    });

    ui.CreateApplicationOpenAddDocumentModalButton?.addEventListener('click', async (e) => {
        e.preventDefault();
        await openAddTsDocumentModal();
    });

    ui.CreateApplicationOpenAddPhotoModalBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 
        await openAddTsPhotoModal();
    });

    ui.CreateApplicationModalPhotosContainer?.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('BtnRemovePhoto')) {
            const card = e.target.closest('.UploadedPhotoCard');
            const fileId = card?.getAttribute('data-id');
            
            const index = uploadedPhotosStorage.findIndex(item => item.id === fileId);
            if (index !== -1) uploadedPhotosStorage.splice(index, 1);
            card?.remove();
        }
    });

    ui.CreateApplicationTsCategorySelect?.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedCategoryId = selectedValue ? parseInt(selectedValue) : null;
        console.log("Пользователь выбрал категорию ID:", selectedCategoryId);
        renderPtos(state.ptos, selectedCategoryId);
    });

    ui.CreateApplicationCreateButton?.addEventListener("click", async (e) => {
        e.preventDefault();
        const model = {
            vehicleCategoryId: Number(ui.CreateApplicationTsCategorySelect.value),
            vin: document.getElementById("CreateApplication-VinNumber")?.value.trim() || "",
            gosNumber: document.getElementById("CreateApplication-GosNumber")?.value.trim() || "",
            brand: document.getElementById("CreateApplication-CarBrand")?.value.trim() || "",
            model: document.getElementById("CreateApplication-CarModel")?.value.trim() || "",
            yearOfRelease: Number(document.getElementById("CreateApplication-CarYear")?.value) || 0,
            fio: document.getElementById("CreateApplication-FIO")?.value.trim() || "",
            email: document.getElementById("CreateApplication-Email")?.value.trim() || "",
            phoneNumber: document.getElementById("CreateApplication-PhoneNumber")?.value.trim() || "",
            ptoId: Number(ui.CreateApplicationPtoSelect.value) || 0,
            photos: state.uploadedPhotosStorage.slice(),
            documents: state.uploadedDocsStorage.slice()
        };

        try {
            ui.CreateApplicationCreateButton.disabled = true;
            ui.CreateApplicationCreateButton.textContent = "Сохранение...";
            const modelformdata = actions.createApplicationFormData(model);
            const isSuccess = await applicationService.createNewApplication(modelformdata);
        } catch (error) {
            alert(error.message);
        } finally {
            ui.CreateApplicationCreateButton.disabled = false;
            ui.CreateApplicationCreateButton.textContent = "Создать заявку";
        }
    });
};

const initAddTsPhotoModal = () => {
    ui.AddTsPhotoModalFileDropZone?.addEventListener("change", handlePhotoFileChange);
    ui.AddTsPhotoSaveButton?.addEventListener("click", savePhoto);
    ui.AddTsPhotoCancelButton?.addEventListener("click", closePhotoModal);
    ui.AddTsPhotoModalOverlay?.addEventListener("click", closePhotoModal);
    ui.CreateApplicationModalPhotosContainer?.addEventListener("click", removePhoto);
};

const openAddTsPhotoModal = async () => {
    state.photorequirements = await requirementService.getAllPhotoRequirements();
    renderPhotoRequirements(state.photorequirements);
    state.selectedPhotoFile = null;
    resetPhotoDropZone();
    renderAddTsPhotoModal();
};

const handlePhotoFileChange = (e) => {
     if (e.target && e.target.id === 'AddTsPhotoModalPhotoInput') {
            const file = e.target.files[0];
            if (file) {
                state.selectedPhotoFile = file;
                const objectUrl = URL.createObjectURL(file);
            
                ui.AddTsPhotoModalFileDropZone.innerHTML = `
                    <img src="${objectUrl}" class="DropZonePreviewImg" alt="Превью авто">
                    <input type="file" id="AddTsPhotoModalPhotoInput" accept="image/*">
                `;
            }
    }
};

const savePhoto = () => {
        if (!state.selectedPhotoFile) {
            alert('Пожалуйста, выберите файл перед добавлением!');
            return;
        }

        const selectElement = document.getElementById('AddTsPhotoModalPhotoTypeSelect');
        const typeText = selectElement.options[selectElement.selectedIndex].text;
        const fileId = 'photo_' + Date.now();

        state.uploadedPhotosStorage.push({
            id: fileId,
            type: typeText,
            file: state.selectedPhotoFile
        });

        const imgUrl = URL.createObjectURL(state.selectedPhotoFile);
        const photoCardHTML = `
            <div class="UploadedPhotoCard" data-id="${fileId}">
                <button type="button" class="BtnRemovePhoto">&times;</button>
                <img src="${imgUrl}" alt="${typeText}">
                <div class="PhotoBadge">${typeText}</div>
            </div>
        `;

        ui.CreateApplicationModalUploadWrapper?.insertAdjacentHTML('beforebegin', photoCardHTML);
        closePhotoModal();   
};

const removePhoto = () =>{

}

const closePhotoModal = () => {
    ui.AddTsPhotoModal.classList.remove("Active");
    state.selectedPhotoFile = null;
    resetPhotoDropZone();
}

const initAddTsDocumentModal = () => {
    ui.AddTsDocumentModalFileDropZone?.addEventListener("change", handleDocumentFileChange);
    ui.AddTsDocumentModalSaveButton?.addEventListener("click", saveDocument);
    ui.AddTsDocumentCancelButton?.addEventListener("click", closeDocumentModal);
    ui.AddTsDocumentModalOverlay?.addEventListener("click", closeDocumentModal);
    ui.CreateApplicationModalDocumentsContainer?.addEventListener("click", removeDocument);
};


const openAddTsDocumentModal = async () => {
    state.documentrequirements = await requirementService.getAllDocumentRequirements();
    renderDocumentRequirements(state.documentrequirements);
    state.selectedDocFile = null;
    resetDocumentDropZone();
    renderAddTsDocumentModal();
};

const handleDocumentFileChange = (e) => {
    if (e.target.id !== "AddTsDocumentModalDocumentInput")
        return;
    const file = e.target.files[0];
    if (!file)
        return;
    state.selectedDocFile = file;
    const fullName = file.name;
    const fileSizeText =
        file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(1)} Кб`
            : `${(file.size / (1024 * 1024)).toFixed(2)} Мб`;
    let displayName = fullName;

    if (fullName.length > 20) {
        const dot = fullName.lastIndexOf(".");
        const ext = fullName.substring(dot);
        displayName = fullName.substring(0, 12) + "..." + ext;
    }

    ui.AddTsDocumentModalFileDropZone.innerHTML = `
        <div class="DocPreviewInfo" style="display:flex;flex-direction:column;align-items:center;gap:4px;font-family:'Manrope',sans-serif;">
            <span style="font-size:32px;">📄</span>

            <span class="DropZoneText"
                  style="font-weight:700;color:#1e293b;text-align:center;word-break:break-all;font-size:13px;">
                ${displayName}
            </span>

            <span style="font-size:11px;color:#64748b;font-weight:500;">
                Размер: ${fileSizeText}
            </span>
        </div>

        <input
            type="file"
            id="AddTsDocumentModalDocumentInput"
            accept=".pdf,.jpg,.jpeg,.png">`;
}

const saveDocument = () => {
    if (!state.selectedDocFile) {
        alert("Пожалуйста, выберите документ.");
        return;
    }
    const select = ui.AddTsDocumentModalDocumentTypeSelect;
    const fileId = "doc_" + Date.now();
    state.uploadedDocsStorage.push({
        id: fileId,
        type: select.options[select.selectedIndex].text,
        file: state.selectedDocFile
    });

    const html = `
        <div class="UploadedDocCard" data-id="${fileId}">
            <button class="BtnRemovePhoto">&times;</button>

            <span style="font-size:28px;margin-bottom:4px;">📄</span>

            <span
                style="font-family:'Manrope',sans-serif;
                font-size:11px;
                font-weight:700;
                color:#1e293b;
                text-align:center;
                line-height:1.2;">
                ${select.options[select.selectedIndex].text}
            </span>
        </div> `;

    ui.CreateApplicationModalDocsUploadWrapper.insertAdjacentHTML(
        "beforebegin",
        html
    );
    closeDocumentModal();
}

const removeDocument = (e) => {
    if (!e.target.classList.contains("BtnRemovePhoto"))
        return;
    const card = e.target.closest(".UploadedDocCard");
    const id = card.dataset.id;
    const index = state.uploadedDocsStorage.findIndex(x => x.id === id);
    if (index !== -1)
        state.uploadedDocsStorage.splice(index, 1);
    card.remove();
}

const closeDocumentModal = () => {
    ui.AddTsDocumentModal.classList.remove("Active");
    state.selectedDocFile = null;
    resetDocumentDropZone();
}

>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
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
                
<<<<<<< HEAD
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
=======
                console.log("Выбран старт:", startDate);
                console.log("Выбран конец:", endDate);
                
                // Тут вызываешь свою функцию обновления таблицы, например:
                // loadFinanceStory(startDate, endDate);
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
            }
        }
    });
};