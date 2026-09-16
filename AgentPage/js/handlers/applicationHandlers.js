const bindAllApplicationHandlers = () => {
    console.log('🔄 Биндинг обработчиков для Applications...');
    
    bindCreateApplicationModalHandlers();
    bindApplicationsTableHandlers();
    bindApplicationFilterHandlers();
    bindApplicationSidebarHandlers();

};

const bindCreateApplicationModalHandlers = () => {
    if (!ui.BtnAddNewApplication || !ui.CreateApplicationModal) return;

    // Открытие модалки
    ui.BtnAddNewApplication.removeEventListener('click', openCreateApplicationModal);
    ui.BtnAddNewApplication.addEventListener('click', openCreateApplicationModal);

    // Закрытие по кнопке "Отмена"
    ui.CreateApplicationCancelButton?.removeEventListener('click', closeCreateApplicationModal);
    ui.CreateApplicationCancelButton?.addEventListener('click', closeCreateApplicationModal);

    // Закрытие по клику на оверлей
    ui.CreateApplicationModal.removeEventListener('click', handleModalOverlayClick);
    ui.CreateApplicationModal.addEventListener('click', handleModalOverlayClick);

    // Открытие модалки добавления документа
    ui.CreateApplicationOpenAddDocumentModalButton?.removeEventListener('click', openAddDocumentModal);
    ui.CreateApplicationOpenAddDocumentModalButton?.addEventListener('click', openAddDocumentModal);

    // Открытие модалки добавления фото
    ui.CreateApplicationOpenAddPhotoModalBtn?.removeEventListener('click', openAddPhotoModal);
    ui.CreateApplicationOpenAddPhotoModalBtn?.addEventListener('click', openAddPhotoModal);

    // Удаление фото из списка
    ui.CreateApplicationModalPhotosContainer?.removeEventListener('click', handleRemovePhoto);
    ui.CreateApplicationModalPhotosContainer?.addEventListener('click', handleRemovePhoto);

    // Выбор категории ТС
    ui.CreateApplicationTsCategorySelect?.removeEventListener('change', handleCategoryChange);
    ui.CreateApplicationTsCategorySelect?.addEventListener('change', handleCategoryChange);

    // Кнопка "Создать заявку"
    ui.CreateApplicationCreateButton?.removeEventListener('click', handleCreateApplication);
    ui.CreateApplicationCreateButton?.addEventListener('click', handleCreateApplication);
};

const openCreateApplicationModal = () => {
    ui.CreateApplicationModal.classList.add('Active');
};

const closeCreateApplicationModal = () => {
    ui.CreateApplicationModal.classList.remove('Active');
};

const handleModalOverlayClick = (e) => {
    if (e.target === ui.CreateApplicationModal) {
        closeCreateApplicationModal();
    }
};

const openAddDocumentModal = async (e) => {
    e.preventDefault();
    await openAddTsDocumentModal();
};

const openAddPhotoModal = async (e) => {
    e.preventDefault();
    await openAddTsPhotoModal();
};

const handleRemovePhoto = (e) => {
    const target = e.target.closest('.BtnRemovePhoto');
    if (!target) return;

    const card = target.closest('.UploadedPhotoCard');
    if (!card) return;

    const fileId = card?.getAttribute('data-id');
    if (!fileId) return;

    const storage = state.uploadedPhotosStorage || [];
    const index = storage.findIndex(item => item.id === fileId);
    if (index !== -1) {
        storage.splice(index, 1);
        card.remove();
    }
};

const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    const selectedCategoryId = selectedValue ? parseInt(selectedValue) : null;
    console.log("Пользователь выбрал категорию ID:", selectedCategoryId);
    renderPtos(state.ptos, selectedCategoryId);
};

