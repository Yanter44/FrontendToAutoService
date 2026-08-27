
const renderProfile = (data) => {
    const firstLetter = data.name?.[0]?.toUpperCase() ?? '?';
    const roleText = `Должность: ${data.role}`;

    ui.useravatarletter.textContent = firstLetter;
    ui.username.textContent = escapeHtml(data.name);
    ui.userrole.textContent = roleText;
      
    if (ui.DropDownUseravatarletter) ui.DropDownUseravatarletter.textContent = firstLetter;
    if (ui.DropDownUsername) ui.DropDownUsername.textContent = data.name;
    if (ui.DropDownUserrole) ui.DropDownUserrole.textContent = roleText;

    ui.DropDownSignOutButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await authService.signOut();
    });
};

const renderApplicationsTable = (applications) => {
    const tbody = ui.ApplicationsTableBody;
    if (!tbody) return;

    if (!applications || applications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Заявок нет</td></tr>';
        return;
    }

    tbody.innerHTML = applications.map(app => `
        <tr class="ApplicationTableRow" data-application-id="${app.id}">
            <td>${app.id}</td>
            <td>${app.brand || ''} ${app.model || ''}</td>
            <td>${app.vin || '—'}</td>
            <td>${app.fio || '—'}</td>
            <td>${getApplicationStatusBadgeHtml(app.status)}</td>
            <td>${app.createdAt ? new Date(app.createdAt).toLocaleDateString('ru-RU') : '—'}</td>
        </tr>
    `).join('');
};

const renderApplicationsPagination = (page, totalPages) => {
    const container = document.querySelector('.ApplicationsPagination');
    let html = '';
    html += `
        <button
            class="ApplicationsPaginationButton"
            data-page="${page - 1}"
            ${page === 1 ? 'disabled' : ''}>
            ←
        </button>
    `;

    if (totalPages <= 7) {

        for (let i = 1; i <= totalPages; i++) {

            html += `
                <button
                    class="ApplicationsPaginationNumber ${i === page ? 'Active' : ''}"
                    data-page="${i}">
                    ${i}
                </button>
            `;
        }
    }
    else {
        html += `
            <button
                class="ApplicationsPaginationNumber ${page === 1 ? 'Active' : ''}"
                data-page="1">
                1
            </button>
        `;
        if (page > 3) {
            html += `<span class="ApplicationsPaginationDots">...</span>`;
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            html += `
                <button
                    class="ApplicationsPaginationNumber ${i === page ? 'Active' : ''}"
                    data-page="${i}">
                    ${i}
                </button>
            `;
        }
        if (page < totalPages - 2) {
            html += `<span class="ApplicationsPaginationDots">...</span>`;
        }
        html += `
            <button
                class="ApplicationsPaginationNumber ${page === totalPages ? 'Active' : ''}"
                data-page="${totalPages}">
                ${totalPages}
            </button>
        `;
    }
    html += `
        <button
            class="ApplicationsPaginationButton"
            data-page="${page + 1}"
            ${page === totalPages ? 'disabled' : ''}>
            →
        </button>
    `;
    container.innerHTML = html;
};

const getApplicationStatusBadgeHtml = (status) => {
    switch (status) {
        case "Moderated":
            return '<span class="StatusBadge StatusYellow">На модерации</span>';
        case "Confirmed":
            return '<span class="StatusBadge StatusGreen">Одобрено</span>';
        case "Rejected":
            return '<span class="StatusBadge StatusRed">Отклонено</span>';
        default:
            return `<span class="StatusBadge">${status}</span>`;
    }
};

const bindApplicationsTableEvents = () => {
    if (!ui.ApplicationsTableBody) return;

    ui.ApplicationsTableBody.addEventListener('click', (e) => {
        const row = e.target.closest('.ApplicationTableRow');
        if (!row) return;

        const id = Number(row.dataset.applicationId);
        const app = state.applicationsResult.items.find(x => x.id === id);
        if (!app) return;

        openApplicationSidebar(app);
    });
};

