const bindAddNewNeuronNetworkModalHandlers = () => {
    // Открытие по кнопке "Добавить промпт"
    ui.BtnAddNeuronNetwork?.removeEventListener('click', openNewNeuronNetworkModal);
    ui.BtnAddNeuronNetwork?.addEventListener('click', openNewNeuronNetworkModal);

    // Закрытие по оверлею
    ui.AddNewNeuronNetworkModalOverlay?.removeEventListener('click', closeNewNeuronNetworkModal);
    ui.AddNewNeuronNetworkModalOverlay?.addEventListener('click', closeNewNeuronNetworkModal);

    // Кнопка подтверждения
    ui.AddNewNeuronNetworkSubmitButton?.removeEventListener('click', handleSubmitNewNeuronNetwork);
    ui.AddNewNeuronNetworkSubmitButton?.addEventListener('click', handleSubmitNewNeuronNetwork);
};

const openNewNeuronNetworkModal = () =>{
    console.log("открытие окна");
    ui.AddNewNeuronNetworkModal.classList.add('Active');
};
const closeNewNeuronNetworkModal = () => {
    ui.AddNewNeuronNetworkModal.classList.remove('Active');
    if (ui.NeuronNetworkNameInput) ui.NeuronNetworkNameInput.value = '';
    if (ui.NeuronNetworkLinkInput) ui.NeuronNetworkLinkInput.value = '';
};

const handleSubmitNewNeuronNetwork = async () => {
    const neuronnetworkname = ui.NeuronNetworkNameInput?.value?.trim();
    const neuronnetworklink = ui.NeuronNetworkLinkInput?.value?.trim();

    if (!neuronnetworkname) {
        alert('Введите имя нейронной сети');
        ui.NeuronNetworkNameInput?.focus();
        return;
    }

    if (!neuronnetworklink) {
        alert('Введите ссылку на нейронную сеть с route ai');
        ui.PromptDescriptionInput?.focus();
        return;
    }
      try {
        const isSuccess = await actions.submitNewNeuronNetwork();
        if (isSuccess) {
            closeNewNeuronNetworkModal();
            await neuronNetworksPagination.loadPage(1);   
        } else {
            alert('Не удалось добавить нейронную сеть');
        }
    } catch (error) {
        console.error('Ошибка добавления нейронной сети:', error);
        alert('Произошла ошибка при добавлении нейронной сети:');
    }
};