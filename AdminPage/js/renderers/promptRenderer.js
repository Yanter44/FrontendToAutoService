const renderPromptsTable = (prompts) => {
    const tbody = document.querySelector('.PromptTable tbody');
    if (!tbody) return;

    if (!prompts || prompts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #64748b;">Промпты не найдены</td></tr>';
        return;
    }

    const tableRowsHTML = prompts.map(prompt => {
        const promptId = prompt.promptId ?? '—';
        const promptTag = escapeHtml(prompt.tag || 'без_тега');
        const promptDescription = escapeHtml(prompt.description || 'Нет описания');

        return `<tr class="PromptTableRow" data-prompt-id="${promptId}">
                <td>${promptId}</td>
                <td><span class="PromptTagBadge">#${promptTag}</span></td>
                <td>${promptDescription}</td>
                <td>
                    <div class="PromptActionsWrapper">
                        <button type="button" class="BtnRedactPrompt">
                            <img src="/Assets/Images/redactt.png" class="BtnIcon" />
                        </button>
                        <button type="button" class="BtnDeletePrompt">
                            <img src="/Assets/Images/remove.png"  class="BtnIcon" />
                        </button>
                    </div>
                </td>
            </tr>`;
    }).join('');
    tbody.innerHTML = tableRowsHTML;
    initPromptsTable();
};

const filterAndSortPrompts = () => {
    const searchInput = document.getElementById("PromptsSearchSortInput");
    const select = document.querySelector(".PromptsSortSelect select");

    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = select.value;
    
    const result = filterAndSort({
        items: state.prompts,
        searchValue,
        searchFields: promptsSortConfig.searchFields,
        sortValue,
        sortOptions: promptsSortConfig.sortOptions
    });
    renderPromptsTable(result);
};