const bindApplicationsPaginationEvents = () => {
    const container = document.querySelector('.ApplicationsPagination');
    if (!container) return;
    container.onclick = async (e) => {

        const button = e.target.closest("button");
        if (!button) return;
        if (button.disabled) return;

        const page = Number(button.dataset.page);
        if (!page) return;

        const result = await applicationService.getApplications(page,state.applicationsResult.pageSize);
        state.applicationsResult = result;
        renderApplicationsTable(state.applicationsResult.items);
        renderApplicationsPagination(state.applicationsResult.page,state.applicationsResult.totalPages);
        bindApplicationsTableEvents();
    };
};
const bindSortEvents = (select, searchInput, callback) => {
    if (select) {
        select.onchange = callback;
    }
    if (searchInput) {
        searchInput.oninput = callback;
    }
};
const filterAndSortAccruals = () => {
    const searchInput = document.getElementById("AccrualsSearchSortInput");
    const select = document.querySelector(".AccrualsSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;

    const result = filterAndSort({
        items: state.alltransactions,
        searchValue,
        searchFields: accrualsSortConfig.searchFields,
        sortValue,
        sortOptions: accrualsSortConfig.sortOptions
    });
    renderTransactionsTable(result);
};

const filterAndSortPrompts = () => {
    const searchInput = document.getElementById("PromptsSearchSortInput");
    const select = document.querySelector(".PromptsSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;
    
    const result = filterAndSort({
        items: state.prompts,
        searchValue,
        searchFields: promptsSortConfig.searchFields,
        sortValue,
        sortOptions: promptsSortConfig.sortOptions
    });
    renderPromptsTable(result);
};

const filterAndSortPtos = () => {
    const searchInput = document.getElementById("PtosSearchSortInput");
    const select = document.querySelector(".PtosSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;

    const result = filterAndSort({
        items: state.ptos,
        searchValue,
        searchFields: ptosSortConfig.searchFields,
        sortValue,
        sortOptions: ptosSortConfig.sortOptions
    });
    renderPtosTable(result);
};

const filterAndSortUsers = () => {
    const searchInput = document.getElementById("UsersSearchSortInput");
    const select = document.querySelector(".UsersSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;

    const result = filterAndSort({
        items: state.users,
        searchValue,
        searchFields: usersSortConfig.searchFields,
        sortValue,
        sortOptions: usersSortConfig.sortOptions
    });
    renderUsersTable(result);
};


const filterAndSortApplications = () => {
    const searchInput = document.getElementById("ApplicationsSearchSortInput");
    const select = document.querySelector(".ApplicationsSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;

    const result = filterAndSort({
        items: state.applicationsResult.items,
        searchValue,
        searchFields: applicationsSortConfig.searchFields,
        sortValue,
        sortOptions: applicationsSortConfig.sortOptions
    });
    renderApplicationsTable(result);
};

const openApplicationSidebar = (app) => {
    ui.Workspace.classList.add('SidebarOpen');
    state.selectedApplication = app;
    resetApplicationSidebarTabs();
    fillApplicationSidebarHeader(app);
    fillApplicationVehicleTab(app);
    fillApplicationMediaTab(app);
};

const resetApplicationSidebarTabs = () => {
    document.querySelectorAll('.DetailsTabs span').forEach(t => t.classList.remove('Active'));

    const first = document.querySelector('.DetailsTabs span');
    if (first) first.classList.add('Active');

    const vehicle = document.getElementById('Tab-VehicleData');
    const media = document.getElementById('Tab-MediaData');

    vehicle?.classList.add('Active');
    vehicle?.classList.add('FadeIn');

    media?.classList.remove('Active', 'FadeIn');
};

const fillApplicationSidebarHeader = (app) => {
    const title = document.querySelector('.DetailsHeader h3');
    if (title) title.textContent = `Заявка №${app.id}`;

    const header = document.querySelector('.DetailsHeader');

    let badge = header.querySelector('.StatusBadge');
    if (!badge) {
        badge = document.createElement('span');
        header.appendChild(badge);
    }

    badge.className = 'StatusBadge';

    if (app.status === "Moderated") {
        badge.classList.add('StatusYellow');
        badge.textContent = 'На модерации';
    } else if (app.status === "Confirmed") {
        badge.classList.add('StatusGreen');
        badge.textContent = 'Одобрено';
    } else if (app.status === "Rejected") {
        badge.classList.add('StatusRed');
        badge.textContent = 'Отклонено';
    } else {
        badge.textContent = app.status;
    }
};

const fillApplicationVehicleTab = (app) => {
    const el = document.getElementById('Tab-VehicleData');
    if (!el) return;

    el.innerHTML = `
        <div class="SidebarInfoList">
            <div class="TsInfo">ТС: ${app.brand || ''} ${app.model || ''}</div>
            <div class="TsInfo">VIN: ${app.vin || '—'}</div>
            <div class="TsInfo">Гос: ${app.gosNumber || '—'}</div>
            <div class="TsInfo">Год: ${app.yearOfRelease || '—'}</div>
            <hr>
            <div class="TsInfo">Клиент: ${app.fio || '—'}</div>
            <div class="TsInfo">Тел: ${app.phoneNumber || '—'}</div>
            <div class="TsInfo">Email: ${app.email || '—'}</div>
        </div>
    `;
};

const fillApplicationMediaTab = (app) => {
    const el = document.getElementById('Tab-MediaData');
    if (!el) return;

    const photos = (app.photos || []).map(p => `
        <div class="MediaCard">
            <button class="MediaEditButton" data-photo-id="${p.id}" title="Редактировать фото">✏️ </button>

            <a href="${p.url}" target="_blank">
                <div class="MediaPreview" style="background-image:url('${p.url}')"></div>
            </a>

            <div class="MediaLabel">${p.vehiclePhotoType}</div>
        </div>
    `).join('');

    const docs = (app.documents || []).map(d => `
        <a class="MediaCard Doc" href="${d.url}" target="_blank">
            <div class="DocIcon">📄</div>
            <div class="MediaLabel">${d.fileName}</div>
        </a>
    `).join('');

    el.innerHTML = `
        <div class="MediaSection">
            <h4>Фотографии</h4>
            <div class="MediaGrid">${photos || '<div class="Empty">Нет фото</div>'}</div>
        </div>

        <div class="MediaSection">
            <h4>Документы</h4>
            <div class="MediaGrid Docs">${docs || '<div class="Empty">Нет документов</div>'}</div>
        </div>
    `;
};

const renderPhotoRequirementsTable = async (photoRequirements) => {
    if (!ui.PhotoRequirementsTableBody) return;
    ui.PhotoRequirementsTableBody.innerHTML = '';
    photoRequirements.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.photoType}</td>
            <td>${item.displayName}</td>
            <td>
                <input type="checkbox" ${item.isRequire ? 'checked' : ''} disabled>
            </td>
        `;
        ui.PhotoRequirementsTableBody.appendChild(row);
    });
};

const renderDocumentRequirementsTable = async (documentRequirements) => {
    if (!ui.DocumentRequirementsTableBody) return;
    ui.DocumentRequirementsTableBody.innerHTML = '';
    documentRequirements.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.documentType}</td>
            <td>${item.displayName}</td>
            <td>
                <input type="checkbox" ${item.isRequire ? 'checked' : ''} disabled>
            </td>`;
        ui.DocumentRequirementsTableBody.appendChild(row);
    });
};

const renderAgentsToSelect = (agents, selectElement, onChange) => {
    if (!selectElement) return;

    selectElement.innerHTML = '';

    agents.forEach(agent => {
        const option = document.createElement('option');

        option.value = agent.id;
        option.textContent = agent.fio;

        selectElement.appendChild(option);
    });

    if (!selectElement.dataset.bound) {
        selectElement.addEventListener('change', onChange);
        selectElement.dataset.bound = 'true';
    }

    selectElement.value = agents[0]?.id;
};

const renderAvailableAgents = (agents) => {
    console.log("Список агентов: ", agents);
    renderAgentsToSelect(agents, ui.AccrualBalanceSelect, updateAccrualSelectedAgentBalance);
    renderAgentsToSelect(agents, ui.DeductBalanceSelect, updateDeductSelectedAgentBalance);

    updateAccrualSelectedAgentBalance();
    updateDeductSelectedAgentBalance();
};

const updateAccrualSelectedAgentBalance = () => {
    const selectedId = Number(ui.AccrualBalanceSelect.value);

    const agent = state.availableagents.find(x => x.id === selectedId);

    if (!agent) return;

    ui.CurrentAgentBalanceValue.textContent = `${agent.balance.toLocaleString('ru-RU')} ₽`;
};

const updateDeductSelectedAgentBalance = () => {
    const selectedId = Number(ui.DeductBalanceSelect.value);
    const agent = state.availableagents.find(x => x.id === selectedId);
    if (!agent) return;
    ui.DeductModalCurrentAgentBalanceValue.textContent = `${agent.balance.toLocaleString('ru-RU')} ₽`;
};

const renderNotification = (html) => {
    ui.NotificationModalBody.insertAdjacentHTML("afterbegin", html);
};

const renderPtosTable = (ptos) => {
    const tbody = ui.PtoMainTableBody;
    if (!tbody) return;

    if (!ptos || ptos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #64748b;">Пункты ТО не найдены</td></tr>';
        return;
    }

    const tableRowsHTML = ptos.map(pto => {
        const ptoId = pto.id ?? '—';
        const ptoName = escapeHtml(pto.name || 'Без названия');
        const ptoRsa = escapeHtml(pto.rsaNumber || '—');
        const ptoAddress = escapeHtml(pto.address || '—');
        return `
            <tr class="PtoTableRow" data-pto-id="${ptoId}">
                <td>${ptoId}</td>
                <td style="font-weight: 500;">${ptoName}</td>
                <td style="font-family: monospace;">${ptoRsa}</td>
                <td>${ptoAddress}</td>
                <td>
                    <div class="PtoActionsWrapper">
                        <button type="button" class="BtnRedactPto">
                            <img src="/Assets/Images/redactt.png" class="BtnIcon" />
                        </button>
                        <button type="button" class="BtnDeletePto">
                            <img src="/Assets/Images/remove.png"  class="BtnIcon" />
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = tableRowsHTML;
    initPtoTable();
};

const renderPricePolicyTable = (categories) => {
    const tbody = ui.PtoPricePolicyTableBody;
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!categories || categories.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align:center;">Нет доступных категорий</td></tr>`;
        return;
    }

    categories.forEach(category => {
        const row = document.createElement('tr');
        row.className = 'PtoPricePolicyTableRow';
        row.setAttribute('data-category-id', category.id);

        row.innerHTML = `
            <td>${category.name}</td>
            <td>
                <div class="PtoPriceInputWrapper">
                    <input type="number" min="0" class="PtoPriceInputTable PtoPricePolicyInput" placeholder="0">
                    <span class="PtoPriceCurrencySign">₽</span>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
};

const renderPromptsTable = (prompts) => {
    const tbody = document.querySelector('.PromptTable tbody');
    if (!tbody) return;

    if (!prompts || prompts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #64748b;">Промпты не найдены</td></tr>';
        return;
    }

    const tableRowsHTML = prompts.map(prompt => {
        const promptId = prompt.promptId ?? '—';
        const promptTag = escapeHtml(prompt.tag || 'без_тега');
        const promptDescription = escapeHtml(prompt.description || 'Нет описания');

        return `<tr class="PromptTableRow" data-prompt-id="${promptId}">
                <td>${promptId}</td>
                <td><span class="PromptTagBadge">#${promptTag}</span></td>
                <td>${promptDescription}</td>
                <td>
                    <div class="PromptActionsWrapper">
                        <button type="button" class="BtnRedactPrompt">
                            <img src="/Assets/Images/redactt.png" class="BtnIcon" />
                        </button>
                        <button type="button" class="BtnDeletePrompt">
                            <img src="/Assets/Images/remove.png"  class="BtnIcon" />
                        </button>
                    </div>
                </td>
            </tr>`;
    }).join('');
    tbody.innerHTML = tableRowsHTML;
    initPromptsTable();
};

const renderUsersTable = (users) => {
    const tbody = document.querySelector('.UsersTable tbody');
    if (!tbody) return;

    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #64748b;">Пользователи не найдены</td></tr>';
        return;
    }

    const tableRowsHTML = users.map(user => {
        // if(user.userId === )
        const userId = user.userId ?? '—';
        const userRole = user.role ?? '—';
        const userFio = escapeHtml(user.fio || '—');
        const userEmail = escapeHtml(user.email || '—');
        const userRegDate = user.regDate;

        let displayBalance = '—';
        let displayDebtLimit = '—';

        if (userRole === "Agent") {
            displayBalance = typeof user.balance === 'number' ? `${user.balance.toLocaleString('ru-RU')} ₽` : '0 ₽';
            displayDebtLimit = typeof user.debtLimit === 'number'  ? `${user.debtLimit.toLocaleString('ru-RU')} ₽` : '0 ₽';
        }

        return `<tr class="UserTableRow" data-user-id="${userId}">
                <td>${userId}</td>
                <td>${userFio}</td>
                <td>${userEmail}</td>
                <td>${getUserRoleBadgeHTML(userRole)}</td>
                <td style="font-weight: 600; color: ${userRole === "Agent" ? '#10b981' : '#0f172a'};">
                    ${displayBalance}/${displayDebtLimit}
                </td>
                <td>${dateTimeFormatter.formatDate(userRegDate)}</td>
                <td>
                 <div class="UserActionsWrapper">
                        <button type="button" class="BtnRedactUser">
                            <img src="/Assets/Images/redactt.png" class="BtnIcon" />
                        </button>
                        <button type="button" class="BtnDeleteUser">
                            <img src="/Assets/Images/remove.png"  class="BtnIcon" />
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = tableRowsHTML;
    initUsersTable();
};

const getUserRoleBadgeHTML = (role) => {
    switch (role) {
        case "Admin":
            return '<span class="UserRoleBadge UserRoleAdmin">Админ</span>';
        case "Agent":
            return '<span class="UserRoleBadge UserRoleAgent StatusGreen">Агент</span>';
        case "Moderator":
            return '<span class="UserRoleBadge UserRoleModerator">Модератор</span>';
        default:
            return `<span class="StatusBadge">${status}</span>`;
    }
};

const renderNotificationCountField = (notificationsTotalCount) => {
    if(ui.NotificationCountField){
        ui.NotificationCountField.textContent = notificationsTotalCount;
    }
};
const renderLoaderProgress = (percent) => {
    ui.LoaderProgressBarProgressFill.style.width = `${percent}%`;
    ui.LoaderLoadingProgressBarPercents.innerHTML = `${percent}%`;
};
const renderAvailableRoles = () => {
    const dropdownList = document.getElementById('RoleDropdownList');
    dropdownList.innerHTML = '';

    state.availableRoles.forEach(role => {
        const item = document.createElement('div');
        item.className = 'RedactUserModalDropdownItem';

        item.dataset.value = role.name;
        item.dataset.id = role.id;

        item.innerHTML = `
            <div class="RedactUserModalDropDownItemUserRoleLeftIcon ${role.name.toLowerCase()}">
                <svg fill="currentColor" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;}</style></defs><title>user</title><path d="M16,4a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7A7,7,0,0,0,16,2Z"></path><path d="M26,30H24V25a5,5,0,0,0-5-5H13a5,5,0,0,0-5,5v5H6V25a7,7,0,0,1,7-7h6a7,7,0,0,1,7,7Z"></path><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"></rect></g></svg>
            </div>
            <div class="RedactUserModalDropDownItemUserRoleRightDescription">
                <span>${getNormalRoleName(role.name)}</span>
                <span>${getRoleDescription(role.name)}</span>
            </div>
        `;
        dropdownList.appendChild(item);
    });
};

const getRoleDescription = (role) => {

    const descriptions = {
        Admin: "Полный доступ ко всем разделам системы",
        Moderator: "Доступ к модерации заявок и проверке данных",
        Agent: "Создание заявок и работа с клиентами"
    };

    return descriptions[role] ?? "";
};

const renderTransactionsTable = (transactions) => {
    if (!ui.AccrualsTableBody) return;

    ui.AccrualsTableBody.innerHTML = '';

    if (!transactions || transactions.length === 0) {
        ui.AccrualsTableBody.innerHTML = `<tr><td colspan="5">Транзакции отсутствуют</td> </tr>`;
        return;
    }
    
    transactions.forEach(transaction => {
        const amountClass = transaction.transactionType === 'Credit' ? 'TransactionAmountCredit' : 'TransactionAmountDebit';
        const amountSign = transaction.transactionType === 'Credit' ? '+' : '-';

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${transaction.externalId}</td>
            <td>${transaction.agentName}</td>
            <td class="${amountClass}">
                ${amountSign}${transaction.amount.toLocaleString('ru-RU')} ₽
            </td>
            <td>${transaction.description ?? '-'}</td>
            <td>${new Date(transaction.createdAt).toLocaleString('ru-RU')}</td> `;

        ui.AccrualsTableBody.appendChild(row);
    });
};

const renderApplicationsMetrics = (applicationsMetrics) => {
    const container = document.querySelector('.ApplicationsMetrics');
    if (!container) {
        console.warn('Контейнер .ApplicationsMetrics не найден');
        return;
    }

    const configs = metricsConfig.getConfig(applicationsMetrics);

    const html = configs.map(metric => `
        <div class="ApplicationsMetric ${metric.className}">
            <div class="ApplicationsMetricIcon">
                ${metric.svg}
            </div>
            <div class="ApplicationsMetricContent">
                <span class="ApplicationsMetricTitle">${metric.title}</span>
                <strong class="ApplicationsMetricValue">${metric.value}</strong>
            </div>
        </div>
    `).join('');
    container.innerHTML = html;
};

const renderCurrentRoleInRedactUserModal = (normalrolename) => {
    if(normalrolename){
        ui.RedactUserModalCurrentUserRoleName.textContent = normalrolename;
    };
};
const renderUserRegDateInRedactUserModal = (regdate) => {
    if(regdate){
        ui.RedactUserModalUserRegDate.textContent = regdate;
    };
};
const renderUserDebtLimitValue = (debtLimit) => {
    if(debtLimit){
        ui.RedactUserModalCurrentUserDebitLimit.textContent = debtLimit;
    }
};
const renderNeuronNetworks = () => {
    const select = ui.EditApplicationPhotoNeuronNetworkSelect;

    select.innerHTML = state.availableNeuronNetworks
        .map(n => `<option value="${n.id}">${n.name}</option>`)
        .join('');
};