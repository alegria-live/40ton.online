(function () {
  var allLink = window.location.href,
      message = document.querySelector("#message"),
      toShow = document.querySelector(".hidden"),
      toHide = document.querySelector(".visible"),
      data = {
    id: allLink.slice(allLink.lastIndexOf("/") + 1)
  };

  function send(dataSet) {
    var xhr = new XMLHttpRequest();    

    xhr.open("PUT", window.location.origin + '/activation');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      afterSend(xhr.response);
    }; 
    xhr.send(JSON.stringify(data));
  }

  send();

  function afterSend(msg) {
    if (msg == 404) {
      message.textContent = `Błąd aktywacji. Kliknij ponownie na link
			umieszczony we wiadomości email wysłanej po rejestracji lub skontaktuj się
			poprzez formularz kontaktowy`;
    } else if (msg == 405) {
      toShow.className = "visible";
      toHide.className = "hidden";
      message.textContent = `Użytkownik dokonał już aktywacj.`;
    } else if (msg == 200) {
      toShow.className = "visible";
      toHide.className = "hidden";
      message.textContent = `Aktywacja przebiegła prawidłowo.`;
    } else {
      message.textContent = `Wystąpił błąd połączenia z serwerem.
			Kliknij ponownie na link umieszczony we wiadomości email wysłanej po
			rejestracji lub skontaktuj się	poprzez formularz kontaktowy`;
    }
  }
})();