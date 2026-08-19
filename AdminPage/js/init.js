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

const initNotifications = async () =>{
    const notifications = await notificationService.getNotifications(1,10);
    console.log(`Нотификации: ${notifications}`);
    renderNotificationCountField(notifications.length);
};

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

        if (!clickedInsideSidebar && !clickedRow && !ui.EditApplicationPhotoModal.classList.contains('Active')) {
            closeApplicationSidebar();
        }
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
                    if (state.applicationsResult.items.length === 0) {
                        const page = 1;
                        const pageSize = 5;
                        const result = await applicationService.getAllApplications(page, pageSize);
                        state.applicationsResult = result;
                        console.log(result);
                    }
                    renderApplicationsTable(state.applicationsResult.items);
                    renderApplicationsPagination(state.applicationsResult.page,state.applicationsResult.totalPages);
                    bindApplicationsTableEvents();
                    bindApplicationsPaginationEvents();

                    bindSortEvents(document.querySelector(".ApplicationsSortSelect select"),
                                   document.getElementById("ApplicationsSearchSortInput"),
                                   filterAndSortApplications);
                    break;
                case 'users':
                    if (!state.users || state.users.length === 0) {
                        const result = await userService.getAllUsersExcept();
                        console.log("Пользователи: ", result);
                        if (Array.isArray(result)) {
                            state.users = result;
                        }
                    }
                    await renderUsersTable(state.users);
                    bindSortEvents(document.querySelector(".UsersSortSelect select"),
                                   document.getElementById("UsersSearchSortInput"),
                                   filterAndSortUsers);
                    break;
                case 'ptos': 
                    if (state.ptos.length === 0) { 
                        const result = await ptoService.getAllPtos();
                        console.log("ПТО из API:", result);
                        state.ptos = result;
                    }
                    await renderPtosTable(state.ptos);
                    bindSortEvents(document.querySelector(".PtosSortSelect select"),
                                   document.getElementById("PtosSearchSortInput"),
                                   filterAndSortPtos);
                    break;
                case 'prompts': 
                    if (!state.prompts || state.prompts.length === 0) {
                        await ensure.prompts();
                    }
                    renderPromptsTable(state.prompts);
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
                    if (!state.availableagents || state.availableagents.length === 0) {
                        const availableAgents = await userService.getAllAgents();

                        if (Array.isArray(availableAgents)) {
                            state.availableagents = availableAgents;
                        }
                    }

                    if(!state.alltransactions || state.alltransactions.length ===0){
                        const alltransactions = await paymentService.getalltransactions();
                        state.alltransactions = alltransactions;                        
                    }
                    await renderTransactionsTable(state.alltransactions);
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

const initNewPtoModal = () => {
   if (!ui.AddNewPtoModal) return;

   ui.BtnAddNewPto.addEventListener('click', async () => {
      const categories = await vehicleService.getAllVehicleCategories();
      renderPricePolicyTable(categories);
      ui.AddNewPtoModal.classList.add('Active');
   });

   if (ui.AddNewPtoModalOverlay) {
      ui.AddNewPtoModalOverlay.addEventListener('click', closeNewPtoModal);
   }
   
   if (ui.AddNewPtoSubmitButton) {
      ui.AddNewPtoSubmitButton.addEventListener('click', async () => {
           await actions.submitNewPto();
      });
   }
};

const initPhotoRequirementModal = () => {
    if (!ui.AddNewPhotoRequirementModal) return;

    ui.BtnAddNewPhotoRequirement.addEventListener('click', async () => {
       ui.AddNewPhotoRequirementModal.classList.add('Active');
    });

    if (ui.AddNewPhotoRequirementOverlay) {
        ui.AddNewPhotoRequirementOverlay.addEventListener('click', closePhotoRequirementModal);
    }

    if(ui.AddNewPhotoRequirementSubmitButton){
        ui.AddNewPhotoRequirementSubmitButton.addEventListener('click', async () =>{
           await actions.submitNewPhotoRequirement();
        });
    }
};

const initDocumentRequirementModal = () => {
    if (!ui.AddNewDocumentRequirementModal) return;

    ui.BtnAddNewDocumentRequirement.addEventListener('click', async () => {
       ui.AddNewDocumentRequirementModal.classList.add('Active');
    });

    if (ui.AddNewDocumentRequirementOverlay) {
        ui.AddNewDocumentRequirementOverlay.addEventListener('click', closeDocumentRequirementModal);
    }

    if(ui.AddNewDocumentRequirementSubmitButton){
        ui.AddNewDocumentRequirementSubmitButton.addEventListener('click', async () =>{
            await actions.submitNewDocumentRequirement();
        });
    }
};

