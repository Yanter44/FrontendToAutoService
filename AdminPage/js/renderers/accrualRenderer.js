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
            <td class="${amountClass}"> ${amountSign}${transaction.amount.toLocaleString('ru-RU')} ₽</td>
            <td>${transaction.description ?? '-'}</td>
            <td>${new Date(transaction.createdAt).toLocaleString('ru-RU')}</td> `;

        ui.AccrualsTableBody.appendChild(row);
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