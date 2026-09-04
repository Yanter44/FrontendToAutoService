async function checkAuth() {
    try {
        const response = await fetch(`${config.API_BASE}/Auth/Me`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            console.log('все прошло успешно');
            switch (data.roleType) {
                case 'Agent':
                    window.location.href = '/AgentPage/Mainpage.html';
                    break;
                case 'Moderator':
                    window.location.href = '/ModeratorPage/Mainpage.html';
                    break;
                case 'Admin':
                    window.location.href = '/AdminPage/Mainpage.html'; 
                    break;
            }
        } else {
            console.log(response);
            console.log('вход не удался, вы будете перенаправлены');
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = `${config.DefaultStartFileLocation}/AuthorizePage/authorizepage.html`;
        }
    } catch (error) {
        console.error('Ошибка:', error);
        window.location.href = `${config.DefaultStartFileLocation}/AuthorizePage/authorizepage.html`;
    }
}
checkAuth();