const initAccrualsModal = () => {
    if(!ui.AccrualBalanceModal) return;

    ui.BtnAccrualToBalance.addEventListener('click', async () => {
        ui.AccrualBalanceModal.classList.add('Active');
    });
   
    if(ui.AccrualBalanceOverlay){
        ui.AccrualBalanceOverlay.addEventListener('click', closeAccrualBalanceModal);
    }
    if(ui.AccrualBalanceSubmitButton){
        ui.AccrualBalanceSubmitButton.addEventListener('click', async () => {
            const model = {
                agentId: Number(ui.AccrualBalanceSelect.value),
                amount: Number(ui.AccrualBalanceCashInput.value),
                comment: ui.AccrualBalanceCommentInput.value,
                idempotencyKey: crypto.randomUUID()
            };
            await actions.submitNewCreditTransaction(model);
        });
    }
    initAmountButtons(ui.QuickAmountButtons, ui.AccrualBalanceCashInput);
};

const initDeductModal = () => {
    if(!ui.DeductBalanceModal) return;

    ui.BtnDeductFromBalance.addEventListener('click', async () => {
        ui.DeductBalanceModal.classList.add('Active');
    });

    if(ui.DeductBalanceOverlay){
        ui.DeductBalanceOverlay.addEventListener('click', closeDeductBalanceModal);
    }

    if(ui.DeductBalanceSubmitButton) {
        ui.DeductBalanceSubmitButton.addEventListener('click', async () => {
            const model = {
                agentId: Number(ui.DeductBalanceSelect.value),
                amount: Number(ui.DeductBalanceCashInput.value),
                comment: ui.DeductBalanceCommentInput.value,
                idempotencyKey: crypto.randomUUID()
            };
            await actions.submitNewDebitTransaction(model);
        });
    }
    initAmountButtons(ui.DeductModalQuickAmountButtons, ui.DeductBalanceCashInput);
};

const initUsersTable = () => {
    redactUserButtons = document.querySelectorAll('.BtnRedactUser');
    deleteUserButtons = document.querySelectorAll('.BtnDeleteUser');
    
    redactUserButtons.forEach(button => {
        const tablerow = button.closest('.UserTableRow');
        const userid = tablerow.getAttribute('data-user-id');
        button.addEventListener('click', () => {
            openRedactUserModal(userid);
        });
    });
    deleteUserButtons.forEach(button => {
        const tablerow = button.closest('.UserTableRow');
        const userid = tablerow.getAttribute('data-user-id');
        button.addEventListener('click', () =>{
            openDeleteUserModal(userid);
        });
    });
    
};

const initRedactUserModal = () => {
    ui.RedactUserModalOverlay.addEventListener('click', closeRedactUserModal);

    const leftMenu = document.querySelector('.RedactUserModalLeftMenu');

    leftMenu.addEventListener('click', (e) => {
        const row = e.target.closest('.RedactUserModalLeftItem');
        if (!row) return;

        document.querySelectorAll('.RedactUserModalLeftItem').forEach(item => {
            item.classList.remove('Active');
        });

        row.classList.add('Active');

        const target = row.dataset.redactusermodalLefttab;

        state.redactUser.activeTab = target;
        console.log("сейчас находимся тут -> " + target);
        
        document.querySelectorAll('.RedactUserModalRightContent').forEach(content => {
            content.classList.remove('Active');
        });

        document.querySelector(`[data-content="${target}"]`)?.classList.add('Active');
    });

    const roleDropdown = document.getElementById('RoleDropdown');
    const selectedRole = document.getElementById('SelectedRole');

    roleDropdown.addEventListener('click', (e) => {
        const item = e.target.closest('.RedactUserModalDropdownItem');

        if (item) {
            selectedRole.textContent = getNormalRoleName(item.dataset.value);
            selectedRole.dataset.roleId = item.dataset.id;

            roleDropdown.classList.remove('Active');
            e.stopPropagation();
            return;
        }

        roleDropdown.classList.toggle('Active');
    });
    const submitButton = document.getElementById('RedactUserModalBtnSubmit');
    submitButton.addEventListener('click', async () => {

        const userId = state.redactUser.userId;
        const activeTab = state.redactUser.activeTab;

        console.log('Подтверждение изменений');
        console.log('User ID:', userId);
        console.log('Активная вкладка:', activeTab);

        switch (activeTab) {

            case 'userRoleChangeContent':
                await submitUserRoleChange(userId);
                break;

            case 'userDebtLimit':
                await submitUserDebtLimitChange(userId);
                break;

            case 'userStatusChangeContent':
                await submitUserStatusChange(userId);
                break;

            default:
                console.error('Неизвестная вкладка:',activeTab);
        }
    });
};

