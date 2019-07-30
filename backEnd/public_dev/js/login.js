(function () {
  let formLog = document.querySelector("#formLog"),
      chPsw = document.querySelector("#chPsw"),
      upload = document.querySelector("#upload");

  formLog.addEventListener("submit", e => {
    e.preventDefault();
    let dataSet = {
      email: formLog.email.value.trim(),
      password: formLog.password.value.trim(),
      _csrf: formLog._csrf.value
    };

    if(!navigator.cookieEnabled) {

      messDiv.classList.remove("hidden");
      messText.textContent = ` W przeglądarce należy włączyć obsługę plików cookie`;
      messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }

    else if (dataSet.email && dataSet.password) {
      upload.parentElement.style.height = document.body.clientHeight + "px";
      upload.parentElement.classList.remove("hidden");
      send(dataSet, "POST", "/login", afterLogSend);
    }
    else {     
      messDiv.classList.remove("hidden");
      messText.textContent = ` Nieprawidłowo wypełnione pola formularza`;
      messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }
  });

  var demo_data = {
    email: "iksinski@iksinski.iks",
    password: "giX0sf-nHUe5Hw8GXQ9N3gtjHMglAS2RlDceiuEVYH19IGBiNfYxCyG",
    _csrf: formLog._csrf.value
  };

  demo.addEventListener("click", e => {
    if(!navigator.cookieEnabled) {

      messDiv.classList.remove("hidden");
      messText.textContent = ` W przeglądarce należy włączyć obsługę plików cookie`;
      messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }
    else send(demo_data, "POST", "/login", afterLogSend);
  });
  
  demo_2.addEventListener("click", e => {
    if(!navigator.cookieEnabled) {

      messDiv.classList.remove("hidden");
      messText.textContent = ` W przeglądarce należy włączyć obsługę plików cookie`;
      messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }
    else send(demo_data, "POST", "/login", afterLogSend);
  });

  chPsw.addEventListener("click", e => {
    let ptEmail = prompt("Wpisz adres email aby uzyskać tymczasowe hasło");

    if (!ptEmail) {return;}

    else {     
      dataSet = {
        email: ptEmail,
      _csrf: formLog._csrf.value
    };
      send(dataSet, "PUT", "/api/user/psw", afterChange);
    }
  });  

  function afterLogSend(msg) { 
    if (msg.indexOf("/") != -1) {
      window.location = window.location.origin + msg;
    }
  }

  function afterChange(msg) {

    if (msg.indexOf("@") != -1) {
      messDiv.classList.remove("hidden");
      messText.textContent = `Na adres ${msg} przesłano nowe hasło.
		Proszę postępować zgodnie ze wskazówkami zawartymi we wiadomości e-mail.`;
    messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }
  }
})();