const renderNeuronNetworksTable = (neuronNetworks) => {
    const tbody = document.querySelector('.NeuronNetworksTable tbody');
    if (!tbody) return;

    if (!neuronNetworks || neuronNetworks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #64748b;">Нейронки не найдены</td></tr>';
        return;
    }

    const tableRowsHTML = neuronNetworks.map(neuronNetwork => {
        const neuronNetworkId = neuronNetwork.id ?? '—';
        const neuronNetworkName = neuronNetwork.name;
        const NeuronNetworkLink = neuronNetwork.link;
        console.log(NeuronNetworkLink);

        return `<tr class="NeuronNetworksTableRow" data-neuronNetwork-id="${neuronNetworkId}">
                <td>${neuronNetworkId}</td>
                <td>${neuronNetworkName}</td>
                <td>${NeuronNetworkLink}</td>
                <td>
                    <div class="NeuronNetworkActionsWrapper">
                        <button type="button" class="BtnRedactNeuronNetwork">
                            <img src="/Assets/Images/redactt.png" class="BtnIcon" />
                        </button>
                        <button type="button" class="BtnDeleteNeuronNetwork">
                            <img src="/Assets/Images/remove.png"  class="BtnIcon" />
                        </button>
                    </div>
                </td>
            </tr>`;
    }).join('');
    tbody.innerHTML = tableRowsHTML;
    initNeuronNetworksTable();
};

const filterAndSortNeuronNetworks = () => {
    const searchInput = document.getElementById("NeuronNetworksSearchSortInput");
    const select = document.querySelector(".NeuronNetworksSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;
    
    const result = filterAndSort({
        items: state.neuronNetworksResult.items,
        searchValue,
        searchFields: neuronNetworksSortConfig.searchFields,
        sortValue,
        sortOptions: neuronNetworksSortConfig.sortOptions
    });
    renderNeuronNetworksTable(result);
};
