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

const getApplicationStatusBadgeHtml = (status) => {
    switch (status) {
        case "Moderated":
            return '<span class="StatusBadge ModerationStatus">На модерации</span>';
        case "Confirmed":
            return '<span class="StatusBadge ApprovedStatus">Одобрено</span>';
        case "Rejected":
            return '<span class="StatusBadge RejectedStatus">Отклонено</span>';
        case "Processing":
            return '<span class="StatusBadge ProcessingStatus">Обрабатывается</span>';
        case "Error":
            return '<span class="StatusBadge RejectedStatus">Ошибка</span>';
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
        badge.classList.add('ModerationStatus');
        badge.textContent = 'На модерации';
    } else if (app.status === "Confirmed") {
        badge.classList.add('ApprovedStatus');
        badge.textContent = 'Одобрено';
    } else if (app.status === "Rejected") {
        badge.classList.add('RejectedStatus');
        badge.textContent = 'Отклонено';
    } else if (app.status === "Processing") {
        badge.classList.add('ProcessingStatus');
        badge.textContent = 'Обрабатывается...';
    } else if (app.status === "Error") {
        badge.classList.add('RejectedStatus');
        badge.textContent = `Ошибка: ${app.errorMessage || 'Неизвестная ошибка'}`;
    } else {
        badge.textContent = app.status || 'Неизвестно';
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

const openApplicationSidebar = (app) => {
    ui.Workspace.classList.add('SidebarOpen');
    state.selectedApplication = app;
    resetApplicationSidebarTabs();
    fillApplicationSidebarHeader(app);
    fillApplicationVehicleTab(app);
    fillApplicationMediaTab(app);
};



