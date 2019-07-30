(function () {
  let formElemts = document.querySelector("#register"),
      checkEmail = document.querySelector('[name="email"]'),
      checkNip = document.querySelector('[name="nip"]'),
      upload = document.querySelector("#upload");


  formElemts.addEventListener("submit", e => {
    
    e.preventDefault();

    let dataToSend = {
      dataSet: {
        name: formElemts.name.value.trim(),
        lastName: formElemts.lastName.value.trim(),
        company: formElemts.company.value.trim(),
        nip: parseInt(formElemts.nip.value.trim()),
        street: formElemts.street.value.trim(),
        city: formElemts.city.value.trim(),
        post: formElemts.post.value.trim(),
        country: formElemts.country.value.trim(),
        email: formElemts.email.value.trim(),
        password: formElemts.password.value.trim(),
        date: new Date().toLocaleDateString(),
        workers: [],
        orders: [],
        invoices: [],
        activ: 0,
        permission: 1        
      },
      _csrf: formElemts._csrf.value
    };

    if (checkInputs()) {
      upload.parentElement.style.height = document.body.clientHeight + "px";
      upload.parentElement.classList.remove("hidden");
      send(dataToSend, 'POST', '/api/user', afterRegistrationSend);
      return;
    }
    else {
      messDiv.classList.remove("hidden");
      messDiv.style.setProperty('top', window.scrollY + 300 + "px");
      messText.textContent = `Zaznaczone pola zostały
			błędnie wypełnione`;     
    }
  }, false);

  function checkInputs() {
    let x = 1,
      inputs = formElemts.querySelectorAll("input"),
      classError = document.querySelectorAll('[class = "error"]'); 
      classError.forEach(elem => {
      elem.classList.remove("error");
    });

    inputs.forEach(elem => {
      if(!elem.value) {elem.classList.add("error");
        x = 0;    
      }
    });

    if (formElemts.nip.value.indexOf("-") > -1 || formElemts.nip.value.length != 10) {
      formElemts.nip.classList.add("error");
      x = 0;
    }   
    if (formElemts.email.value.indexOf("@") === -1) {
      formElemts.email.classList.add("error");
      x = 0;
    }
    if (formElemts.email.value !== formElemts.email2.value) {
      formElemts.email.classList.add("error");
      formElemts.email2.classList.add("error");
      x = 0;
    }
    if (formElemts.password.value !== formElemts.password2.value) {
      formElemts.password.classList.add("error");
      formElemts.password2.classList.add("error");
      x = 0;
    }
    return x;
  }

  function afterRegistrationSend(msg) {
    messDiv.classList.remove("hidden");
    messText.textContent = `Na adres e-mail: ${msg}
		została wysłana wiadomość potwierdzająca nowego użytkownika.
	 	Aby zakończyć proces rejestracji proszę sprawdzić pocztę przychodzącą.
	 	W przypadku braku informacji proszę sprawdzić folder SPAM.`;
    messDiv.style.setProperty('top', 300 + "px");
    register.reset();
    regBtn.classList.toggle("asc");
    regDiv.classList.add("hidden");
  }

  window.afterRegistrationSend = afterRegistrationSend;
})();