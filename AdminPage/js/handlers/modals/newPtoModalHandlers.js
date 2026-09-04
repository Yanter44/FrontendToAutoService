const bindPtoModalHandlers = () => {
    // Открытие по кнопке "Добавить ПТО"
    ui.BtnAddNewPto?.removeEventListener('click', openNewPtoModal);
    ui.BtnAddNewPto?.addEventListener('click', openNewPtoModal);

    // Закрытие по оверлею
    ui.AddNewPtoModalOverlay?.removeEventListener('click', closeNewPtoModal);
    ui.AddNewPtoModalOverlay?.addEventListener('click', closeNewPtoModal);

    // Кнопка подтверждения
    ui.AddNewPtoSubmitButton?.removeEventListener('click', handleSubmitNewPto);
    ui.AddNewPtoSubmitButton?.addEventListener('click', handleSubmitNewPto);
};

const openNewPtoModal = async () => {
    const categories = await vehicleService.getAllVehicleCategories();
    renderPricePolicyTable(categories);
    ui.AddNewPtoModal.classList.add('Active');
};

const closeNewPtoModal = () => {
    ui.AddNewPtoModal.classList.remove('Active');
    resetNewPtoForm();
};

const handleSubmitNewPto = async () => {
    try {
        await actions.submitNewPto();
        closeNewPtoModal();
        if (typeof refreshPtoTable === 'function') {
            await refreshPtoTable();
        }
    } catch (error) {
        console.error('Ошибка создания ПТО:', error);
        alert('Ошибка при создании ПТО');
    }
};

const resetNewPtoForm = () => {
    if (ui.PtoNameInput) ui.PtoNameInput.value = '';
    if (ui.PtoRsaInput) ui.PtoRsaInput.value = '';
    if (ui.PtoAddressInput) ui.PtoAddressInput.value = '';
    if (ui.PtoLatitudeInput) ui.PtoLatitudeInput.value = '';
    if (ui.PtoLongtitudeInput) ui.PtoLongtitudeInput.value = '';
    if (ui.PtoLoginInput) ui.PtoLoginInput.value = '';
    if (ui.PtoPasswordInput) ui.PtoPasswordInput.value = '';
    if (ui.PtoApiKeyInput) ui.PtoApiKeyInput.value = '';
};


