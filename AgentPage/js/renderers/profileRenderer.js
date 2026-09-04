const renderProfile = (data) => {
    console.log("данные профиля", data);
    const firstLetter = data.fio?.[0]?.toUpperCase() ?? '?';
    const roleText = `Должность: Агент`;

    ui.useravatarletter.textContent = firstLetter;
    ui.username.textContent = data.fio;
    ui.userrole.textContent = roleText;
      
    if (ui.DropDownUseravatarletter) ui.DropDownUseravatarletter.textContent = firstLetter;
    if (ui.DropDownUsername) ui.DropDownUsername.textContent = data.fio;
    if (ui.DropDownUserrole) ui.DropDownUserrole.textContent = roleText;

    ui.DropDownSignOutButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await authService.signOut();
    });
};