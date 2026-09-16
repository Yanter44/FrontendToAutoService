const ui = {
    loginCard: document.getElementById('LoginCard'),
    registerCard: document.getElementById('RegisterCard'),
    codeCard: document.getElementById('CodeCard'),
    nameCard: document.getElementById('NameCard'),

    toRegisterLink: document.querySelector('.JsToRegister'),
    toLoginLink: document.querySelector('.JsToLogin'),

    loginEmailInput: document.getElementById('LoginEmail'),
    loginPasswordInput: document.getElementById('LoginPassword'),
    loginSubmitBtn: document.getElementById('LoginSubmitBtn'),
    
    registerEmailInput: document.getElementById('RegisterEmail'),
    registerPasswordInput: document.getElementById('RegisterPassword'),
    registerSubmitBtn: document.getElementById('RegisterSubmitBtn'),
    
    codeInputs: document.querySelectorAll('.CodeInput'),
    codeSubmitBtn: document.getElementById('CodeSubmitBtn'),

    FioInput: document.getElementById('FIOInput'),
    FIOSubmitBtn: document.getElementById('FIOSubmitBtn'),
};

const regAuthdata = {
    registrationId: null,
    fio: null,
    email: null,
    password: null
};

const initAuthFlow = () => {
    ui.toRegisterLink?.addEventListener('click', (e) => {
        e.preventDefault();
        ui.loginCard.classList.add('Hidden');
        ui.registerCard.classList.remove('Hidden');
    });

    ui.toLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        ui.registerCard.classList.add('Hidden');
        ui.loginCard.classList.remove('Hidden');
    });

    ui.loginSubmitBtn?.addEventListener('click', async () => {
        const email = ui.loginEmailInput.value;
        const password = ui.loginPasswordInput.value;
        if (!email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        const success = await authService.login(email, password);
        if (success) {
            window.location.href = `${config.DefaultStartFileLocation}/index.html`;
        } else {
            alert('Неверный email или пароль');
        }
    });

    ui.registerSubmitBtn?.addEventListener('click', async () =>{
        const email = ui.registerEmailInput.value;
        const password = ui.registerPasswordInput.value;
        if (!email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        const success = await authService.register(email, password);
        if (success) {
            ui.registerCard.classList.add('Hidden');
            ui.codeCard.classList.remove('Hidden');
        }else {
            alert('Неверный email или пароль');
        }
    });

    ui.codeSubmitBtn?.addEventListener('click', async () => {
        const code = Array.from(ui.codeInputs).map(input => input.value).join('');
        const registrationId = localStorage.getItem('registrationKey');

        if (code.length !== 6) { 
           alert('Пожалуйста, введите полный код');
           return;
        }
        const success = await authService.confirmCode(registrationId, code);
        if(success){
            ui.codeCard.classList.add('Hidden');
            ui.nameCard.classList.remove('Hidden');
        }
        else{
            alert('Неверный код');
        }
    });

    ui.FIOSubmitBtn?.addEventListener('click', async () => {
        const fio = ui.FioInput.value;
        if (!fio) {
            alert('Пожалуйста, введите ваше ФИО');
            return;
        }
        regAuthdata.fio = fio;
        const success = await authService.finishRegistration(regAuthdata);
        if(success){
            window.location.href = `${config.DefaultStartFileLocation}/index.html`;
        }
        else{
            alert("Что-то пошло не так :(");
        }
    });
};

const initCodeInputs = () => {
    ui.codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < ui.codeInputs.length - 1) {
                ui.codeInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                ui.codeInputs[index - 1].focus();
            }
        });
    });
};

const initApp = () => {
    initAuthFlow();
    initCodeInputs();
};

document.addEventListener('DOMContentLoaded', initApp);