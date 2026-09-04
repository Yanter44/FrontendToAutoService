
const renderLoaderProgress = (percent) => {
    ui.LoaderProgressBarProgressFill.style.width = `${percent}%`;
    ui.LoaderLoadingProgressBarPercents.innerHTML = `${percent}%`;
};
