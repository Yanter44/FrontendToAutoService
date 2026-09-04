const bindApplicationSidebarHandlers = () => {
    const tabsContainer = document.querySelector('.DetailsTabs');
    if (tabsContainer) {
        tabsContainer.removeEventListener('click', handleSidebarTabClick);
        tabsContainer.addEventListener('click', handleSidebarTabClick);
    }
    
    document.removeEventListener('click', handleSidebarOutsideClick);
    document.addEventListener('click', handleSidebarOutsideClick);
};

const handleSidebarTabClick = (e) => {
    const tab = e.target.closest('span');
    if (!tab) return;

    const tabsContainer = tab.closest('.DetailsTabs');
    if (!tabsContainer) return;

    tabsContainer.querySelectorAll('span').forEach(t => t.classList.remove('Active'));
    tab.classList.add('Active');

    const isMedia = tab.textContent.includes('Фото');
    const vehicleTab = document.getElementById('Tab-VehicleData');
    const mediaTab = document.getElementById('Tab-MediaData');

    if (isMedia) {
        vehicleTab?.classList.remove('Active', 'FadeIn');
        mediaTab?.classList.add('Active');
        setTimeout(() => mediaTab?.classList.add('FadeIn'), 10);
    } else {
        mediaTab?.classList.remove('Active', 'FadeIn');
        vehicleTab?.classList.add('Active');
        setTimeout(() => vehicleTab?.classList.add('FadeIn'), 10);
    }
};

const handleSidebarOutsideClick  = () => {
    document.addEventListener('click', (e) => {
        const isOpen = ui.Workspace.classList.contains('SidebarOpen');
        if (!isOpen) return;

        const sidebar = document.querySelector('.DetailsSidebar');
        const clickedInsideSidebar = e.target.closest('.DetailsSidebar');
        const clickedRow = e.target.closest('.ApplicationTableRow');

        if (!clickedInsideSidebar && !clickedRow) {
            closeApplicationSidebar();
        }
    });
};
const closeApplicationSidebar = () => {
    ui.Workspace.classList.remove('SidebarOpen');
};
