const renderAddTsPhotoModal = () => {
    ui.AddTsPhotoModal.classList.add('Active');
};
const renderPhotoRequirements = (requirements) => {
    ui.AddTsPhotoModalPhotoTypeSelect.innerHTML = "";
    requirements.forEach(requirement => {
        const option = document.createElement("option");
        option.value = requirement.id;
        option.textContent = requirement.displayName;
        ui.AddTsPhotoModalPhotoTypeSelect.appendChild(option);
    });
};

const resetPhotoDropZone = () => {
   ui.AddTsPhotoModalFileDropZone.innerHTML = `
        <span class="DropZoneText">Кликните, чтобы выбрать файл</span>
        <input type="file" id="AddTsPhotoModalPhotoInput" accept="image/*">
   `;
};
