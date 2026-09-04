const bindEditApplicationPhotoModalHandlers = () => {
    // Клик по кнопке редактирования в медиа-табе
    const mediaTab = document.getElementById('Tab-MediaData');
    if (mediaTab) {
        mediaTab.removeEventListener('click', handleEditPhotoButtonClick);
        mediaTab.addEventListener('click', handleEditPhotoButtonClick);
    }

    // Закрытие по оверлею
    ui.EditApplicationPhotoOverlay?.removeEventListener('click', closeEditApplicationPhotoModal);
    ui.EditApplicationPhotoOverlay?.addEventListener('click', closeEditApplicationPhotoModal);
};

const openEditApplicationPhotoModal = (photo) => {
    state.selectedPhoto = photo;
    ui.EditApplicationPhotoModal.classList.add('Active');
    
    ui.EditApplicationPhotoOriginalPhotoHolder.innerHTML = 
        `<img src="${photo.url}" class="OriginalPhotoPreview"/>`;

    ui.EditApplicationPhotoGeneratedPhotoResultHolder.innerHTML = `
        <div class="GeneratedPhotoPlaceholder">
            Результат генерации появится здесь
        </div>
    `;

    ui.BtnSubmitGeneratePhoto.removeEventListener('click', handleGeneratePhoto);
    ui.BtnSubmitGeneratePhoto.addEventListener('click', handleGeneratePhoto);
    
    ui.BtnSubmitGeneratedPhoto.removeEventListener('click', handleSubmitGeneratedPhoto);
    ui.BtnSubmitGeneratedPhoto.addEventListener('click', handleSubmitGeneratedPhoto);
};

const closeEditApplicationPhotoModal = () => {
    ui.EditApplicationPhotoModal.classList.remove('Active');
};

const handleGeneratePhoto = async () => {
    if (!state.photoTagsTagify || state.photoTagsTagify.value.length === 0) {
        alert('Выберите хотя бы один тег для генерации');
        return;
    }

    const selectedPromptIds = state.photoTagsTagify.value.map(t => t.promptId);
    const selectedAiId = Number(ui.EditApplicationPhotoNeuronNetworkSelect.value);

    if (!selectedAiId) {
        alert('Выберите нейросеть');
        return;
    }

    const generatephotomodel = {
        applicationId: state.selectedApplication.id,
        photoId: state.selectedPhoto.id,
        AiProvider: selectedAiId,
        promptsIds: selectedPromptIds,
    };
    
    await actions.generatePhoto(generatephotomodel);
};

const handleSubmitGeneratedPhoto = async () => {
    await actions.submitGeneratedPhoto();
};

const handleEditPhotoButtonClick = async (e) => {
    const editButton = e.target.closest('.MediaEditButton');
    if (!editButton) return;
    e.preventDefault();
    e.stopPropagation();

    const photoId = Number(editButton.dataset.photoId);
    const application = state.selectedApplication;

    if (!application) {
        console.error('Заявка не выбрана');
        return;
    }

    const photo = application.photos.find(x => x.id === photoId);
    if (!photo) {
        console.error('Фото не найдено:', photoId);
        return;
    }

    await ensure.prompts();
    await ensure.neuronNetworks();
    
    renderNeuronNetworks();

    const input = ui.EditApplicationPhotoTagsInput;
    const suggestions = state.promptsResult.items.map(p => ({
        value: p.tag,
        promptId: p.promptId
    }));

    if (!state.photoTagsTagify) {
        state.photoTagsTagify = new Tagify(input, {
            duplicates: false,
            maxTags: 30,
            whitelist: suggestions,
            enforceWhitelist: true
        });
    }

    state.photoTagsTagify.settings.whitelist = suggestions;
    state.photoTagsTagify.dropdown.hide();
    state.photoTagsTagify.dropdown.refilter?.();
    state.photoTagsTagify.removeAllTags();

    openEditApplicationPhotoModal(photo);
};


