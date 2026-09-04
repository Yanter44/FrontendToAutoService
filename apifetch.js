async function customFetch(url, options = {}) {
    let response = await fetch(url, options);

    if (response.status !== 401) {
        return response;
    }
    console.log("Начат запрос на проверку токена");
    const refreshResponse = await fetch(`${config.API_BASE}/Auth/RefreshToken`, {
        method: "GET",
        credentials: "include"
    });

    if (refreshResponse.ok) {
        console.log("проверка прошла успешно");
        return await fetch(url, options);
    }
    window.location.href = `${config.DefaultStartFileLocation}/AuthorizePage/authorizepage.html`;
    return new Promise(() => {});
};

async function ensureAuthorized() {
    await customFetch(`${config.API_BASE}/Auth/Ping`, {
        method: "GET",
        credentials: "include"
    });
}
function escapeHtml(string) {
    if (!string) return '';
    return string
        .replace(/&/g, '&amp;')   
        .replace(/</g, '&lt;')   
        .replace(/>/g, '&gt;')   
        .replace(/"/g, '&quot;')  
        .replace(/'/g, '&#039;'); 
};