const handleCreateApplication = async (e) => {
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
        documentFiles: state.uploadedDocsStorage?.map(d => ({
            type: d.type,
            documentUrl: d.url
        })) || [],
        vehiclePhotos: state.uploadedPhotosStorage?.map(p => ({
            vehiclePhotoType: p.type,
            photoUrl: p.url
        })) || []
    };

    console.log("Модель заявки:", model);

    try {
        ui.CreateApplicationCreateButton.disabled = true;
        ui.CreateApplicationCreateButton.textContent = "Сохранение...";
        const isSuccess = await applicationService.createNewApplication(model);
        if (isSuccess) {
            closeCreateApplicationModal();
            resetCreateApplicationForm();
            handleAddNewApplicationToApplicationTable(model);
        }
    } catch (error) {
        alert(error.message);
    } finally {
        ui.CreateApplicationCreateButton.disabled = false;
        ui.CreateApplicationCreateButton.textContent = "Создать заявку";
    }
};

const handleAddNewApplicationToApplicationTable = (model, applicationId) => {
    if (!state.applicationsResult) {
        console.warn('applicationsResult не инициализирован');
        return;
    }
    const newApplication = {
        id: applicationId || Date.now(), 
        brand: model.brand || '',
        model: model.model || '',
        vin: model.vin || '',
        gosNumber: model.gosNumber || '',
        yearOfRelease: model.yearOfRelease || 0,
        fio: model.fio || '',
        email: model.email || '',
        phoneNumber: model.phoneNumber || '',
        ptoId: model.ptoId || 0,
        vehicleCategoryId: model.vehicleCategoryId || 0,
        status: 'Processing', 
        createdAt: new Date().toISOString(),
        photos: model.photos?.map(p => ({ url: URL.createObjectURL(p.file), vehiclePhotoType: p.type })) || [],
        documents: model.documents?.map(d => ({ fileName: d.file.name, type: d.type })) || [],
        _isTemporary: true,
        _tempId: Date.now()
    };
    console.log(newApplication);
    state.applicationsResult.items = [newApplication,...state.applicationsResult.items];
    state.applicationsResult.totalCount = (state.applicationsResult.totalCount || 0) + 1;
    const pageSize = state.applicationsResult.pageSize || 5;
    state.applicationsResult.totalPages = Math.ceil(state.applicationsResult.totalCount / pageSize);
    renderApplicationsTable(state.applicationsResult.items, state.applicationsResult.totalCount);
};

const resetCreateApplicationForm = () => {
    const fields = [
        "CreateApplication-VinNumber",
        "CreateApplication-GosNumber",
        "CreateApplication-CarBrand",
        "CreateApplication-CarModel",
        "CreateApplication-CarYear",
        "CreateApplication-FIO",
        "CreateApplication-Email",
        "CreateApplication-PhoneNumber"
    ];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    if (ui.CreateApplicationTsCategorySelect) {
        ui.CreateApplicationTsCategorySelect.value = "";
    }
    if (ui.CreateApplicationPtoSelect) {
        ui.CreateApplicationPtoSelect.innerHTML = '<option value="">Выберите ПТО</option>';
    }

    state.uploadedPhotosStorage = [];
    state.uploadedDocsStorage = [];
    
    if (ui.CreateApplicationModalPhotosContainer) {
        ui.CreateApplicationModalPhotosContainer.innerHTML = '';
    }
    if (ui.CreateApplicationModalDocumentsContainer) {
        ui.CreateApplicationModalDocumentsContainer.innerHTML = '';
    }
};

const bindApplicationsTableHandlers = () => {
    if (!ui.ApplicationsTableBody) return;

    ui.ApplicationsTableBody.removeEventListener('click', handleApplicationRowClick);
    ui.ApplicationsTableBody.addEventListener('click', handleApplicationRowClick);

    bindApplicationsPaginationEvents();
};

const handleApplicationRowClick = (e) => {
    const row = e.target.closest('.ApplicationTableRow');
    if (!row) return;

    const id = Number(row.dataset.applicationId);
    const app = state.applicationsResult?.items?.find(x => x.id === id);
    if (!app) return;

    openApplicationSidebar(app);
};

