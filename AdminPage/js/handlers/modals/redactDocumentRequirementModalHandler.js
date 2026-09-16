const bindEditDocumentRequirementHandlers = () => {
    const container = ui.DocumentRequirementsTableBody;
     if (container) {
        container.removeEventListener('click', handleEditDocumentTableClick);
        container.addEventListener('click', handleEditDocumentTableClick);
    }
    bindEditDocumentRequirementSubmitHandler();
    const overlay = document.querySelector('.EditDocumentRequirementModalOverlay');
    if (overlay) {
        overlay.removeEventListener('click', closeEditDocumentRequirementModal);
        overlay.addEventListener('click', closeEditDocumentRequirementModal);
    }
};

const handleEditDocumentTableClick = (e) => {
    const redactBtn = e.target.closest('.BtnRedactDocumentRequirement');
    if (redactBtn) {
        const row = redactBtn.closest('tr');
        const id = Number(row.dataset.requirementId);
        if (id) openEditDocumentRequirementModal(id);
        return;
    }
    const overlay = document.querySelector('.DeleteDocumentRequirementModalOverlay'); 
    if (overlay) {
        overlay.removeEventListener('click', closeDeleteDocumentRequirementModal);
        overlay.addEventListener('click', closeDeleteDocumentRequirementModal);
    }
    const deleteBtn = e.target.closest('.BtnDeleteDocumentRequirement');
    if (deleteBtn) {
        const row = deleteBtn.closest('tr');
        const id = Number(row.dataset.requirementId);
        if (id) openDeleteDocumentRequirementModal(id);
        return;
    }
};

const openDeleteDocumentRequirementModal = (id) => {
    ui.DeleteDocumentRequirementModal.classList.add('Active');
    
    const deleteBtn = document.querySelector('.BtnSubmitDeleteDocumentRequirement');
    if (deleteBtn) {
        deleteBtn.dataset.id = id;
    }
    
    const warningSpan = document.querySelector('.DeleteDocumentRequirementModalWarningContentSpan');
    if (warningSpan) {
        const requirement = state.documentrequirements.find(r => r.id === id);
        warningSpan.textContent = `Вы уверены, что хотите удалить требование "${requirement?.displayName || id}"?`;
    }
};

const closeDeleteDocumentRequirementModal = () => {
    ui.DeleteDocumentRequirementModal.classList.remove('Active');
    
    const warningSpan = document.querySelector('.DeleteDocumentRequirementModalWarningContentSpan');
    if (warningSpan) {
        warningSpan.textContent = '';
    }
    
    const deleteBtn = document.querySelector('.BtnSubmitDeleteDocumentRequirement');
    if (deleteBtn) {
        deleteBtn.dataset.id = '';
    }
};
const openEditDocumentRequirementModal = (id) => {
    const requirement = state.documentrequirements.find(r => r.id === id);
    if (!requirement) {
        alert('Требование не найдено');
        return;
    }

    document.getElementById('EditDocumentRequirementTypeInput').value = requirement.documentType || '';
    document.getElementById('EditDocumentRequirementDisplayNameInput').value = requirement.displayName || '';
    document.getElementById('EditDocumentRequirementIsRequireInput').value = requirement.isRequire ? 'true' : 'false';

    const saveBtn = document.querySelector('.EditDocumentRequirementSubmitButton');
    saveBtn.dataset.id = id;

    ui.EditDocumentRequirementModal.classList.add('Active');
};
const bindEditDocumentRequirementSubmitHandler = () => {
    const saveBtn = document.querySelector('.EditDocumentRequirementSubmitButton');
    if (!saveBtn) return;

    saveBtn.removeEventListener('click', handleEditDocumentRequirementSubmit);
    saveBtn.addEventListener('click', handleEditDocumentRequirementSubmit);
};

const handleEditDocumentRequirementSubmit = async (e) => {
    const saveBtn = e.currentTarget;
    const id = Number(saveBtn.dataset.id);
    if (!id) {
        alert('ID требования не найден');
        return;
    }
    const photoType = document.getElementById('EditDocumentRequirementTypeInput').value.trim();
    const displayName = document.getElementById('EditDocumentRequirementDisplayNameInput').value.trim();
    const isRequire = document.getElementById('EditDocumentRequirementIsRequireInput').value === 'true';

    if (!photoType || !displayName) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    try {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Сохранение...';
        const editPhotoRequirementModal = {
            id: id,
            photoType: photoType,
            displayName: displayName,
            isRequire: isRequire
        };
        const result = await requirementService.editPhotoRequirement(editPhotoRequirementModal);
        if (result.success) {
            const index = state.photorequirements.findIndex(r => r.id === id);
            if (index !== -1) {
                state.photorequirements[index] = result.data;
            }
            renderPhotoRequirementsTable(state.photorequirements);
            closeEditPhotoRequirementModal();

            alert('Требование успешно обновлено');
        } else {
            alert(result.message || 'Ошибка при обновлении');
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Сохранить';
    }
};
const closeEditDocumentRequirementModal = () => {
    ui.EditDocumentRequirementModal.classList.remove('Active');
    document.getElementById('EditDocumentRequirementTypeInput').value = '';
    document.getElementById('EditDocumentRequirementDisplayNameInput').value = '';
    document.getElementById('EditDocumentRequirementIsRequireInput').value = 'true';
    const saveBtn = document.querySelector('.EditDocumentRequirementSubmitButton');
    if (saveBtn) {
        saveBtn.dataset.id = '';
    }
};
