window.authService = {
    async login(email, password) {
        try {
            const response = await fetch(`${config.API_BASE}/Auth/Login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ email: email, password: password })
            });

            if (!response.ok) {
                return false; 
            }
            return true; 
        } catch (error) {
            console.error('Ошибка сети:', error);
            return false;
        }
    },
    async register(email, password) {
        try {
            const response = await fetch(`${config.API_BASE}/Auth/TryRegistration`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (!response.ok) {
                alert(result.message);
                return false;
            }
            
            localStorage.setItem('registrationKey', result.data);
            regAuthdata.Email = email;
            regAuthdata.Password = password;
            regAuthdata.RegistrationId = result.data;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async confirmCode(registrationId, code){
        try
        {
           const response = await fetch(`${config.API_BASE}/Auth/ConfirmRegistrationCode`, {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({
                   registrationId: registrationId,
                   code: code
               })
           });
           if(!response.ok){
             return false;
           }
           return true;
        }catch(error){
            console.log('ошибка:', error);
            return false;
        }
    },
    async finishRegistration(regAuthdatamodel)
    {
       try
       {
            const response = await fetch(`${config.API_BASE}/Auth/FinishRegistration`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(regAuthdatamodel)
            });
            if(!response.ok){
                return false;
            }
            return true;
       }catch(error){
          console.log('ошибка:', error);
       }
    },
    async signOut() {
        try {
            const response = await customFetch(`${config.API_BASE}/Auth/SignOut`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            if (response.ok) {
                window.location.href = `${config.DefaultStartFileLocation}/AuthorizePage/authorizepage.html`;
            }
        }
        catch (error) {
            console.error(error);
        }
    },
}