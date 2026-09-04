const renderProfile = (data) => {
    const firstLetter = data.name?.[0]?.toUpperCase() ?? '?';
    const roleText = `Должность: ${data.role}`;

    ui.useravatarletter.textContent = firstLetter;
    ui.username.textContent = escapeHtml(data.name);
    ui.userrole.textContent = roleText;
      
    if (ui.DropDownUseravatarletter) ui.DropDownUseravatarletter.textContent = firstLetter;
    if (ui.DropDownUsername) ui.DropDownUsername.textContent = data.name;
    if (ui.DropDownUserrole) ui.DropDownUserrole.textContent = roleText;

    ui.DropDownSignOutButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await authService.signOut();
    });
};