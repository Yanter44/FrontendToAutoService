
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