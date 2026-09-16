const renderApplicationsTable = (applications, totalCount) => {
    const tbody = ui.ApplicationsTableBody;
    if (!tbody) return;

    if (!applications || applications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">У вас пока нет созданных заявок</td></tr>';
        return;
    }

    const tableRowsHTML = applications.map(app => {
        const carInfo = (app.brand || app.model) ? `${app.brand || ''} ${app.model || ''}`.trim() : "Не указано";
        const vinShort = app.vin && app.vin.length > 10 ? `${app.vin}` : (app.vin || "—");
        return `
            <tr class="ApplicationTableRow" data-application-id="${app.id}">
                <td>${app.id}</td>
                <td style="text-transform: capitalize;">${carInfo}</td>
                <td title="${app.vin || ''}" style="font-family: monospace;">${vinShort}</td>
                <td>${app.fio || '—'}</td>
                <td>${getApplicationStatusBadgeHtml(app.status)}</td>
                <td>${formatDate(app.createdAt)}</td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = tableRowsHTML;
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

const renderVehicleCategories = (categories) => {
    if (!ui.CreateApplicationTsCategorySelect) {
        console.warn('CreateApplicationTsCategorySelect не найден');
        return;
    }

    if (!categories || categories.length === 0) {
        ui.CreateApplicationTsCategorySelect.innerHTML = '<option value="">Нет доступных категорий</option>';
        return;
    }

    const optionsHTML = categories.map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
    }).join('');

    ui.CreateApplicationTsCategorySelect.innerHTML = optionsHTML;
    console.log(`✅ Загружено ${categories.length} категорий ТС`);
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
        pto && Array.isArray(pto.pricePolicies) && 
        pto.pricePolicies.some(policy => policy.vehicleCategoryId === categoryId)
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
    if (!header) return;

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
const fillApplicationMediaTab = (app) => {
    const el = document.getElementById('Tab-MediaData');
    if (!el) return;

    const photos = (app.photos || []).map(p => `
        <div class="MediaCard">
            <a href="${p.url}" target="_blank">
                <div class="MediaPreview" style="background-image:url('${p.url}')"></div>
            </a>
            <div class="MediaLabel">${p.vehiclePhotoType || 'Фото'}</div>
        </div>
    `).join('');

    const docs = (app.documents || []).map(d => `
        <a class="MediaCard Doc" href="${d.url}" target="_blank">
            <div class="DocIcon">📄</div>
            <div class="MediaLabel">${d.fileName || 'Документ'}</div>
        </a>
    `).join('');

    el.innerHTML = `
        <div class="MediaSection">
            <h4>Фотографии (${app.photos?.length || 0})</h4>
            <div class="MediaGrid">${photos || '<div class="Empty">Нет фото</div>'}</div>
        </div>
        <div class="MediaSection">
            <h4>Документы (${app.documents?.length || 0})</h4>
            <div class="MediaGrid Docs">${docs || '<div class="Empty">Нет документов</div>'}</div>
        </div>
    `;
};