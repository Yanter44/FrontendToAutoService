const bindDeductModalHandlers = () => {
    // Открытие
    ui.BtnDeductFromBalance?.removeEventListener('click', openDeductBalanceModal);
    ui.BtnDeductFromBalance?.addEventListener('click', openDeductBalanceModal);

    // Закрытие по оверлею
    ui.DeductBalanceOverlay?.removeEventListener('click', closeDeductBalanceModal);
    ui.DeductBalanceOverlay?.addEventListener('click', closeDeductBalanceModal);

    // Кнопка подтверждения
    ui.DeductBalanceSubmitButton?.removeEventListener('click', handleSubmitDeduct);
    ui.DeductBalanceSubmitButton?.addEventListener('click', handleSubmitDeduct);

    // Кнопки быстрых сумм
    initDeductAmountButtons();
};

const openDeductBalanceModal = () => {
    ui.DeductBalanceModal.classList.add('Active');
};

// Закрытие модалки
const closeDeductBalanceModal = () => {
    ui.DeductBalanceModal.classList.remove('Active');
    // Очищаем поля
    if (ui.DeductBalanceSelect) ui.DeductBalanceSelect.value = '';
    if (ui.DeductBalanceCashInput) ui.DeductBalanceCashInput.value = '';
    if (ui.DeductBalanceCommentInput) ui.DeductBalanceCommentInput.value = '';
    // Сбрасываем активные кнопки быстрых сумм
    document.querySelectorAll('.DeductQuickAmountBtn').forEach(btn => btn.classList.remove('Active'));
};

// Обработчик подтверждения списания
const handleSubmitDeduct = async () => {
    // Валидация
    const agentId = Number(ui.DeductBalanceSelect?.value);
    const amount = Number(ui.DeductBalanceCashInput?.value);
    const comment = ui.DeductBalanceCommentInput?.value?.trim() || '';

    if (!agentId) {
        alert('Выберите агента');
        ui.DeductBalanceSelect?.focus();
        return;
    }

    if (!amount || amount <= 0) {
        alert('Введите корректную сумму');
        ui.DeductBalanceCashInput?.focus();
        return;
    }

    const model = {
        agentId: agentId,
        amount: amount,
        comment: comment,
        idempotencyKey: crypto.randomUUID()
    };

    try {
        await actions.submitNewDebitTransaction(model);
        closeDeductBalanceModal();
        // Обновляем таблицу транзакций
        if (typeof refreshTransactionsTable === 'function') {
            await refreshTransactionsTable();
        }
        if (typeof refreshAgentBalance === 'function') {
            await refreshAgentBalance(agentId);
        }
    } catch (error) {
        console.error('Ошибка списания средств:', error);
        alert('Ошибка при списании средств');
    }
};

const initDeductAmountButtons = () => {
    const buttons = ui.DeductModalQuickAmountButtons;
    const input = ui.DeductBalanceCashInput;
    
    if (!buttons?.length || !input) return;

    buttons.forEach(btn => {
        btn.removeEventListener('click', handleDeductAmountClick);
        btn.addEventListener('click', handleDeductAmountClick);
    });
};

const handleDeductAmountClick = (e) => {
    const btn = e.currentTarget;
    const container = btn.closest('.DeductModalQuickAmountButtons');
    if (!container) return;

    container.querySelectorAll('.DeductModalQuickAmountButton').forEach(b => b.classList.remove('Active'));
    btn.classList.add('Active');
    
    const input = ui.DeductBalanceCashInput;
    if (input) {
        input.value = Number(btn.dataset.value) || 0;
    }
};
