const openRedactPtoModal = (id) => {
    ui.RedactPtoModal.classList.add('Active');
    ui.RedactPtoModalOverlay.addEventListener('click', () => {
        closeRedactPtoModal();
    });
};
const closeRedactPtoModal = () => {
    ui.RedactPtoModal.classList.remove('Active');
}
