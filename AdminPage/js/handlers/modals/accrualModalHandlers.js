const bindAccrualModalHandlers = () => {
    ui.BtnAccrualToBalance?.removeEventListener('click', openAccrualBalanceModal);
    ui.BtnAccrualToBalance?.addEventListener('click', openAccrualBalanceModal);

    ui.AccrualBalanceOverlay?.removeEventListener('click', closeAccrualBalanceModal);
    ui.AccrualBalanceOverlay?.addEventListener('click', closeAccrualBalanceModal);

    ui.AccrualBalanceSubmitButton?.removeEventListener('click', handleSubmitAccrual);
    ui.AccrualBalanceSubmitButton?.addEventListener('click', handleSubmitAccrual);

    initAccrualAmountButtons();
};

const openAccrualBalanceModal = () => {
    ui.AccrualBalanceModal.classList.add('Active');
};

const closeAccrualBalanceModal = () => {
    ui.AccrualBalanceModal.classList.remove('Active');
    if (ui.AccrualBalanceSelect) ui.AccrualBalanceSelect.value = '';
    if (ui.AccrualBalanceCashInput) ui.AccrualBalanceCashInput.value = '';
    if (ui.AccrualBalanceCommentInput) ui.AccrualBalanceCommentInput.value = '';

    document.querySelectorAll('.QuickAmountBtn').forEach(btn => btn.classList.remove('Active'));
};

const handleSubmitAccrual = async () => {
    const agentId = Number(ui.AccrualBalanceSelect?.value);
    const amount = Number(ui.AccrualBalanceCashInput?.value);
    const comment = ui.AccrualBalanceCommentInput?.value?.trim() || '';

    if (!agentId) {
        alert('Выберите агента');
        ui.AccrualBalanceSelect?.focus();
        return;
    }

    if (!amount || amount <= 0) {
        alert('Введите корректную сумму');
        ui.AccrualBalanceCashInput?.focus();
        return;
    }

    const model = {
        agentId: agentId,
        amount: amount,
        comment: comment,
        idempotencyKey: crypto.randomUUID()
    };

    try {
        await actions.submitNewCreditTransaction(model);
        closeAccrualBalanceModal();
        if (typeof refreshTransactionsTable === 'function') {
            await refreshTransactionsTable();
        }
        if (typeof refreshAgentBalance === 'function') {
            await refreshAgentBalance(agentId);
        }
    } catch (error) {
        console.error('Ошибка начисления средств:', error);
        alert('Ошибка при начислении средств');
    }
};

const initAccrualAmountButtons = () => {
    const buttons = ui.QuickAmountButtons;
    const input = ui.AccrualBalanceCashInput;
    
    if (!buttons?.length || !input) return;

    buttons.forEach(btn => {
        btn.removeEventListener('click', handleAccrualAmountClick);
        btn.addEventListener('click', handleAccrualAmountClick);
    });
};

const handleAccrualAmountClick = (e) => {
    const btn = e.currentTarget;
    const container = btn.closest('.QuickAmountButtons');
    if (!container) return;

    container.querySelectorAll('.QuickAmountButton').forEach(b => b.classList.remove('Active'));
    btn.classList.add('Active');
    
    const input = ui.AccrualBalanceCashInput;
    
    if (input) {
        input.value = Number(btn.dataset.value) || 0;
    }
};