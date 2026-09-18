class PaginationManager {
    constructor(config) {
        this.container = config.container;
        this.pageSize = config.pageSize || 10;
        this.currentPage = config.currentPage || 1;
        this.totalItems = 0;
        this.totalPages = 0;
        this.items = [];
        this.onPageChange = config.onPageChange || null;
        
        this.tableName = config.tableName || 'default';
        this.handleClick = this.handleClick.bind(this);
    }

    setData({ items, totalCount, page, pageSize }) {
        this.items = items || [];
        this.totalItems = totalCount || this.totalItems;
        this.currentPage = page || this.currentPage;
        this.pageSize = pageSize || this.pageSize;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize) || 1;
        this.render();
    }

    render() {
        if (!this.container) return;
        
        const { currentPage, totalPages } = this;
        let html = '';
        
        // Кнопка "Назад"
        html += `
            <button class="PaginationButton" 
                    data-page="${currentPage - 1}" 
                    ${currentPage <= 1 ? 'disabled' : ''}>
                ←
            </button>
        `;

        // Номера страниц
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                html += `
                    <button class="PaginationNumber ${i === currentPage ? 'Active' : ''}" 
                            data-page="${i}">
                        ${i}
                    </button>
                `;
            }
        } else {
            html += `
                <button class="PaginationNumber ${currentPage === 1 ? 'Active' : ''}" data-page="1">1</button>
            `;
            
            if (currentPage > 3) {
                html += `<span class="PaginationDots">...</span>`;
            }
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                html += `
                    <button class="PaginationNumber ${i === currentPage ? 'Active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            }
            
            if (currentPage < totalPages - 2) {
                html += `<span class="PaginationDots">...</span>`;
            }
            
            html += `
                <button class="PaginationNumber ${currentPage === totalPages ? 'Active' : ''}" data-page="${totalPages}">
                    ${totalPages}
                </button>
            `;
        }

        html += `
            <button class="PaginationButton" 
                    data-page="${currentPage + 1}" 
                    ${currentPage >= totalPages ? 'disabled' : ''}>
                →
            </button>
        `;
        this.container.innerHTML = html;
        this.bindEvents();
    }

    bindEvents() {
        this.container.querySelectorAll('.PaginationButton, .PaginationNumber').forEach(btn => {
            btn.removeEventListener('click', this.handleClick); 
            btn.addEventListener('click', this.handleClick);     
        });
    }

    async handleClick(e) {
        const btn = e.target.closest('button');
        if (!btn || btn.disabled) return;
        const page = Number(btn.dataset.page);
        if (!page || page === this.currentPage) return;
        
        if (this.onPageChange) {
            await this.onPageChange(page);
        }
        this.currentPage = page;
        this.render();
    }

    async loadPage(page) {
        this.currentPage = page;
        if (this.onPageChange) {
            await this.onPageChange(page);
        }
        this.render();
    }

    reset() {
        this.currentPage = 1;
        this.items = [];
        this.totalItems = 0;
        this.totalPages = 1;
        this.render();
    }
}