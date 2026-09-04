const dateTimeFormatter = {
    // Только дата: 19.06.2026
    formatDate(dateString) {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "—" : date.toLocaleDateString('ru-RU');
    },

    // Дата и время: 19.06.2026, 17:18
    formatDateTime(dateString) {
        if (!dateString) return "—";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "—";
        
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};