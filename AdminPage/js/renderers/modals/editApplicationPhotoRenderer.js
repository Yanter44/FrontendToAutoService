
const renderNeuronNetworks = () => {
    const select = ui.EditApplicationPhotoNeuronNetworkSelect;

    select.innerHTML = state.availableNeuronNetworks
        .map(n => `<option value="${n.id}">${n.name}</option>`)
        .join('');
};