const initPromptsTable = () => {
    redactPromptButtons = document.querySelectorAll('.BtnRedactPrompt');
    deletePromptButtons = document.querySelectorAll('.BtnDeletePrompt');

    redactPromptButtons.forEach(button => {
        const tablerow = button.closest('.PromptTableRow');
        const promptid = tablerow.getAttribute('data-prompt-id');
        button.addEventListener('click', () => {
            openRedactPromptModal(promptid);
        });
    });

    deletePromptButtons.forEach(button => {
        const tablerow = button.closest('.PromptTableRow');
        const promptid = tablerow.getAttribute('data-prompt-id');
        button.addEventListener('click', () =>{
            openDeletePromptModal(promptid);
        });
    });
};

const initPtoTable = () => {
    redactPtoButtons = document.querySelectorAll('.BtnRedactPto');
    deletePtoButtons = document.querySelectorAll('.BtnDeletePto');

    redactPtoButtons.forEach(button => {
        const tablerow = button.closest('.PtoTableRow');
        const ptoid = tablerow.getAttribute('data-pto-id');
        button.addEventListener('click', () => {
            openRedactPtoModal(ptoid);
        });
    });

    deletePtoButtons.forEach(button => {
        const tablerow = button.closest('.PtoTableRow');
        const ptoid = tablerow.getAttribute('data-pto-id');
        button.addEventListener('click', () => {
            openDeletePtoModal(ptoid);
        });
    });
};

const initAmountButtons = (buttons, input) => {
    if (!buttons?.length || !input) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('Active'));
            btn.classList.add('Active');
            input.value = Number(btn.dataset.value) || 0;
        });
    });
};

