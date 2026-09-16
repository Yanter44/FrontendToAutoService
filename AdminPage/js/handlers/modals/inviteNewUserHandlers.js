const bindInviteUserModalHandlers = () => {
    // Открытие по кнопке "Добавить ПТО"
    ui.BtnInviteNewUser?.removeEventListener('click', openInviteUserModal);
    ui.BtnInviteNewUser?.addEventListener('click', openInviteUserModal);

    // Закрытие по оверлею
    ui.InviteNewUserModalOverlay?.removeEventListener('click', closeInviteUserModal);
    ui.InviteNewUserModalOverlay?.addEventListener('click', closeInviteUserModal);

    // Кнопка подтверждения
    ui.AddNewPtoSubmitButton?.removeEventListener('click', handleSubmitInviteUser);
    ui.AddNewPtoSubmitButton?.addEventListener('click', handleSubmitInviteUser);
};

const openInviteUserModal = () => {
    ui.InviteNewUserModal.classList.add('Active');
};
const closeInviteUserModal = () => {
    ui.InviteNewUserModal.classList.remove('Active');
};

const handleSubmitInviteUser = async () => {
    // try {
    //     await actions.submitNewPto();
    //     closeNewPtoModal();
    //     if (typeof refreshPtoTable === 'function') {
    //         await refreshPtoTable();
    //     }
    // } catch (error) {
    //     console.error('Ошибка создания ПТО:', error);
    //     alert('Ошибка при создании ПТО');
    // }
};