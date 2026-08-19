const renderApplicationsTable = (applications, totalCount) => {
    const tbody = ui.ApplicationsTableBody;
    if (!tbody) return;

    if (!applications || applications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">У вас пока нет созданных заявок</td></tr>';
        return;
    }

    const tableRowsHTML = applications.map(app => {
        const carInfo = (app.brand || app.model) 
            ? `${app.brand || ''} ${app.model || ''}`.trim() 
            : "Не указано";
            
        const vinShort = app.vin && app.vin.length > 10 
            ? `${app.vin}` 
            : (app.vin || "—");

        return `
            <tr class="ApplicationTableRow" data-application-id="${app.id}">
                <td>${app.id}</td>
                <td style="text-transform: capitalize;">${carInfo}</td>
                <td title="${app.vin || ''}" style="font-family: monospace;">${vinShort}</td>
                <td>${app.fio || '—'}</td>
                <td>${getStatusBadgeHtml(app.status)}</td>
                <td>${formatDate(app.createdAt)}</td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = tableRowsHTML;
};
const renderAgentFinanceStatus = (balance, debtlimit, currentdebt) => {
    ui.AgentFinanceBalance.textContent = balance + " ₽";
    ui.AgentFinanceDebtLimit.textContent = debtlimit + " ₽";
    ui.AgentFinanceCurrentDebt.textContent = currentdebt + " ₽";
}

const renderFinancesTable = (financeHistory) => {
    const tbody = ui.FinancesHistoryTableBody;
    if(!financeHistory || financeHistory.length === 0){
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">У вас пока нет финансовой истории</td></tr>';
    }
    const tableRowHTML = financeHistory.map(story => {
        return `
            <tr>
                <td class="FinanceDateTimeCell">${formatDateTime(story.createdAt)}</td>
                <td>${getTransactionTypeBadgeHtml(story.transactionType)}</td>
                <td class="FinanceAmountCell">${getTransactionTypeBadgeText(story.transactionType, story.amount)}</td>
                <td class="FinanceDescriptionCell">${story.description}</td>
                <td>${getTransactionStatusBadgeHtml(story.transactionStatus)}</td>
            </tr>`
    }).join('');
    tbody.innerHTML = tableRowHTML;
};
const getTransactionStatusBadgeHtml = (status) => {
    switch(status) {
        case "Completed":
            return `<span class="FinanceStatusBadge FinanceStatusSuccess">Успешно</span>`;
            break;      
        case "Rejected?":

            break;
    }  
};

const getTransactionTypeBadgeText = (type, amount) =>{
    switch(type){
        case "Credit":
            return `<div class="FinanceAmountDeposit">+${amount} ₽</div>`
            break;
        case "Debit":
            return `<div class="FinanceAmountWithDrawal">-${amount} ₽</div>`
            break;
    }
};

const getTransactionTypeBadgeHtml = (type) => {
    switch(type) {
        case "Credit":
            return `<div class="FinanceTypeWrapper FinanceTypeDeposit">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 4v12h-4l5 5 5-5h-4v-12z"/></svg>
                        <span>Пополнение</span>
                    </div>`;
            break;
        case "Debit":
            return `<div class="FinanceTypeWrapper FinanceTypeWithdrawal">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M13 20v-12h4l-5-5-5 5h4v12z"/></svg>
                        <span>Списание</span>
                    </div>`;
            break;
    }
};

const getStatusBadgeHtml = (status) => {
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

const renderBalance = (balanceValue) => {
    ui.balance.textContent = `${balanceValue.toLocaleString()} ₽`;
};

const renderNotificationCountField = (notificationsTotalCount) => {
    if(ui.NotificationCountField){
        ui.NotificationCountField.textContent = notificationsTotalCount;
    }
};

const renderNotification = (html) => {
    ui.NotificationModalBody.insertAdjacentHTML("afterbegin", html);
};

const renderLoaderProgress = (percent) => {
    console.log(percent);
    ui.LoaderProgressBarProgressFill.style.width = `${percent}%`;
    ui.LoaderLoadingProgressBarPercents.innerHTML = `${percent}%`;
};
const renderPtos = (ptos, categoryId) => {
    if (!ui.CreateApplicationPtoSelect) return;

    if (!categoryId || isNaN(categoryId)) {
        ui.CreateApplicationPtoSelect.innerHTML = '<option value="">Сначала выберите категорию ТС</option>';
        return;
    }

    if (!Array.isArray(ptos)) {
        ui.CreateApplicationPtoSelect.innerHTML = '<option value="">Ошибка загрузки списка ПТО</option>';
        return;
    }
    const filteredPtos = ptos.filter(pto => 
        pto && Array.isArray(pto.pricePolicies) && pto.pricePolicies.some(policy => policy.vehicleCategoryId === categoryId)
    );

    if (filteredPtos.length === 0) {
        ui.CreateApplicationPtoSelect.innerHTML = '<option value="">Нет доступных ПТО для этой категории</option>';
        return;
    }
    const optionsHTML = filteredPtos.map(pto => {
        const currentPolicy = pto.pricePolicies.find(policy => policy.vehicleCategoryId === categoryId);
        const priceText = currentPolicy ? `${currentPolicy.price} ₽` : "Цена не указана";

        return `<option value="${pto.id}">${pto.name} — ${pto.address} (${priceText})</option>`;
    }).join('');
    
    ui.CreateApplicationPtoSelect.innerHTML = optionsHTML;
};

const renderVehicleCategories = (categories) =>{
   const optionsHTML = categories.map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
    }).join('');
    ui.CreateApplicationTsCategorySelect.innerHTML = optionsHTML;
};

const renderProfile = (data) => {
    const firstLetter = data.name?.[0]?.toUpperCase() ?? '?';
    const roleText = `Должность: ${data.role}`;

    ui.useravatarletter.textContent = firstLetter;
    ui.username.textContent = data.name;
    ui.userrole.textContent = roleText;
      
    if (ui.DropDownUseravatarletter) ui.DropDownUseravatarletter.textContent = firstLetter;
    if (ui.DropDownUsername) ui.DropDownUsername.textContent = data.name;
    if (ui.DropDownUserrole) ui.DropDownUserrole.textContent = roleText;

    ui.DropDownSignOutButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await authService.signOut();
    });
};

const bindApplicationsTableEvents = () => {
    if (!ui.ApplicationsTableBody) return;

    ui.ApplicationsTableBody.addEventListener('click', (e) => {
        const row = e.target.closest('.ApplicationTableRow');
        if (!row) return;

        const id = Number(row.dataset.applicationId);
        const app = state.applications.find(x => x.id === id);
        if (!app) return;
        console.log(app);
        openApplicationSidebar(app);
    });
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

const renderAddTsPhotoModal = () => {
    ui.AddTsPhotoModal.classList.add('Active');
};

const renderAddTsDocumentModal = () => {
    ui.AddTsDocumentModal.classList.add('Active');
};

const renderDocumentRequirements = (requirements) => {
    ui.AddTsDocumentModalDocumentTypeSelect.innerHTML = "";
    requirements.forEach(requirement => {
        const option = document.createElement("option");
        option.value = requirement.id;
        option.textContent = requirement.displayName;
        ui.AddTsDocumentModalDocumentTypeSelect.appendChild(option);
    });
};

const renderPhotoRequirements = (requirements) => {
    ui.AddTsPhotoModalPhotoTypeSelect.innerHTML = "";
    requirements.forEach(requirement => {
        const option = document.createElement("option");
        option.value = requirement.id;
        option.textContent = requirement.displayName;
        ui.AddTsPhotoModalPhotoTypeSelect.appendChild(option);
    });
};
