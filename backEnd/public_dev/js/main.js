(function($, window, document, undefined) {
  const langChoice = $("#langChoice"),
      langPl = $("#langPl"),
      langEs = $("#langEs"),
      regBtn = $("#regBtn"),
      logBtn = $("#logBtn"),
      regDiv = $("#regDiv"),
      logDiv = $("#logDiv"),
      messDiv = $("#messDiv"),
      messText = $("#messText"),
      messBtn = $("#messBtn"),
      sendMe = $("#sendMe"),
      formFields = sendMe.find("input:not(:submit), textarea"),     
      demo = $("#demo"),
      demo_2 = $("#demo_2"),
      sendDiv = $("#sendDiv"),
      sendMeBtn = $("#sendMeBtn"),
      secFirstRight = $('[name = "secFirstRight"]'),
      poliBtn = $("#poliBtn"),
      polityka = $("#polityka"),
      regulBtn = $("#regulBtn"),
      regulamin = $("#regulamin");

  (function(){     
    $("html, body").animate({scrollTop: 0}, 1000);
    langPl.on('click', e=> {
      langChoice.addClass("hidden");
      $('body').removeClass('stop-scroll');
      if($(window).width() <= 992) {
        messDiv.removeClass("hidden");
        messText.text("Zalecane jest otwieranie tej aplikacji na komputerach stacjonarnych lub laptopach. Telefony komórkowe lub tablety mogą nie obsługiwać pewnych funkcji programu.");
        messDiv.css('top', $(document).scrollTop() + 50);
      }
    });    
  })();

  messBtn.on("click", e => {
    messText.text("");
    messDiv.addClass("hidden");
  });

  logBtn.on("click", e => {
    logDiv.toggleClass('hidden');
    logBtn.toggleClass('asc');
  });

  regBtn.on("click", e => {
    regDiv.toggleClass('hidden');
    regBtn.toggleClass('asc');
  });

  sendMeBtn.on("click", e => {
    sendDiv.toggleClass('hidden');
    sendMeBtn.toggleClass('asc');
  });
  
  sendMe.on("submit", e => {
    e.preventDefault();    
    let dataSet = {};  
    formFields.each((i, elem) => {
      dataSet[elem.name] = elem.value;
    });

    if (dataSet.name && dataSet.email.indexOf("@") !== -1 && dataSet.messg) {
      upload.parentElement.style.height = document.body.clientHeight + "px";
      upload.parentElement.classList.remove("hidden");
      send(dataSet, "POST", "/sendForm", afterSendForm);
    }
    else {
      messDiv.removeClass("hidden");
      messText.text("Proszę poprawnie wypełnić formularz");
      messDiv.css('top', $(document).scrollTop() + 300);
    }    
  });

  poliBtn.on("click", e => {
    polityka.toggleClass('hidden');
    poliBtn.toggleClass('asc');
  });

  regulBtn.on("click", e => {
    regulamin.toggleClass('hidden');
    regulBtn.toggleClass('asc');
  });

  function afterSendForm(msg) {    
    for(let i=1; i <= formFields.length-1; i++) {
      formFields[i].value = "";
    }
    if (msg == 200) {
      messText.text("Informacja została wysłana");
      messDiv.removeClass("hidden");
      sendDiv.toggleClass("hidden");
      sendMeBtn.toggleClass('asc');
    }

    else {
      alert("Wystąpił błąd połączenia.");
    }
  }

  writeSigns(`Ta strona używa plików cookie w celu umożliwienia dostępu do serwisu.
		Dalsze korzystanie z tej witryny oznacza akceptację tego stanu rzeczy. ......`, "#writeSigns p", 50);

})(jQuery, window, document)