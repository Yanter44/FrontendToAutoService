const bindNeuronNetworkHandlers = () => {
    initNeuronNetworksTable();
};

const initNeuronNetworksTable = () => {
    // Кнопки редактирования
    document.querySelectorAll('.BtnRedactNeuronNetwork').forEach(button => {
        button.removeEventListener('click', handleRedactNeuronNetworkClick);
        button.addEventListener('click', handleRedactNeuronNetworkClick);
    });
    // Кнопки удаления
    document.querySelectorAll('.BtnDeleteNeuronNetwork').forEach(button => {
        button.removeEventListener('click', handleDeleteNeuronNetworkClick);
        button.addEventListener('click', handleDeleteNeuronNetworkClick);
    });
};
const handleRedactNeuronNetworkClick = (e) => {
    const button = e.currentTarget;
    const row = button.closest('.NeuronNetworksTableRow');
    if (!row) return;

    const neuronNetworkId = row.getAttribute('data-neuronNetwork-id');
    if (neuronNetworkId) {
        openRedactNeuronNetworkModal(neuronNetworkId);
    }
};

const handleDeleteNeuronNetworkClick = (e) => {
    const button = e.currentTarget;
    const row = button.closest('.NeuronNetworksTableRow');
    if (!row) return;

    const neuronNetworkId = row.getAttribute('data-neuronNetwork-id');
    if (neuronNetworkId) {
        openDeleteNeuronNetworkModal(neuronNetworkId);
    }
};

const openRedactNeuronNetworkModal = (id) => {
    ui.RedactNeuronNetworkModal.classList.add('Active');
    ui.RedactNeuronNetworkModalOverlay.addEventListener('click', () => {
        closeRedactNeuronNetworkModal();
    });
  
    ui.BtnSubmitRedactNeuronNetwork.addEventListener('click', async () => {
        const name = ui.RedactNeuronNetworkNameInput.value;
        const link = ui.RedactNeuronNetworkLinkInput.value;
        const model = {
            neuronNetworkId: id,
            name: name,
            link: link
        };
        // await actions.submitRedactPrompt(model);
    });
};

const openDeleteNeuronNetworkModal = (id) => {
    ui.DeleteNeuronNetworkModal.classList.add('Active');

    ui.DeleteNeuronNetworkModalOverlay.addEventListener('click', () => {
        closeDeleteNeuronNetworkModal();
    });
    const deletetableNeuronNetwork = state.neuronNetworksResult.items.find(neuronnetwork => neuronnetwork.id == id);
    const deleteNeuronNetworkName = deletetableNeuronNetwork.name;

    ui.DeleteNeuronNetworkModalWarningSpan.innerHTML = `Вы действительно хотите удалить нейронную сеть "${deleteNeuronNetworkName}"?`;
    ui.BtnSubmitDeleteNeuronNetwork.addEventListener('click', async () => {
        // await actions.submitDeletePrompt(id);
    });
};

const closeRedactNeuronNetworkModal = () => {
    ui.RedactNeuronNetworkModal.classList.remove('Active');
};

const closeDeleteNeuronNetworkModal = () => {
   ui.DeleteNeuronNetworkModal.classList.remove('Active');
}