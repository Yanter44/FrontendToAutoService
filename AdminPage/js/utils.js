const isMobileLayout = () => window.matchMedia('(max-width: 1024px)').matches;

const clearDropdownPosition = (element) => {
    if (!element) return;
    element.style.top = '';
    element.style.left = '';
    element.style.right = '';
    element.style.width = '';
};
const bindSortEvents = (select, searchInput, callback) => {
    if (select) {
        select.onchange = callback;
    }
    if (searchInput) {
        searchInput.oninput = callback;
    }
};
function generateUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
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

const closeDeletePromptModal = () => {
    ui.DeletePromptModal.classList.remove('Active');
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