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
    initPtosTable();
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