let searchTimeout = null;

const bindApplicationFilterHandlers = () => {
    const searchInput = document.getElementById("ApplicationsSearchSortInput");
    if (searchInput) {
        searchInput.removeEventListener('input', handleSearchInput);
        searchInput.addEventListener('input', handleSearchInput);
    }

    const sortSelect = document.querySelector(".ApplicationsSortSelect select");
    if (sortSelect) {
        sortSelect.removeEventListener('change', handleSortChange);
        sortSelect.addEventListener('change', handleSortChange);
    }
};

const handleSearchInput = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        filterAndSortApplications();
    }, 300);
};

const handleSortChange = () => {
    filterAndSortApplications();
};

const filterAndSortApplications = () => {
    const searchInput = document.getElementById("ApplicationsSearchSortInput");
    const select = document.querySelector(".ApplicationsSortSelect select");

    const searchValue = searchInput?.value.toLowerCase().trim() || "";
    const sortValue = select?.value || "";

    const result = filterAndSort({
        items: state.applicationsResult?.items || [],
        searchValue,
        searchFields: applicationsSortConfig.searchFields,
        sortValue,
        sortOptions: applicationsSortConfig.sortOptions
    });

    renderApplicationsTable(result);
};

const bindApplicationsPaginationEvents = () => {
    const container = document.querySelector('.ApplicationsPagination');
    if (!container) return;

    container.removeEventListener('click', handlePaginationClick);
    container.addEventListener('click', handlePaginationClick);
};

const handlePaginationClick = async (e) => {
    const button = e.target.closest("button");
    if (!button || button.disabled) return;

    const page = Number(button.dataset.page);
    if (!page) return;

    if (applicationsPagination) {
        await applicationsPagination.loadPage(page);
    }
};

const bindApplicationSidebarHandlers = () => {
    const tabsContainer = document.querySelector('.DetailsTabs');
    if (tabsContainer) {
        tabsContainer.removeEventListener('click', handleSidebarTabClick);
        tabsContainer.addEventListener('click', handleSidebarTabClick);
    }

    document.removeEventListener('click', handleSidebarOutsideClick);
    document.addEventListener('click', handleSidebarOutsideClick);

    const closeBtn = document.querySelector('.DetailsSidebarClose');
    if (closeBtn) {
        closeBtn.removeEventListener('click', closeApplicationSidebar);
        closeBtn.addEventListener('click', closeApplicationSidebar);
    }
};

const handleSidebarTabClick = (e) => {
    const tab = e.target.closest('span');
    if (!tab) return;

    const tabsContainer = tab.closest('.DetailsTabs');
    if (!tabsContainer) return;

    tabsContainer.querySelectorAll('span').forEach(t => t.classList.remove('Active'));
    tab.classList.add('Active');

    const isMedia = tab.textContent.includes('Фото') || tab.textContent.includes('Медиа');
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
};

let isSidebarClosing = false;

const handleSidebarOutsideClick = (e) => {
    const isOpen = ui.Workspace?.classList.contains('SidebarOpen');
    if (!isOpen) return;

    const sidebar = document.querySelector('.DetailsSidebar');
    const clickedInsideSidebar = e.target.closest('.DetailsSidebar');
    const clickedRow = e.target.closest('.ApplicationTableRow');

    if (!clickedInsideSidebar && !clickedRow && !isSidebarClosing) {
        isSidebarClosing = true;
        closeApplicationSidebar();
        setTimeout(() => {
            isSidebarClosing = false;
        }, 300);
    }
};

const openApplicationSidebar = (app) => {
    ui.Workspace?.classList.add('SidebarOpen');
    state.selectedApplication = app;

    resetApplicationSidebarTabs();
    fillApplicationSidebarHeader(app);
    fillApplicationVehicleTab(app);
    fillApplicationMediaTab(app);
};

const closeApplicationSidebar = () => {
    ui.Workspace?.classList.remove('SidebarOpen');
};

