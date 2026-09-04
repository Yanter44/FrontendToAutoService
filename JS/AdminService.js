window.adminService = {
    async getmyprofile() {
        try {
            const response = await customFetch(`${config.API_BASE}/Admin/GetMyProfile`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    },
}