const bindPtoHandlers = () => {
    initPtosTable();
};

const handleRedactPtoClick = (e) => {
    console.log("редактировать");
    const button = e.currentTarget;
    const row = button.closest('.PtoTableRow');
    if (!row) return;

    const ptoId = row.getAttribute('data-pto-id');
    if (ptoId) {
        openRedactPtoModal(ptoId);
    }
};

const handleDeletePtoClick = (e) => {
    console.log("удалить");
    const button = e.currentTarget;
    const row = button.closest('.PtoTableRow');
    if (!row) return;

    const ptoId = row.getAttribute('data-pto-id');
    if (ptoId) {
        openDeletePtoModal(ptoId);
    }
};

const initPtosTable = () => {
    // Кнопки редактирования
    document.querySelectorAll('.BtnRedactPto').forEach(button => {
        button.removeEventListener('click', handleRedactPtoClick);
        button.addEventListener('click', handleRedactPtoClick);
    });

    // Кнопки удаления
    document.querySelectorAll('.BtnDeletePto').forEach(button => {
        button.removeEventListener('click', handleDeletePtoClick);
        button.addEventListener('click', handleDeletePtoClick);
    });
};




