(function(){

function send(dataToSend, method, target, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, window.location.origin + target);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () { 
      upload.parentElement.classList.add("hidden");

      if (xhr.status >= 200 && xhr.status < 400 && xhr.readyState === 4) {    
  
        cb(JSON.parse(xhr.responseText));
      }

      else {
        
        if (xhr.responseText == 400) {
          alert("Wystąpił błąd połączenia z serwerem");
        }

        else {
          showErrors(JSON.parse(xhr.responseText));
        }
      }
    };

    xhr.send(JSON.stringify(dataToSend));
  }

  function showErrors(msg) {
    formLog.reset();   
     if (msg === 403) {
      messDiv.classList.remove("hidden");
      messText.textContent = `W systemie
      istnieje klient o podanym adresie e-mail
      lub numerze NIP`;
      messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }

    else if (msg == 404 || msg == 406) {
      messDiv.classList.remove("hidden");
      messText.textContent = `Nieprawidłowy adres 
    email lub hasło`;
    messDiv.style.setProperty('top', window.scrollY + 300 + "px");
   
    }

    else if (msg == 408) {
      messDiv.classList.remove("hidden");
      messText.textContent = `Ten użytkownik nie dokonał aktywacj.
    Na adres email podany przy rejestracji został wysłany link aktywacyjny.
    Sprawdź wiadomości email i folder SPAM lub sontaktuj się poprzez formularz
    umieszczony na stronie głównej`;
    messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }

    else if (msg == 410) {
      messDiv.classList.remove("hidden");
      messText.textContent = `Nieprawidłowy adres 
    email. Hasło główne może by resetowane tylko dla użytkowników,
    którzy dokonywali rejestracji firmy. Dostęp do pozostałych danych możliwy jest
    poprzez panel administracyjny firmy po zalogowaniu głównego użytkownika.`;
    messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }

    else {
      messDiv.classList.remove("hidden");
      messText.textContent = "Błąd połączenia z serwerem. Spróbuj ponownie.";
      messDiv.style.setProperty('top', window.scrollY + 300 + "px");
    }
  }  
  window.send = send;
  
})();