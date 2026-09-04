const bindDocumentRequirementModalHandlers = () => {
    ui.BtnAddNewDocumentRequirement?.removeEventListener('click', openDocumentRequirementModal);
    ui.BtnAddNewDocumentRequirement?.addEventListener('click', openDocumentRequirementModal);

    ui.AddNewDocumentRequirementOverlay?.removeEventListener('click', closeDocumentRequirementModal);
    ui.AddNewDocumentRequirementOverlay?.addEventListener('click', closeDocumentRequirementModal);

    ui.AddNewDocumentRequirementSubmitButton?.removeEventListener('click', handleSubmitDocumentRequirement);
    ui.AddNewDocumentRequirementSubmitButton?.addEventListener('click', handleSubmitDocumentRequirement);
};

const openDocumentRequirementModal = () => {
    ui.AddNewDocumentRequirementModal.classList.add('Active');
};

const closeDocumentRequirementModal = () => {
    ui.AddNewDocumentRequirementModal.classList.remove('Active');
    clearNewDocumentRequirementFields();
};

const handleSubmitDocumentRequirement = async () => {
    const type = ui.DocumentTypeRequirementInput?.value?.trim();
    const displayName = ui.DocumentDisplayNameRequirementInput?.value?.trim();
    const isRequired = ui.DocumentIsRequiredRequirementInput?.value === 'true';

    if (!type) {
        alert('Введите тип документа');
        ui.DocumentTypeRequirementInput?.focus();
        return;
    }

    if (!displayName) {
        alert('Введите отображаемое имя');
        ui.DocumentDisplayNameRequirementInput?.focus();
        return;
    }

    try {
        await actions.submitNewDocumentRequirement();
        closeDocumentRequirementModal();
        
        // Обновляем таблицу требований для документов
        if (typeof refreshDocumentRequirementsTable === 'function') {
            await refreshDocumentRequirementsTable();
        }
    } catch (error) {
        console.error('Ошибка создания требования для документа:', error);
        alert('Ошибка при создании требования');
    }
};

const clearNewDocumentRequirementFields = () => {
    if (ui.DocumentTypeRequirementInput) ui.DocumentTypeRequirementInput.value = '';
    if (ui.DocumentDisplayNameRequirementInput) ui.DocumentDisplayNameRequirementInput.value = '';
    if (ui.DocumentIsRequiredRequirementInput) ui.DocumentIsRequiredRequirementInput.value = 'true';
};
