const bindRedactUserModalHandlers = () => {
    ui.RedactUserModalOverlay?.removeEventListener('click', closeRedactUserModal);
    ui.RedactUserModalOverlay?.addEventListener('click', closeRedactUserModal);

    const leftMenu = document.querySelector('.RedactUserModalLeftMenu');
    if (leftMenu) {
        leftMenu.removeEventListener('click', handleLeftMenuClick);
        leftMenu.addEventListener('click', handleLeftMenuClick);
    }

    const roleDropdown = document.getElementById('RoleDropdown');
    if (roleDropdown) {
        roleDropdown.removeEventListener('click', handleRoleDropdownClick);
        roleDropdown.addEventListener('click', handleRoleDropdownClick);
    }

    const submitButton = document.getElementById('RedactUserModalBtnSubmit');
    if (submitButton) {
        submitButton.removeEventListener('click', handleSubmitRedactUser);
        submitButton.addEventListener('click', handleSubmitRedactUser);
    }
};

const openRedactUserModal = async (id) => {
    const user = state.usersResult.items.find(x => x.userId === Number(id));
    if (!user) {
        console.error("Пользователь не найден:", id);
        return;
    }

    state.redactUser.userId = user.userId;
    state.redactUser.activeTab = 'userRoleChangeContent';

    ui.RedactUserModal.classList.add('Active');

    await ensure.availableroles();
    
    const normalrolenameuser = getNormalRoleName(user.role);
    const normaluserregdate = dateTimeFormatter.formatDate(user.regDate);
    
    renderCurrentRoleInRedactUserModal(normalrolenameuser);
    renderUserRegDateInRedactUserModal(normaluserregdate);
    renderAvailableRoles();
    
    if (user.role !== "Admin" && user.role !== "Moderator") {
        renderUserDebtLimitValue(user.debtLimit);
    }
};

const closeRedactUserModal = () => {
    ui.RedactUserModal.classList.remove('Active');
};

const handleLeftMenuClick = (e) => {
    const row = e.target.closest('.RedactUserModalLeftItem');
    if (!row) return;

    document.querySelectorAll('.RedactUserModalLeftItem').forEach(item => {
        item.classList.remove('Active');
    });

    row.classList.add('Active');

    const target = row.dataset.redactusermodalLefttab;
    state.redactUser.activeTab = target;
    console.log("сейчас находимся тут -> " + target);
    
    document.querySelectorAll('.RedactUserModalRightContent').forEach(content => {
        content.classList.remove('Active');
    });

    document.querySelector(`[data-content="${target}"]`)?.classList.add('Active');
};

const handleRoleDropdownClick = (e) => {
    const roleDropdown = document.getElementById('RoleDropdown');
    const selectedRole = document.getElementById('SelectedRole');

    if (!roleDropdown || !selectedRole) return;

    const item = e.target.closest('.RedactUserModalDropdownItem');

    if (item) {
        selectedRole.textContent = getNormalRoleName(item.dataset.value);
        selectedRole.dataset.roleId = item.dataset.id;

        roleDropdown.classList.remove('Active');
        e.stopPropagation();
        return;
    }

    roleDropdown.classList.toggle('Active');
};


const handleSubmitRedactUser = async () => {
    const userId = state.redactUser.userId;
    const activeTab = state.redactUser.activeTab;

    console.log('Подтверждение изменений');
    console.log('User ID:', userId);
    console.log('Активная вкладка:', activeTab);

    try {
        switch (activeTab) {
            case 'userRoleChangeContent':
                await submitUserRoleChange(userId);
                break;

            case 'userDebtLimit':
                await submitUserDebtLimitChange(userId);
                break;

            case 'userStatusChangeContent':
                await submitUserStatusChange(userId);
                break;

            default:
                console.error('Неизвестная вкладка:', activeTab);
        }
    } catch (error) {
        console.error('Ошибка при сохранении:', error);
        alert('Ошибка при сохранении изменений');
    }
};


const getNormalRoleName = (roleName) => {
    switch(roleName){
        case "Admin":
            return "Администратор"
            break;
        case "Moderator":
            return "Модератор";
            break;
        case "Agent":
            return "Агент";
            break;
    }
};