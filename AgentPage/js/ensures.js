async function ensureAuthorized() {
    await customFetch(`${config.API_BASE}/Auth/Ping`, {
        method: "GET",
        credentials: "include"
    });
}