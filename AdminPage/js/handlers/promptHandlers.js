const bindPromptHandlers = () => {
    initPromptsTable();
};

const initPromptsTable = () => {
    // Кнопки редактирования
    document.querySelectorAll('.BtnRedactPrompt').forEach(button => {
        button.removeEventListener('click', handleRedactPromptClick);
        button.addEventListener('click', handleRedactPromptClick);
    });
    // Кнопки удаления
    document.querySelectorAll('.BtnDeletePrompt').forEach(button => {
        button.removeEventListener('click', handleDeletePromptClick);
        button.addEventListener('click', handleDeletePromptClick);
    });
};

const handleRedactPromptClick = (e) => {
    const button = e.currentTarget;
    const row = button.closest('.PromptTableRow');
    if (!row) return;

    const promptId = row.getAttribute('data-prompt-id');
    if (promptId) {
        openRedactPromptModal(promptId);
    }
};

const handleDeletePromptClick = (e) => {
    const button = e.currentTarget;
    const row = button.closest('.PromptTableRow');
    if (!row) return;

    const promptId = row.getAttribute('data-prompt-id');
    if (promptId) {
        openDeletePromptModal(promptId);
    }
};

const openRedactPromptModal = (id) => {
    ui.RedactPromptModal.classList.add('Active');
    ui.RedactPromptModalOverlay.addEventListener('click', () => {
        closeRedactPromptModal();
    });
  
    ui.BtnSubmitRedactPrompt.addEventListener('click', async () => {
        const tag = ui.RedactPromptModalTagInput.value;
        const description = ui.RedactPromptModalDescriptionInput.value;
        const model = {
            promptId: id,
            tag: tag,
            description: description
        };
        await actions.submitRedactPrompt(model);
    });
};

const openDeletePromptModal = (id) => {
    ui.DeletePromptModal.classList.add('Active');

    ui.DeletePromptModalOverlay.addEventListener('click', () => {
        closeDeletePromptModal();
    });
    const deletetablePrompt = state.promptsResult.items.find(prompt => prompt.promptId == id);
    const deletePromptTag = deletetablePrompt.tag;

    ui.DeletePromptModalWarningContentSpan.innerHTML = `Вы действительно хотите удалить промпт "${deletePromptTag}"?`;
    ui.BtnSubmitDeletePrompt.addEventListener('click', async () => {
        await actions.submitDeletePrompt(id);
    });
};

const closeRedactPromptModal = () => {
    ui.RedactPromptModal.classList.remove('Active');
};
