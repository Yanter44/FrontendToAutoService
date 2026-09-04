const renderLoaderProgress = (percent) => {
    console.log(percent);
    ui.LoaderProgressBarProgressFill.style.width = `${percent}%`;
    ui.LoaderLoadingProgressBarPercents.innerHTML = `${percent}%`;
};