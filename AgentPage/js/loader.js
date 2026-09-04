window.loader = {
    totalSteps: 10,
    currentStep: 0,
    next() {
        this.currentStep++;
        const percent = Math.round(this.currentStep / this.totalSteps * 100);
        renderLoaderProgress(percent);
    },

    show() {
        document.getElementById('AppLoader')?.classList.remove('Hidden');
    },

    hide() {
        document.getElementById('AppLoader')?.classList.add('Hidden');
    }
};