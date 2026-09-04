const openDeleteUserModal = (id) => {
    ui.DeleteUserModal.classList.add('Active');
    ui.DeleteUserModalOverlay.addEventListener('click', () => {
       closeDeleteUserModal(); 
    });
    const deletableUser = state.usersResult.items.find(user => user.userId == id);
    const deletableUserName = deletableUser.fio;

    ui.DeleteUserModalWarningContentSpan.innerHTML = `Вы действительно хотите удалить пользователя "${deletableUserName}"?`;
    ui.BtnSubmitDeleteUser.addEventListener('click', async () => {
        await actions.submitDeleteUser(id);
    });
};
const closeDeleteUserModal = () => {
   ui.DeleteUserModal.classList.remove('Active');
};