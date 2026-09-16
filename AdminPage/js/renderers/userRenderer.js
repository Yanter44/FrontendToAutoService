
const renderUsersTable = (users) => {
    const tbody = document.querySelector('.UsersTable tbody');
    if (!tbody) return;

    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #64748b;">Пользователи не найдены</td></tr>';
        return;
    }

    const tableRowsHTML = users.map(user => {
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

