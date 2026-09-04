const bindPhotoModalHandlers = () => {
    const dropZone = ui.AddTsPhotoModalFileDropZone;
    if (dropZone) {
        dropZone.removeEventListener('change', handlePhotoFileChange);
        dropZone.addEventListener('change', handlePhotoFileChange);
    }

    // 2. Кнопка "Сохранить"
    const saveButton = ui.AddTsPhotoSaveButton;
    if (saveButton) {
        saveButton.removeEventListener('click', savePhoto);
        saveButton.addEventListener('click', savePhoto);
    }

    // 3. Кнопка "Отмена"
    const cancelButton = ui.AddTsPhotoCancelButton;
    if (cancelButton) {
        cancelButton.removeEventListener('click', closePhotoModal);
        cancelButton.addEventListener('click', closePhotoModal);
    }

    // 4. Оверлей (клик вне модалки)
    const overlay = ui.AddTsPhotoModalOverlay;
    if (overlay) {
        overlay.removeEventListener('click', closePhotoModal);
        overlay.addEventListener('click', closePhotoModal);
    }

    // 5. Контейнер с фото (для удаления)
    const container = ui.CreateApplicationModalPhotosContainer;
    if (container) {
        container.removeEventListener('click', removePhoto);
        container.addEventListener('click', removePhoto);
    }
};


const openAddTsPhotoModal = async () => {
    state.photorequirements = await requirementService.getAllPhotoRequirements();
    renderPhotoRequirements(state.photorequirements);
    state.selectedPhotoFile = null;
    resetPhotoDropZone();
    renderAddTsPhotoModal();
};

const handlePhotoFileChange = (e) => {
     if (e.target && e.target.id === 'AddTsPhotoModalPhotoInput') {
            const file = e.target.files[0];
            if (file) {
                state.selectedPhotoFile = file;
                const objectUrl = URL.createObjectURL(file);
            
                ui.AddTsPhotoModalFileDropZone.innerHTML = `
                    <img src="${objectUrl}" class="DropZonePreviewImg" alt="Превью авто">
                    <input type="file" id="AddTsPhotoModalPhotoInput" accept="image/*">
                `;
            }
    }
};
const savePhoto = async () => {
    if (!state.selectedPhotoFile) {
        alert('Пожалуйста, выберите файл перед добавлением!');
        return;
    }
    const selectElement = document.getElementById('AddTsPhotoModalPhotoTypeSelect');
    const typeText = selectElement.options[selectElement.selectedIndex].text;

    try {
        ui.AddTsPhotoSaveButton.disabled = true;
        ui.AddTsPhotoSaveButton.textContent = 'Загрузка...';
        showPhotoUploadOverlay();
        const result = await cloudinaryService.uploadFile(state.selectedPhotoFile);

        const fileId = 'photo_' + Date.now();
        state.uploadedPhotosStorage.push({
            id: fileId,
            type: typeText,
            url: result.url
        });

        const photoCardHTML = `
            <div class="UploadedPhotoCard" data-id="${fileId}">
                <button type="button" class="BtnRemovePhoto">&times;</button>
                <img src="${result.url}" alt="${typeText}">
                <div class="PhotoBadge">${typeText}</div>
            </div>
        `;
        ui.CreateApplicationModalUploadWrapper?.insertAdjacentHTML('beforebegin', photoCardHTML);
        closePhotoModal();
    } catch (error) {
        alert('Ошибка загрузки фото: ' + error.message);
    } finally {
        hidePhotoUploadOverlay();
        ui.AddTsPhotoSaveButton.disabled = false;
        ui.AddTsPhotoSaveButton.textContent = 'Добавить';
    }
};
const showPhotoUploadOverlay = () => {
    if (ui.AddTsPhotoUploadModalOverlay) {
        ui.AddTsPhotoUploadModalOverlay.classList.add('Active');
    }
};

const hidePhotoUploadOverlay = () => {
    if (ui.AddTsPhotoUploadModalOverlay) {
        ui.AddTsPhotoUploadModalOverlay.classList.remove('Active');
    }
};
const removePhoto = () =>{

}

const closePhotoModal = () => {
    ui.AddTsPhotoModal.classList.remove("Active");
    state.selectedPhotoFile = null;
    resetPhotoDropZone();
}