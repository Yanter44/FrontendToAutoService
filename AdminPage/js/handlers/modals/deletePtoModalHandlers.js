const openDeletePtoModal = (id) => {
    ui.DeletePtoModal.classList.add('Active');

    ui.DeletePtoModalOverlay.addEventListener('click', () => {
        closeDeletePtoModal();
    });
    const deletetablePto = state.ptos.find(pto => pto.id == id);
    const ptoName = deletetablePto.name;
    ui.DeletePtoModalWarningSpan.innerHTML = `Вы действительно хотите удалить ПТО "${ptoName}"?`;

    ui.BtnSubmitDeletePto.addEventListener('click', async () => {
        await actions.submitDeletePto(id);
    });
};
const closeDeletePtoModal = () => {
    ui.DeletePtoModal.classList.remove('Active');
};