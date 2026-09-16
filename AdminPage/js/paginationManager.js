window.paginationManager = {
    createPagination(container, getData, renderTable, pageSize = 10) {
        const el = document.querySelector(container);
        if (!el) return null;

        let currentPage = 1;
        let totalPages = 1;
        let totalItems = 0;

        async function load(page) {
            currentPage = page;
            const result = await getData(page, pageSize);
            totalItems = result.total || 0;
            totalPages = result.totalPages || 1;
            renderTable(result.items || []);
            renderButtons();
        }

        function renderButtons() {
            if (totalPages <= 1) {
                el.innerHTML = '';
                return;
            }

            let html = `
                <button class="ApplicationsPaginationButton" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
                    ←
                </button>
            `;

            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) {
                    html += `
                        <button class="ApplicationsPaginationNumber ${i === currentPage ? 'Active' : ''}" data-page="${i}">
                            ${i}
                        </button>
                    `;
                }
            } else {
                html += `
                    <button class="ApplicationsPaginationNumber ${currentPage === 1 ? 'Active' : ''}" data-page="1">
                        1
                    </button>
                `;
                if (currentPage > 3) {
                    html += `<span class="ApplicationsPaginationDots">...</span>`;
                }
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                for (let i = start; i <= end; i++) {
                    html += `
                        <button class="ApplicationsPaginationNumber ${i === currentPage ? 'Active' : ''}" data-page="${i}">
                            ${i}
                        </button>
                    `;
                }
                if (currentPage < totalPages - 2) {
                    html += `<span class="ApplicationsPaginationDots">...</span>`;
                }
                html += `
                    <button class="ApplicationsPaginationNumber ${currentPage === totalPages ? 'Active' : ''}" data-page="${totalPages}">
                        ${totalPages}
                    </button>
                `;
            }

            html += `
                <button class="ApplicationsPaginationButton" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
                    →
                </button>
            `;

            el.innerHTML = html;

            el.querySelectorAll('[data-page]').forEach(btn => {
                btn.addEventListener('click', function () {
                    const page = Number(this.dataset.page);
                    if (page && !this.disabled) {
                        load(page);
                    }
                });
            });
        }

        load(1);

        return {
            reload: () => load(currentPage),
            go: load,
            reset: () => load(1)
        };
    }
};