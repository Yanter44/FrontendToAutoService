const renderAddTsDocumentModal = () => {
    ui.AddTsDocumentModal.classList.add('Active');
};

const renderDocumentRequirements = (requirements) => {
    ui.AddTsDocumentModalDocumentTypeSelect.innerHTML = "";
    requirements.forEach(requirement => {
        const option = document.createElement("option");
        option.value = requirement.id;
        option.textContent = requirement.displayName;
        ui.AddTsDocumentModalDocumentTypeSelect.appendChild(option);
    });
};

const resetDocumentDropZone = () => {
    ui.AddTsDocumentModalFileDropZone.innerHTML = `
        <span class="DropZoneText"> Кликните, чтобы выбрать файл </span>
        <input type="file" id="AddTsDocumentModalDocumentInput" accept=".pdf,.jpg,.jpeg,.png">`;
};
