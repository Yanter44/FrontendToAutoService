const renderNeuronNetworks = (neuronnetworks) => {
    const select = ui.EditApplicationPhotoNeuronNetworkSelect;
    select.innerHTML = neuronnetworks.map(neuronNetwork => `<option value="${neuronNetwork.id}">${neuronNetwork.name}</option>`).join('');
};
const renderGeneratedPhoto = (base64, { isLoading = false } = {}) => {
    const holder = ui.EditApplicationPhotoGeneratedPhotoResultHolder;
    if (!holder) return;

    if (isLoading) {
        holder.innerHTML = `
            <div class="GeneratedPhotoPlaceholder GeneratedPhotoPlaceholder--loading">
                <div class="GeneratedPhotoSpinner"></div>
                <span>Генерация, ожидайте…</span>
            </div>`;
        return;
    }

    if (!base64) {
        holder.innerHTML = `
            <div class="GeneratedPhotoPlaceholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                     stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                </svg>
                <span>Результат генерации появится здесь</span>
            </div>`;
        return;
    }

    const src = base64.startsWith('data:')
        ? base64
        : `data:image/png;base64,${base64}`;

    holder.innerHTML = `
        <img src="${src}" class="GeneratedPhotoPreview" alt="Сгенерированное фото"/>`;
};