const bindUserHandlers = () => {
    initUsersTable();
};

const initUsersTable = () => {
    // Кнопки редактирования
    document.querySelectorAll('.BtnRedactUser').forEach(button => {
        button.removeEventListener('click', handleRedactUserClick);
        button.addEventListener('click', handleRedactUserClick);
    });
    // Кнопки удаления
    document.querySelectorAll('.BtnDeleteUser').forEach(button => {
        button.removeEventListener('click', handleDeleteUserClick);
        button.addEventListener('click', handleDeleteUserClick);
    });
};

const handleRedactUserClick = (e) => {
    const button = e.currentTarget;
    const row = button.closest('.UserTableRow');
    if (!row) return;

    const userId = row.getAttribute('data-user-id');
    if (userId) {
        openRedactUserModal(userId);
    }
};
const filterAndSortUsers = () => {
    const searchInput = document.getElementById("UsersSearchSortInput");
    const select = document.querySelector(".UsersSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;

    const result = filterAndSort({
        items: state.users,
        searchValue,
        searchFields: usersSortConfig.searchFields,
        sortValue,
        sortOptions: usersSortConfig.sortOptions
    });
    renderUsersTable(result);
};
const handleDeleteUserClick = (e) => {
    const button = e.currentTarget;
    const row = button.closest('.UserTableRow');
    if (!row) return;

    const userId = row.getAttribute('data-user-id');
    if (userId) {
        openDeleteUserModal(userId);
    }
};