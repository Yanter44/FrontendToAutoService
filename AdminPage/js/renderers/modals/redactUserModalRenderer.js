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
const renderAccountInfo = (user) => {
    const role = getNormalRoleName(user.role);
    const regDate = dateTimeFormatter.formatDate(user.regDate);

    if (role && ui.RedactUserModalCurrentUserRoleName) {
        ui.RedactUserModalCurrentUserRoleName.textContent = role;
    }
    if (regDate && ui.RedactUserModalUserRegDate) {
        ui.RedactUserModalUserRegDate.textContent = regDate;
    }
    if (user.role !== 'Admin' && user.role !== 'Moderator' && ui.RedactUserModalCurrentUserDebitLimit) {
        ui.RedactUserModalCurrentUserDebitLimit.textContent = user.debtLimit ?? 0;
    }
};

const renderTab = (tab) => {
    ui.RedactUserModalLeftItems.forEach(item => {
        item.classList.toggle('Active', item.dataset.redactusermodalLefttab === tab);
    });
    ui.RedactUserModalRightContents.forEach(content => {
        content.classList.toggle('Active', content.dataset.content === tab);
    });
};

const renderSubmitButton = () => {
    const btn = ui.RedactUserModalBtnSubmit;
    if (!btn) return;

    const tab = state.redactUser.activeTab;

    btn.classList.remove('BtnBlock', 'BtnUnblock');
    btn.disabled = false;

    if (tab === 'userRoleChangeContent') {
        btn.style.display = 'none';
        return;
    }

    btn.style.display = '';

    if (tab === 'userDebtLimit') {
        btn.textContent = 'Сохранить';
        return;
    }

    if (tab === 'userStatusChangeContent') {
        const isBlocked = state.redactUser.blockHistory.some(h => h.isActive);
        btn.textContent = isBlocked ? 'Разблокировать' : 'Заблокировать';
        btn.classList.add(isBlocked ? 'BtnUnblock' : 'BtnBlock');
    }
};

const renderUserBlockStatus = (isBlocked) => {
    const badge = ui.RedactUserModalCurrentUserStatus;
    if (!badge) return;

    badge.className = 'RedactUserModalRightBadge';
    badge.textContent = isBlocked ? 'Заблокирован' : 'Активен';
    badge.classList.add(isBlocked ? 'StatusBlocked' : 'StatusActive');
};

const renderUserBlockHistory = (history) => {
    const tbody = ui.RedactUserModalBlockHistoryBody;
    if (!tbody) return;

    ui.RedactUserModalBlockHistoryCount.textContent = history.length;

    if (!history.length) {
        tbody.innerHTML = `
            <tr class="RedactUserModalRightHistoryEmpty">
                <td colspan="4">История блокировок пуста</td>
            </tr>`;
        return;
    }

    tbody.innerHTML = history.map(b => {
        const date = dateTimeFormatter.formatDateTime(b.blockedAt);

        const status = b.isActive
            ? '<span class="RedactUserModalRightHistoryStatus ActiveBlock">Заблокирован</span>'
            : b.wasAutoUnblocked
                ? '<span class="RedactUserModalRightHistoryStatus Unblocked">Авто-разблокировка</span>'
                : '<span class="RedactUserModalRightHistoryStatus Unblocked">Разблокирован</span>';

        return `
            <tr>
                <td>${date}</td>
                <td title="${escapeHtml(b.reason || '—')}">${escapeHtml(b.reason || '—')}</td>
                <td>${escapeHtml(b.blockedByFIO || '—')}</td>
                <td>${status}</td>
            </tr>`;
    }).join('');
};
