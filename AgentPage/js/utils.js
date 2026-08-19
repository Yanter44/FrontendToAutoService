const isMobileLayout = () => window.matchMedia('(max-width: 1024px)').matches;

const clearDropdownPosition = (element) => {
    if (!element) return;
    element.style.top = '';
    element.style.left = '';
    element.style.right = '';
    element.style.width = '';
};

const positionDropdown = () => {
    if (!ui.profileTrigger || !ui.profileDropdown) return;
    if (isMobileLayout()) {
        clearDropdownPosition(ui.profileDropdown);
        return;
    }
    const rect = ui.profileTrigger.getBoundingClientRect();
    ui.profileDropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
    ui.profileDropdown.style.left = `${rect.right + window.scrollX - ui.profileDropdown.offsetWidth}px`;
};

const positionNotificationModalDropDown = () => {
    if(!ui.NotificationTrigger || !ui.NotificationModalDropDown) return;
    if (isMobileLayout()) {
        clearDropdownPosition(ui.NotificationModalDropDown);
        return;
    }
    const rect = ui.NotificationTrigger.getBoundingClientRect();
    ui.NotificationModalDropDown.style.top = `${rect.bottom + window.scrollY + 8}px`;
    ui.NotificationModalDropDown.style.left = `${rect.right + window.scrollX - ui.NotificationModalDropDown.offsetWidth}px`;
};

const clearUploadedFilesContainers = () => {
    uploadedPhotosStorage.length = 0;
    uploadedDocsStorage.length = 0;
    ui.CreateApplicationModalPhotosContainer?.querySelectorAll('.UploadedPhotoCard').forEach(card => card.remove());
    ui.CreateApplicationModalDocumentsContainer?.querySelectorAll('.UploadedDocCard').forEach(card => card.remove());
};


const resetPhotoDropZone = () => {
   ui.AddTsPhotoModalFileDropZone.innerHTML = `
        <span class="DropZoneText">Кликните, чтобы выбрать файл</span>
        <input type="file" id="AddTsPhotoModalPhotoInput" accept="image/*">
   `;
};

const resetDocumentDropZone = () => {
    ui.AddTsDocumentModalFileDropZone.innerHTML = `
        <span class="DropZoneText"> Кликните, чтобы выбрать файл </span>
        <input type="file" id="AddTsDocumentModalDocumentInput" accept=".pdf,.jpg,.jpeg,.png">`;
};

const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
};
const formatDateTime = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};