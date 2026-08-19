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

const closePhotoRequirementModal = () => { 
    ui.AddNewPhotoRequirementModal.classList.remove('Active'); 
};
const closeApplicationSidebar = () => {
    ui.Workspace.classList.remove('SidebarOpen');
};

const closeEditApplicationPhotoModal = () => {
   ui.EditApplicationPhotoModal.classList.remove('Active');
};

const closeDocumentRequirementModal = () => {
    ui.AddNewDocumentRequirementModal.classList.remove('Active');
};
const closeRedactPromptModal = () => {
    ui.RedactPromptModal.classList.remove('Active');
};
const closeDeletePromptModal = () => {
    ui.DeletePromptModal.classList.remove('Active');
};

const closeRedactUserModal = () => {
    ui.RedactUserModal.classList.remove('Active');
};
const closeDeleteUserModal = () => {
   ui.DeleteUserModal.classList.remove('Active');
};
const closeNewPtoModal = () => { 
    ui.AddNewPtoModal.classList.remove('Active'); 
};
const closeDeletePtoModal = () => {
    ui.DeletePtoModal.classList.remove('Active');
};
const closeRedactPtoModal = () => {
    ui.RedactPtoModal.classList.remove('Active');
}
const closeNewPromptModal = () => {
    ui.AddNewPromptModal.classList.remove('Active');
    if (ui.PromptTagInput) ui.PromptTagInput.value = '';
    if (ui.PromptDescriptionInput) ui.PromptDescriptionInput.value = '';
};

const closeAccrualBalanceModal = () => {
    ui.AccrualBalanceModal.classList.remove('Active');
};

const closeDeductBalanceModal = () => {
    ui.DeductBalanceModal.classList.remove('Active');
}
const clearNewPhotoRequirementFields = () => {
    ui.PhotoTypeRequirementInput.value = '';
    ui.PhotoDisplayNameRequirementInput.value = '';
    ui.PhotoIsRequiredRequirementInput.value = 'true'; 
};

const resetNewPtoForm = () => {
    ui.PtoNameInput.value = '';
    ui.PtoRsaInput.value = '';
    ui.PtoAddressInput.value = '';
    ui.PtoLatitudeInput.value = '';
    ui.PtoLongtitudeInput.value = '';
    ui.PtoLoginInput.value = '';
    ui.PtoPasswordInput.value = '';
    ui.PtoApiKeyInput.value = '';
};

const filterAndSort = ({items,searchValue,searchFields,sortValue,sortOptions}) => {
    let result = [...items];
    if(searchValue){
        const value = searchValue.toLowerCase();
        result = result.filter(item =>
            searchFields.some(field =>
                item[field]?.toString().toLowerCase().includes(value)
            )
        );
    }
    const sortFunction = sortOptions[sortValue];
    if(sortFunction){
        result.sort(sortFunction);
    }
    return result;
};