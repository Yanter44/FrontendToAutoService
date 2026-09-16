const bindRedactUserModalHandlers = () => {
    const bind = (el, event, handler) => {
        el?.removeEventListener(event, handler);
        el?.addEventListener(event, handler);
    };

    bind(ui.RedactUserModalOverlay, 'click', closeRedactUserModal);
    bind(ui.RedactUserModalLeftMenu, 'click', handleLeftMenuClick);
    bind(ui.RedactUserModalBtnSubmit, 'click', handleSubmitRedactUser);

    // Делегирование для пресетов — вешаем на контейнер, а не на каждую кнопку
    const presetsContainer = document.querySelector('.RedactUserModalRightPresets');
    bind(presetsContainer, 'click', handleDebtLimitPresetClick);

    bind(ui.RedactUserModalNewCreditLimitInput, 'input', handleDebtLimitInput);
};


const openRedactUserModal = async (id) => {
    const user = state.usersResult.items.find(x => x.userId === Number(id));
    if (!user) return console.error('Пользователь не найден:', id);

    Object.assign(state.redactUser, {
        userId: user.userId,
        user,
        activeTab: 'userRoleChangeContent',
        blockHistory: []
    });

    ui.RedactUserModal.classList.add('Active');

    try {
        await ensure.availableroles();
        await loadUserBlockHistory(user.userId);
    } catch (error) {
        console.error('Не удалось открыть модалку:', error);
    }

    renderAccountInfo(user);
    renderTab('userRoleChangeContent');
    renderSubmitButton();
};

const closeRedactUserModal = () => {
    ui.RedactUserModal.classList.remove('Active');

    Object.assign(state.redactUser, {
        userId: null,
        user: null,
        activeTab: 'userRoleChangeContent',
        blockHistory: []
    });

    if (ui.RedactUserModalBlockingReasonSelect) ui.RedactUserModalBlockingReasonSelect.value = '';
    if (ui.RedactUserModalBlockingCommentInput) ui.RedactUserModalBlockingCommentInput.value = '';
    if (ui.RedactUserModalNewCreditLimitInput) ui.RedactUserModalNewCreditLimitInput.value = '';

    clearActive(ui.RedactUserModalPresets);

    renderTab('userRoleChangeContent');
    renderSubmitButton();
};


const handleLeftMenuClick = (e) => {
    const row = e.target.closest('.RedactUserModalLeftItem');
    if (!row) return;

    const tab = row.dataset.redactusermodalLefttab;
    state.redactUser.activeTab = tab;

    renderTab(tab);
    renderSubmitButton();
};

const handleDebtLimitPresetClick = (e) => {
    const btn = e.target.closest('.RedactUserModalRightPreset');
    if (!btn || !ui.RedactUserModalNewCreditLimitInput) return;

    ui.RedactUserModalNewCreditLimitInput.value = btn.dataset.value || '0';

    clearActive(ui.RedactUserModalPresets);
    btn.classList.add('Active');
};

const handleDebtLimitInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');

    const value = e.target.value;
    ui.RedactUserModalPresets.forEach(btn => {
        btn.classList.toggle('Active', btn.dataset.value === value);
    });
};

const handleSubmitRedactUser = async () => {
    const { userId, activeTab } = state.redactUser;
    if (!userId) return;

    try {
        if (activeTab === 'userDebtLimit') {
            await submitUserDebtLimitChange(userId);
        } else if (activeTab === 'userStatusChangeContent') {
            await submitUserStatusChange(userId);
        }
    } catch (error) {
        console.error('Ошибка при сохранении:', error);
        alert(error.message || 'Ошибка при сохранении изменений');
    }
};

const submitUserDebtLimitChange = async (userId) => {
    const raw = ui.RedactUserModalNewCreditLimitInput?.value?.trim();
    if (!raw) throw new Error('Введите новый лимит');

    const newLimit = Number(raw);
    if (Number.isNaN(newLimit) || newLimit < 0) throw new Error('Введите корректный лимит');
    console.log(newLimit);
    console.log(userId);
    //const result = await userService.changeUserDebtLimit({ userId: userId, debtLimit: newLimit});

    const user = state.usersResult.items.find(x => x.userId === userId);
    if (user) user.debtLimit = newLimit;

    renderUsersTable(state.usersResult.items);
    closeRedactUserModal();
};

const submitUserStatusChange = async (userId) => {
    const isBlocked = state.redactUser.blockHistory.some(h => h.isActive);

    if (isBlocked) {
        const reason = ui.RedactUserModalBlockingCommentInput?.value.trim();
        if (!reason) throw new Error('Укажите причину разблокировки');

        await userService.unblockUser({ unblockUserId: userId, unblockReason: reason });
    } else {
        const select = ui.RedactUserModalBlockingReasonSelect;
        if (!select.value) throw new Error('Выберите причину блокировки');

        const comment = ui.RedactUserModalBlockingCommentInput?.value.trim();
        const reasonText = select.options[select.selectedIndex].text;
        const fullReason = comment ? `${reasonText}: ${comment}` : reasonText;

        await userService.blockUser({
            blockUserId: userId,
            reason: fullReason,
            blockUntil: null
        });
    }

    await loadUserBlockHistory(userId);
    renderSubmitButton();
};

const loadUserBlockHistory = async (userId) => {
    try {
        const response = await userService.getUserBlockHistory(userId);
        const history = response.data || [];

        state.redactUser.blockHistory = history;

        renderUserBlockStatus(history.some(h => h.isActive));
        renderUserBlockHistory(history);

        if (state.redactUser.activeTab === 'userStatusChangeContent') {
            renderSubmitButton();
        }
    } catch (error) {
        console.error('Не удалось загрузить историю:', error);
        renderUserBlockHistory([]);
    }
};

const getNormalRoleName = (roleName) => {
    const map = {
        Admin: 'Администратор',
        Moderator: 'Модератор',
        Agent: 'Агент'
    };
    return map[roleName] || roleName;
};

const clearActive = (nodes) => {
    nodes.forEach(n => n.classList.remove('Active'));
};