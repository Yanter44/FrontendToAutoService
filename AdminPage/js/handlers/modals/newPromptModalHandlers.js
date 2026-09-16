const bindPromptModalHandlers = () => {
    // Открытие по кнопке "Добавить промпт"
    ui.BtnAddNewPrompt?.removeEventListener('click', openNewPromptModal);
    ui.BtnAddNewPrompt?.addEventListener('click', openNewPromptModal);

    // Закрытие по оверлею
    ui.AddNewPromptModalOverlay?.removeEventListener('click', closeNewPromptModal);
    ui.AddNewPromptModalOverlay?.addEventListener('click', closeNewPromptModal);

    // Кнопка подтверждения
    ui.PromptSubmitBtn?.removeEventListener('click', handleSubmitNewPrompt);
    ui.PromptSubmitBtn?.addEventListener('click', handleSubmitNewPrompt);
};

const openNewPromptModal = () => {
    ui.AddNewPromptModal.classList.add('Active');
};

const closeNewPromptModal = () => {
    ui.AddNewPromptModal.classList.remove('Active');
    if (ui.PromptTagInput) ui.PromptTagInput.value = '';
    if (ui.PromptDescriptionInput) ui.PromptDescriptionInput.value = '';
};

const handleSubmitNewPrompt = async () => {
    const tag = ui.PromptTagInput?.value?.trim();
    const description = ui.PromptDescriptionInput?.value?.trim();

    if (!tag) {
        alert('Введите тег промпта');
        ui.PromptTagInput?.focus();
        return;
    }

    if (!description) {
        alert('Введите описание промпта');
        ui.PromptDescriptionInput?.focus();
        return;
    }

    try {
        await actions.submitNewPrompt();
        closeNewPromptModal();
        if (typeof refreshPromptsTable === 'function') {
            await refreshPromptsTable();
        }
        if (typeof renderPromptsTable === 'function') {
            await renderPromptsTable(state.prompts);
        }
    } catch (error) {
        console.error('Ошибка создания промпта:', error);
        alert('Ошибка при создании промпта');
    }
};

