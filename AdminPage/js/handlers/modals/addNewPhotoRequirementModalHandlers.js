const bindPhotoRequirementModalHandlers = () => {
    // Открытие
    ui.BtnAddNewPhotoRequirement?.removeEventListener('click', openPhotoRequirementModal);
    ui.BtnAddNewPhotoRequirement?.addEventListener('click', openPhotoRequirementModal);

    // Закрытие по оверлею
    ui.AddNewPhotoRequirementOverlay?.removeEventListener('click', closePhotoRequirementModal);
    ui.AddNewPhotoRequirementOverlay?.addEventListener('click', closePhotoRequirementModal);

    // Кнопка подтверждения
    ui.AddNewPhotoRequirementSubmitButton?.removeEventListener('click', handleSubmitPhotoRequirement);
    ui.AddNewPhotoRequirementSubmitButton?.addEventListener('click', handleSubmitPhotoRequirement);
};

const openPhotoRequirementModal = () => {
    ui.AddNewPhotoRequirementModal.classList.add('Active');
};

const closePhotoRequirementModal = () => {
    ui.AddNewPhotoRequirementModal.classList.remove('Active');
    clearNewPhotoRequirementFields();
};

const handleSubmitPhotoRequirement = async () => {
    const type = ui.PhotoTypeRequirementInput?.value?.trim();
    const displayName = ui.PhotoDisplayNameRequirementInput?.value?.trim();
    const isRequired = ui.PhotoIsRequiredRequirementInput?.value === 'true';

    if (!type) {
        alert('Введите тип фото');
        ui.PhotoTypeRequirementInput?.focus();
        return;
    }

    if (!displayName) {
        alert('Введите отображаемое имя');
        ui.PhotoDisplayNameRequirementInput?.focus();
        return;
    }

    try {
        await actions.submitNewPhotoRequirement();
        closePhotoRequirementModal();
        
        if (typeof refreshPhotoRequirementsTable === 'function') {
            await refreshPhotoRequirementsTable();
        }
    } catch (error) {
        console.error('Ошибка создания требования для фото:', error);
        alert('Ошибка при создании требования');
    }
};

const clearNewPhotoRequirementFields = () => {
    if (ui.PhotoTypeRequirementInput) ui.PhotoTypeRequirementInput.value = '';
    if (ui.PhotoDisplayNameRequirementInput) ui.PhotoDisplayNameRequirementInput.value = '';
    if (ui.PhotoIsRequiredRequirementInput) ui.PhotoIsRequiredRequirementInput.value = 'true';
};
