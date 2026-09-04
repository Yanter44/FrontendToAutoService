const bindDocumentModalHandlers = () => {
    // 1. Открытие модалки
    ui.AddTsDocumentOpenButton?.removeEventListener('click', openAddTsDocumentModal);
    ui.AddTsDocumentOpenButton?.addEventListener('click', openAddTsDocumentModal);

    // 2. Закрытие по кнопке Отмена
    ui.AddTsDocumentCancelButton?.removeEventListener('click', closeDocumentModal);
    ui.AddTsDocumentCancelButton?.addEventListener('click', closeDocumentModal);

    // 3. Закрытие по клику на оверлей
    ui.AddTsDocumentModalOverlay?.removeEventListener('click', closeDocumentModal);
    ui.AddTsDocumentModalOverlay?.addEventListener('click', closeDocumentModal);

    // 4. обработчик на контейнере DropZone
    const dropZone = ui.AddTsDocumentModalFileDropZone;
    if (dropZone) {
        dropZone.removeEventListener('change', handleDocumentFileChange);
        dropZone.addEventListener('change', handleDocumentFileChange);
    }
    // 5. Кнопка Сохранить
    ui.AddTsDocumentModalSaveButton?.removeEventListener('click', saveDocument);
    ui.AddTsDocumentModalSaveButton?.addEventListener('click', saveDocument);

    // 6. Удаление документа из списка
    ui.CreateApplicationModalDocumentsContainer?.removeEventListener('click', removeDocument);
    ui.CreateApplicationModalDocumentsContainer?.addEventListener('click', removeDocument);
};

const openAddTsDocumentModal = async () => {
    state.documentrequirements = await requirementService.getAllDocumentRequirements();
    renderDocumentRequirements(state.documentrequirements);
    state.selectedDocFile = null;
    resetDocumentDropZone();
    renderAddTsDocumentModal();
};

const handleDocumentFileChange = (e) => {
    const target = e.target;
    if (target.id !== "AddTsDocumentModalDocumentInput") return;

    const file = target.files[0];
    if (!file) return;

    state.selectedDocFile = file;
    const fullName = file.name;
    const fileSizeText =
        file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(1)} Кб`
            : `${(file.size / (1024 * 1024)).toFixed(2)} Мб`;
    let displayName = fullName;

    if (fullName.length > 20) {
        const dot = fullName.lastIndexOf(".");
        const ext = fullName.substring(dot);
        displayName = fullName.substring(0, 12) + "..." + ext;
    }

    ui.AddTsDocumentModalFileDropZone.innerHTML = `
        <div class="DocPreviewInfo" style="display:flex;flex-direction:column;align-items:center;gap:4px;font-family:'Manrope',sans-serif;">
            <span style="font-size:32px;">📄</span>
            <span class="DropZoneText" style="font-weight:700;color:#1e293b;text-align:center;word-break:break-all;font-size:13px;">
                ${displayName}
            </span>
            <span style="font-size:11px;color:#64748b;font-weight:500;">
                Размер: ${fileSizeText}
            </span>
        </div>
        <input type="file" id="AddTsDocumentModalDocumentInput" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
    `;
};

const saveDocument = async () => {
    if (!state.selectedDocFile) {
        alert("Пожалуйста, выберите документ.");
        return;
    }

    const select = ui.AddTsDocumentModalDocumentTypeSelect;
    const typeText = select.options[select.selectedIndex].text;

    try {
        ui.AddTsDocumentModalSaveButton.disabled = true;
        ui.AddTsDocumentModalSaveButton.textContent = 'Загрузка...';
        showDocumentUploadOverlay();
        const result = await cloudinaryService.uploadFile(state.selectedDocFile);

        const fileId = "doc_" + Date.now();
        state.uploadedDocsStorage.push({
            id: fileId,
            type: typeText,
            url: result.url
        });

        const html = `
            <div class="UploadedDocCard" data-id="${fileId}">
                <button class="BtnRemovePhoto">&times;</button>
                <span style="font-size:28px;margin-bottom:4px;">📄</span>
                <span style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:700;color:#1e293b;text-align:center;line-height:1.2;">
                    ${typeText}
                </span>
            </div>
        `;
        ui.CreateApplicationModalDocsUploadWrapper.insertAdjacentHTML("beforebegin", html);

        closeDocumentModal();
    } catch (error) {
        alert('Ошибка загрузки документа: ' + error.message);
    } finally {
        hideDocumentUploadOverlay();
        ui.AddTsDocumentModalSaveButton.disabled = false;
        ui.AddTsDocumentModalSaveButton.textContent = 'Добавить';
    }
};
const showDocumentUploadOverlay = () => {
    if (ui.AddTsDocumentUploadModalOverlay) {
        ui.AddTsDocumentUploadModalOverlay.classList.add('Active');
    }
};

const hideDocumentUploadOverlay = () => {
    if (ui.AddTsDocumentUploadModalOverlay) {
        ui.AddTsDocumentUploadModalOverlay.classList.remove('Active');
    }
};
const removeDocument = (e) => {
    if (!e.target.classList.contains("BtnRemovePhoto"))
        return;
    const card = e.target.closest(".UploadedDocCard");
    const id = card.dataset.id;
    const index = state.uploadedDocsStorage.findIndex(x => x.id === id);
    if (index !== -1)
        state.uploadedDocsStorage.splice(index, 1);
    card.remove();
}
const closeDocumentModal = () => {
    ui.AddTsDocumentModal.classList.remove("Active");
    state.selectedDocFile = null;
    resetDocumentDropZone();
}
const clearUploadedFilesContainers = () => {
    uploadedPhotosStorage.length = 0;
    uploadedDocsStorage.length = 0;
    ui.CreateApplicationModalPhotosContainer?.querySelectorAll('.UploadedPhotoCard').forEach(card => card.remove());
    ui.CreateApplicationModalDocumentsContainer?.querySelectorAll('.UploadedDocCard').forEach(card => card.remove());
};
