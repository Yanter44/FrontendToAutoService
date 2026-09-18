const bindInviteUserModalHandlers = () => {
    // Открытие по кнопке "Добавить ПТО"
    ui.BtnInviteNewUser?.removeEventListener('click', openInviteUserModal);
    ui.BtnInviteNewUser?.addEventListener('click', openInviteUserModal);

    // Закрытие по оверлею
    ui.InviteNewUserModalOverlay?.removeEventListener('click', closeInviteUserModal);
    ui.InviteNewUserModalOverlay?.addEventListener('click', closeInviteUserModal);

    // Кнопка подтверждения
    ui.InviteNewUserSubmitBtn?.removeEventListener('click', handleSubmitInviteUser);
    ui.InviteNewUserSubmitBtn?.addEventListener('click', handleSubmitInviteUser);
};

const openInviteUserModal = () => {
    ui.InviteNewUserModal.classList.add('Active');
};
const closeInviteUserModal = () => {
    ui.InviteNewUserModal.classList.remove('Active');
};

const handleSubmitInviteUser = async () => {
    const selectedrole = ui.InviteNewUserModalSelect?.value?.trim();;
    const enteredemail = ui.InviteNewUserEmailInput?.value?.trim();;
    const model = {
            email: enteredemail,
            role: selectedrole
        };
    console.log(model);
    try {
        await actions.submitInviteNewUser(model);
        closeInviteUserModal();
    } catch (error) {
        console.error('Произошла ошибка при приглашении пользователя:', error);
        alert('Произошла ошибка при приглашении пользователя');
    }
};