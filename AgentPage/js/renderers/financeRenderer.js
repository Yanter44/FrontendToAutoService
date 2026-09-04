const renderAgentFinanceStatus = (balance, debtlimit, currentdebt) => {
    ui.AgentFinanceBalance.textContent = balance + " ₽";
    ui.AgentFinanceDebtLimit.textContent = debtlimit + " ₽";
    ui.AgentFinanceCurrentDebt.textContent = currentdebt + " ₽";
};

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