const initNewPromptModal = () => {
    if (!ui.AddNewPromptModal) return;

    ui.BtnAddNewPrompt.addEventListener('click', () => {
        ui.AddNewPromptModal.classList.add('Active');
    });

    if (ui.AddNewPromptModalOverlay) {
        ui.AddNewPromptModalOverlay.addEventListener('click', closeNewPromptModal);
    }

    if (ui.PromptSubmitBtn) {
        ui.PromptSubmitBtn.addEventListener('click', async () => {
            await actions.submitNewPrompt();
        });
    }
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

const initEditApplicationPhotoModal = () => {
    const mediaTab = document.getElementById('Tab-MediaData');
    if (mediaTab) {

        mediaTab.addEventListener('click', async (e) => {
            const editButton = e.target.closest('.MediaEditButton');
            if (!editButton) return;
            e.preventDefault();
            e.stopPropagation();

            const photoId = Number(editButton.dataset.photoId);

            const application = state.selectedApplication;

            console.log("Выбранная Заявка: ", application);
            if (!application) return;

            const photo = application.photos.find(x => x.id === photoId);

            await ensure.prompts();

            console.log(state.prompts);
            await ensure.neuronNetworks();
            
            console.log(state.availableNeuronNetworks);
            renderNeuronNetworks();

            const input = ui.EditApplicationPhotoTagsInput;
            const suggestions = state.prompts.map(p => ({
                value: p.tag,
                promptId: p.promptId
            }));

            if (!state.photoTagsTagify) {
                state.photoTagsTagify = new Tagify(input, {
                    duplicates: false,
                    maxTags: 30,
                    whitelist: suggestions,
                    enforceWhitelist: true
                });
            }

            state.photoTagsTagify.settings.whitelist = suggestions;

            state.photoTagsTagify.dropdown.hide();
            state.photoTagsTagify.dropdown.refilter?.();

            state.photoTagsTagify.removeAllTags();
            openEditApplicationPhotoModal(photo);
        });
    }
};

const openDeletePtoModal = (id) => {
    ui.DeletePtoModal.classList.add('Active');

    ui.DeletePtoModalOverlay.addEventListener('click', () => {
        closeDeletePtoModal();
    });
    const deletetablePto = state.ptos.find(pto => pto.id == id);
    const ptoName = deletetablePto.name;
    ui.DeletePtoModalWarningSpan.innerHTML = `Вы действительно хотите удалить ПТО "${ptoName}"?`;

    ui.BtnSubmitDeletePto.addEventListener('click', async () => {
        await actions.submitDeletePto(id);
    });
};

const openRedactPtoModal = (id) => {
    ui.RedactPtoModal.classList.add('Active');
    ui.RedactPtoModalOverlay.addEventListener('click', () => {
        closeRedactPtoModal();
    });
};

const openRedactPromptModal = (id) => {
    ui.RedactPromptModal.classList.add('Active');
    ui.RedactPromptModalOverlay.addEventListener('click', () => {
        closeRedactPromptModal();
    });
  
    ui.BtnSubmitRedactPrompt.addEventListener('click', async () => {
        const tag = ui.RedactPromptModalTagInput.value;
        const description = ui.RedactPromptModalDescriptionInput.value;
        const model = {
            promptId: id,
            tag: tag,
            description: description
        };
        await actions.submitRedactPrompt(model);
    });
};

const openDeletePromptModal = (id) => {
    ui.DeletePromptModal.classList.add('Active');

    ui.DeletePromptModalOverlay.addEventListener('click', () => {
        closeDeletePromptModal();
    });
    const deletetablePrompt = state.prompts.find(prompt => prompt.promptId == id);
    const deletePromptTag = deletetablePrompt.tag;

    ui.DeletePromptModalWarningContentSpan.innerHTML = `Вы действительно хотите удалить промпт "${deletePromptTag}"?`;
    ui.BtnSubmitDeletePrompt.addEventListener('click', async () => {
        await actions.submitDeletePrompt(id);
    });
};

const openRedactUserModal = async (id) => {
    console.log("открыт пользователь с id:", id);
    console.log("тип id:", typeof id);
    
    const user = state.users.find(x => x.userId === Number(id));

    console.log("найденный пользователь:", user);
    console.log("Роль пользователя:", user?.role);

    const normalrolenameuser = getNormalRoleName(user.role);
    const userregdate = user.regDate;
    const normaluserregdate = dateTimeFormatter.formatDate(userregdate);

    if (!user) {
        console.error("Пользователь не найден:", id);
        return;
    }
    state.redactUser.userId = user.userId;
    state.redactUser.activeTab = 'userRoleChangeContent';

    ui.RedactUserModal.classList.add('Active');

    await ensure.availableroles();
    console.log(normalrolenameuser);
    console.log(userregdate);
    renderCurrentRoleInRedactUserModal(normalrolenameuser);
    renderUserRegDateInRedactUserModal(normaluserregdate);
    renderAvailableRoles();
    if(user.role !== "Admin" || user.role !== "Moderator"){
        renderUserDebtLimitValue(user.debtLimit);
    }
};

const getNormalRoleName = (roleName) => {
    switch(roleName){
        case "Admin":
            return "Администратор"
            break;
        case "Moderator":
            return "Модератор";
            break;
        case "Agent":
            return "Агент";
            break;
    }
};

const openDeleteUserModal = (id) => {
    ui.DeleteUserModal.classList.add('Active');
    ui.DeleteUserModalOverlay.addEventListener('click', () => {
       closeDeleteUserModal(); 
    });
    const deletableUser = state.users.find(user => user.userId == id);
    const deletableUserName = deletableUser.fio;

    ui.DeleteUserModalWarningContentSpan.innerHTML = `Вы действительно хотите удалить пользователя "${deletableUserName}"?`;
    ui.BtnSubmitDeleteUser.addEventListener('click', async () => {
        await actions.submitDeleteUser(id);
    });
};

const openEditApplicationPhotoModal = (photo) => {
    state.selectedPhoto = photo;
    ui.EditApplicationPhotoModal.classList.add('Active');
    ui.EditApplicationPhotoOriginalPhotoHolder.innerHTML = `<img src="${photo.url}" class="OriginalPhotoPreview"/>`;

    ui.EditApplicationPhotoGeneratedPhotoResultHolder.innerHTML = `
        <div class="GeneratedPhotoPlaceholder">
            Результат генерации появится здесь
        </div>
    `;

    ui.EditApplicationPhotoOverlay.addEventListener('click', () => {
        closeEditApplicationPhotoModal();
    });

    ui.BtnSubmitGeneratePhoto.addEventListener('click', async () => {
        const selectedPromptIds = state.photoTagsTagify.value.map(t => t.promptId);
        const selectedAiId = Number(ui.EditApplicationPhotoNeuronNetworkSelect.value);
        
        const generatephotomodel = {
            applicationId: state.selectedApplication.id,
            photoId: state.selectedPhoto.id,
            AiProvider: selectedAiId,
            promptsIds: selectedPromptIds,
        };
        await actions.generatePhoto(generatephotomodel);
    });
    ui.BtnSubmitGeneratedPhoto.addEventListener('click', async () => {
        await actions.submitGeneratedPhoto();
    });
};

