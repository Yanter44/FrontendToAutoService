
const bindEditPhotoRequirementHandlers = () => {
    const container = ui.PhotoRequirementsTableBody;
    if (container) {
        container.removeEventListener('click', handleEditPhotoTableClick);
        container.addEventListener('click', handleEditPhotoTableClick);
    }

    bindEditPhotoRequirementSubmitHandler();

    const overlay = document.querySelector('.EditPhotoRequirementModalOverlay');
    if (overlay) {
        overlay.removeEventListener('click', closeEditPhotoRequirementModal);
        overlay.addEventListener('click', closeEditPhotoRequirementModal);
    }
    
};
const handleEditPhotoTableClick = (e) => {
    const redactBtn = e.target.closest('.BtnRedactPhotoRequirement');
    if (redactBtn) {
        const row = redactBtn.closest('tr');
        const id = Number(row.dataset.requirementId);
        if (id) openEditPhotoRequirementModal(id);
        return;
    }

    const deleteBtn = e.target.closest('.BtnDeletePhotoRequirement');
    if (deleteBtn) {
        const row = deleteBtn.closest('tr');
        const id = Number(row.dataset.requirementId);
        if (id) openDeletePhotoRequirementModal(id);
        return;
    }
};

const openDeletePhotoRequirementModal = (id) => {
    ui.DeletePhotoRequirementModal.classList.add('Active');
    const deleteBtn = document.querySelector('.BtnSubmitDeletePhotoRequirement');
    if (deleteBtn) {
        deleteBtn.dataset.id = id;
    }
    const overlay = document.querySelector('.DeletePhotoRequirementModalOverlay'); 
    if (overlay) {
        overlay.removeEventListener('click', closeDeletePhotoRequirementModal);
        overlay.addEventListener('click', closeDeletePhotoRequirementModal);
    }
    const warningSpan = document.querySelector('.DeletePhotoRequirementModalWarningContentSpan');
    if (warningSpan) { 
        const requirement = state.photorequirements.find(r => r.id === id);
        warningSpan.textContent = `Вы уверены, что хотите удалить требование "${requirement?.displayName || id}"?`;
    }
};
const openEditPhotoRequirementModal = (id) => {
    const requirement = state.photorequirements.find(r => r.id === id);
    if (!requirement) {
        alert('Требование не найдено');
        return;
    }

    document.getElementById('EditPhotoRequirementTypeInput').value = requirement.photoType || '';
    document.getElementById('EditPhotoRequirementDisplayNameInput').value = requirement.displayName || '';
    document.getElementById('EditPhotoRequirementIsRequireInput').value = requirement.isRequire ? 'true' : 'false';

    const saveBtn = document.querySelector('.EditPhotoRequirementSubmitButton');
    saveBtn.dataset.id = id;

    ui.EditPhotoRequirementModal.classList.add('Active');
};

const bindEditPhotoRequirementSubmitHandler = () => {
    const saveBtn = document.querySelector('.EditPhotoRequirementSubmitButton');
    if (!saveBtn) return;

    saveBtn.removeEventListener('click', handleEditPhotoRequirementSubmit);
    saveBtn.addEventListener('click', handleEditPhotoRequirementSubmit);
};

const handleEditPhotoRequirementSubmit = async (e) => {
    const saveBtn = e.currentTarget;
    const id = Number(saveBtn.dataset.id);
    if (!id) {
        alert('ID требования не найден');
        return;
    }
    const photoType = document.getElementById('EditPhotoRequirementTypeInput').value.trim();
    const displayName = document.getElementById('EditPhotoRequirementDisplayNameInput').value.trim();
    const isRequire = document.getElementById('EditPhotoRequirementIsRequireInput').value === 'true';

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

const closeEditPhotoRequirementModal = () => {
    ui.EditPhotoRequirementModal.classList.remove('Active');
    document.getElementById('EditPhotoRequirementTypeInput').value = '';
    document.getElementById('EditPhotoRequirementDisplayNameInput').value = '';
    document.getElementById('EditPhotoRequirementIsRequireInput').value = 'true';
    const saveBtn = document.querySelector('.EditPhotoRequirementSubmitButton');
    if (saveBtn) {
        saveBtn.dataset.id = '';
    }
};
const closeDeletePhotoRequirementModal = () => {
    ui.DeletePhotoRequirementModal.classList.remove('Active');
    const warningSpan = document.querySelector('.DeletePhotoRequirementModalWarningContentSpan');
    if (warningSpan) {
        warningSpan.textContent = '';
    }
    // Сбрасываем dataset у кнопки удаления, если он там используется
    const deleteBtn = document.querySelector('.BtnSubmitDeletePhotoRequirement');
    if (deleteBtn) {
        deleteBtn.dataset.id = '';
    }
};
