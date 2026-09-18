const Toast = (() => {
    let container = null;

    // Ленивая инициализация контейнера
    function getContainer() {
        if (!container) {
            container = document.createElement('div');
            container.className = 'ToastContainer';
            document.body.appendChild(container);
        }
        return container;
    }

    // SVG-иконки по типам
    const icons = {
        success: '✔',
        error:   '✖',
        warning: '⚠',
        info:    'ℹ'
    };

    const defaultTitles = {
        success: 'Успешно',
        error:   'Ошибка',
        warning: 'Внимание',
        info:    'Информация'
    };

    /**
     * Показать тост.
     * @param {string} type - 'success' | 'error' | 'warning' | 'info'
     * @param {string} message - основной текст
     * @param {object} [opts]
     * @param {string} [opts.title] - заголовок (по умолчанию берётся из типа)
     * @param {number} [opts.duration=4000] - сколько мс показывать (0 = не закрывать автоматически)
     */
    function show(type, message, opts = {}) {
        const {
            title = defaultTitles[type] || 'Уведомление',
            duration = 4000
        } = opts;

        const toast = document.createElement('div');
        toast.className = `Toast Toast--${type.charAt(0).toUpperCase() + type.slice(1)}`;

        toast.innerHTML = `
            <div class="Toast__Icon">${icons[type] || ''}</div>
            <div class="Toast__Body">
                <div class="Toast__Title"></div>
                <div class="Toast__Message"></div>
            </div>
            <button class="Toast__Close" type="button" aria-label="Закрыть">✕</button>
        `;

        // Безопасно вставляем текст (без innerHTML — чтобы не было XSS)
        toast.querySelector('.Toast__Title').textContent = title;
        toast.querySelector('.Toast__Message').textContent = message;

        getContainer().appendChild(toast);

        // Анимация появления
        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('Show'));
        });

        // Закрытие
        let timer = null;
        const remove = () => {
            clearTimeout(timer);
            toast.classList.remove('Show');
            toast.classList.add('Hide');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        };

        toast.querySelector('.Toast__Close').addEventListener('click', remove);

        if (duration > 0) {
            timer = setTimeout(remove, duration);
        }

        return { close: remove };
    }

    // Удобные обёртки
    return {
        success: (msg, opts) => show('success', msg, opts),
        error:   (msg, opts) => show('error',   msg, opts),
        warning: (msg, opts) => show('warning', msg, opts),
        info:    (msg, opts) => show('info',    msg, opts),
        show
    };
})();