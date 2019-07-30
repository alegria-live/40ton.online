document.addEventListener("DOMContentLoaded", function() {
  var Driver = "",
      Truck = "",
      Type = null,
      tripId = null,
      LastRoute = {},
      Correct = 0,
      fuel_Id = 0,
      _csrf = document.querySelector("[name='_csrf']").value,
  
      nrDrivers = document.querySelector("#nrDrivers"),
      single = document.querySelector("#single"),
      double = document.querySelector("#double"),

      logDriver = document.querySelector("#logDriver"),
      driverId = document.querySelector("[name='driverId']"),
      driverId2 = document.querySelector("[name='driverId2']"),
      checkDriver = document.querySelector(".checkDriver"),
      truckId = document.querySelector("[name='truckId']"),
      backDriver = document.querySelector(".backDriver"),
      checkTruck = document.querySelector(".checkTruck"),
      logDriverMsg = document.querySelector("#logDriverMsg"),
  
      logInDriver = document.querySelector("#logInDriver"),
      load = document.querySelector("#load"),
      unload = document.querySelector("#unload"),
      fuel = document.querySelector("#fuel"),
      periodEnd = document.querySelector("#periodEnd"),
      lastRoute = document.querySelector("#lastRoute"),
      logOut = document.querySelector("#logOut"),
  
      loadDriver = document.querySelector("#loadDriver"),
      loadForm = document.querySelector("#loadForm"),
      backladDriver = document.querySelector("#backladDriver"),
      sendloadDriver = document.querySelector("#sendloadDriver"),
  
      unloadDriver = document.querySelector("#unloadDriver"),
      unloadForm = document.querySelector("#unloadForm"),
      backunladDriver = document.querySelector("#backunladDriver"),
      sendunloadDriver = document.querySelector("#sendunloadDriver"),
  
      fuelDriver = document.querySelector("#fuelDriver"),
      fuelForm = document.querySelector("#fuelForm"),
      backfuelDriver = document.querySelector("#backfuelDriver"),
      sendfuelDriver = document.querySelector("#sendfuelDriver"),
      fuelDriverTon = document.querySelector("#fuelDriverTon"),
  
      periodEndDriver = document.querySelector("#periodEndDriver"),
      periodEndForm = document.querySelector("#periodEndForm"),
      backperiodEndDriver = document.querySelector("#backperiodEndDriver"),
      sendperiodEndDriver = document.querySelector("#sendperiodEndDriver"),
  
      changeDriver = document.querySelector("#changeDriver"),
      changeForm = document.querySelector("#changeForm"),
      sendchangeDriver = document.querySelector("#sendchangeDriver"),
  
      lastRouteDisp = document.querySelector("#lastRouteDisp");
  
  single.addEventListener("click", function() {

    logDriver.classList.remove("hidden");
    nrDrivers.classList.add("hidden");
  }, false);

  double.addEventListener("click", function() {

    driverId2.classList.remove("hidden");
    logDriver.classList.remove("hidden");
    nrDrivers.classList.add("hidden");
  }, false);

  checkDriver.addEventListener("click", function() {
    
    if (logDriver.className !== "hidden" && driverId.value) {
      send({
        id: driverId.value.toLowerCase().trim(),
        add: 0
      }, isDriver);
    }
  });

  function isDriver(param) {

    if(param.driverId && param.lastName) {
      Driver = param.driverId; 
      logDriverMsg.textContent = param.name + " " + param.lastName;
      driver_logInDriver.textContent = param.name + " " + param.lastName;
      checkTruck.removeAttribute("disabled");
    }
    else {
      logDriverMsg.textContent = "Nieprawidłowy identyfikator";
      checkTruck.setAttribute("disabled", "disabled");
    }
  }

  backDriver.addEventListener("click", function() {
    
    driverId.value = "";
    logDriver.classList.add("hidden");
    driverId2.classList.add("hidden");
    nrDrivers.classList.remove("hidden");
  }, false);

  checkTruck.addEventListener("click", function() {

    if (logDriver.className !== "hidden" && truckId.value) {
      send({
        id: truckId.value.toUpperCase().trim(),
        add: 0
      }, isTruck);
    }
  }, false);

  function isTruck(param) {

    if(param.truckId) {
      Truck = param.truckId;
      tripId = param.tripId;
      LastRoute = param.lastRoute;
      logDriver.classList.add("hidden");

      if (!param.lastRoute.driverId || param.lastRoute.driverId === Driver) {
        document.querySelector("#truck_logInDriver").textContent = "Pojazd: " + Truck;
        logInDriver.classList.remove("hidden");
        driverId2.classList.add("hidden");
        dispLastRoute();

        if (!param.lastRoute.driverId) {
          load.setAttribute("disabled", "disabled");
          unload.setAttribute("disabled", "disabled");
          periodEnd.setAttribute("disabled", "disabled");
          lastRoute.setAttribute("disabled", "disabled");
          document.querySelector("#fuel_0").setAttribute("disabled", "disabled");
          document.querySelector("#fuelDriverQues").textContent = "Pierwsze uruchomienie systemu Tankowanie do pełna";
          fuelDriverTon.classList.remove("hidden");
        }
      }

      else {
        changeDriver.classList.remove("hidden");
        document.querySelector("#truck_logInDriver").textContent = "Pojazd: " + Truck;
        Type = 5;
        dispLastRoute();
      }
    }

    else {logDriverMsg.textContent = "Nieprawidłowy numer pojazdu";}
  }

  load.addEventListener("click", function() {

    logInDriver.classList.add("hidden");
    loadDriver.classList.remove("hidden");
    Type = 1;
  });

  unload.addEventListener("click", function (){
    logInDriver.classList.add("hidden");
    unloadDriver.classList.remove("hidden");
    Type = 2;
  });

  fuel.addEventListener("click", function() {
    logInDriver.classList.add("hidden");
    fuelDriver.classList.remove("hidden");
    Type = 3;
  });

  periodEnd.addEventListener("click", function() {
    logInDriver.classList.add("hidden");
    periodEndDriver.classList.remove("hidden");
    Type = 4;
  });

  lastRoute.addEventListener("click", function() {
    logInDriver.classList.add("hidden");
    Correct = 1;

    if (LastRoute.type === 1) {
      loadDriver.classList.remove("hidden");
      loadForm.querySelector('[name="data"]').value = LastRoute.dtStop;
      loadForm.querySelector('[name="km"]').value = LastRoute.kmStop;
      loadForm.querySelector('[name="ton"]').value = LastRoute.tonOut;
      loadForm.querySelector('[name="country"]').value = LastRoute.country;
      loadForm.querySelector('[name="postal"]').value = LastRoute.postal;
      Type = 1;
    }

    else if (LastRoute.type === 2) {
      unloadDriver.classList.remove("hidden");
      unloadForm.querySelector('[name="data"]').value = LastRoute.dtStop;
      unloadForm.querySelector('[name="km"]').value = LastRoute.kmStop;
      unloadForm.querySelector('[name="ton"]').value = LastRoute.tonOut;
      unloadForm.querySelector('[name="country"]').value = LastRoute.country;
      unloadForm.querySelector('[name="postal"]').value = LastRoute.postal;
      Type = 2;
    }

    else if (LastRoute.type === 3) {
      fuelDriver.classList.remove("hidden");
      fuelForm.querySelector('[name="data"]').value = LastRoute.dtStop;
      fuelForm.querySelector('[name="km"]').value = LastRoute.kmStop;
      fuelForm.querySelector('[name="litres"]').value = LastRoute.litres;
      fuelForm.querySelector('[name="country"]').value = LastRoute.country;
      fuelForm.querySelector('[name="postal"]').value = LastRoute.postal;
      fuelForm.querySelector('[name="full"]').value = LastRoute.full;

        if (tripId <= 1) {
          document.querySelector("#fuel_0").setAttribute("disabled", "disabled");
          fuelDriverTon.classList.remove("hidden");
          fuelForm.querySelector('[name="ton"]').value = LastRoute.tonOut;
        }
      Type = 3;
    }
    
    else if (LastRoute.type === 4) {
      periodEndDriver.classList.remove("hidden");
      periodEndForm.querySelector('[name="data"]').value = LastRoute.dtStop;
      periodEndForm.querySelector('[name="km"]').value = LastRoute.kmStop;
      periodEndForm.querySelector('[name="ton"]').value = LastRoute.tonOut;
      periodEndForm.querySelector('[name="country"]').value = LastRoute.country;
      periodEndForm.querySelector('[name="postal"]').value = LastRoute.postal;
      Type = 4;
    }

    else if (LastRoute.type === 5) {
      changeDriver.classList.remove("hidden");
      changeForm.querySelector('[name="data"]').value = LastRoute.dtStop;
      changeForm.querySelector('[name="km"]').value = LastRoute.kmStop;
      changeForm.querySelector('[name="ton"]').value = LastRoute.tonOut;
      changeForm.querySelector('[name="country"]').value = LastRoute.country;
      changeForm.querySelector('[name="postal"]').value = LastRoute.postal;
      Type = 5;
    }
  });

  logOut.addEventListener("click", function () {
    location.reload();
  });

  backladDriver.addEventListener("click", function(e) {
    e.preventDefault();
    loadDriver.classList.add("hidden");
    logInDriver.classList.remove("hidden");
    Correct = 0;
  });

  backunladDriver.addEventListener("click", function (e) {
    e.preventDefault();
    unloadDriver.classList.add("hidden");
    logInDriver.classList.remove("hidden");
    Correct = 0;
  });

  backfuelDriver.addEventListener("click", function (e) {
    e.preventDefault();
    fuelDriver.classList.add("hidden");
    logInDriver.classList.remove("hidden");
    Correct = 0;
    document.querySelector("#fuel_0").removeAttribute("disabled", "disabled");
  });

  backperiodEndDriver.addEventListener("click", function (e) {
    e.preventDefault();
    periodEndDriver.classList.add("hidden");
    logInDriver.classList.remove("hidden");
    Correct = 0;
  });

  sendloadDriver.addEventListener("click", function(e) {
    e.preventDefault();

    if (Correct === 1) {tripId = LastRoute._id;}

    var dataToSend = {
      _id: tripId,
      driverId: Driver,
      truckId: Truck,
      type: Type,
      litres: 0,
      country: loadForm.country.value.trim().toUpperCase(),
      postal: loadForm.postal.value.trim(),
      dtStop: loadForm.data.value,
      kmStop: Number(loadForm.km.value),
      tonOut: Number(loadForm.ton.value),
      full: 0,
      fuel_Id: 0,
      add: 1
    };

    if (checkForms(loadForm) && loadDriver.className !== "hidden" && tripId !== 0) {
      send(dataToSend, dataSent, loadDriver);
      sendloadDriver.setAttribute("disabled", "disabled");
    }
    else {alert("Nieprawidłowe dane");}
  });

  sendunloadDriver.addEventListener("click", function(e) {
    e.preventDefault();

    if (Correct === 1) {tripId = LastRoute._id;}

    var dataToSend = {
      _id: tripId,
      driverId: Driver,
      truckId: Truck,
      type: Type,
      litres: 0,
      country: unloadForm.country.value.trim().toUpperCase(),
      postal: unloadForm.postal.value.trim(),
      dtStop: unloadForm.data.value,
      kmStop: Number(unloadForm.km.value),
      tonOut: Number(unloadForm.ton.value),
      full: 0,
      fuel_Id: 0,
      add: 1
    };

    if (checkForms(unloadForm) && unloadDriver.className !== "hidden" && tripId !== 0) {
      send(dataToSend, dataSent, unloadDriver);
      sendunloadDriver.setAttribute("disabled", "disabled");
    }

    else {
      alert("Nieprawidłowe dane");
    }
  });

  sendfuelDriver.addEventListener("click", function (e) {
    e.preventDefault();    
    if (Correct === 1) {
      tripId = LastRoute._id;
      fuel_Id = LastRoute.fuel_Id;
    }

    if (tripId >= 1) {
      fuelForm.ton.value = -1;
    }

    var dataToSend = {
      _id: tripId,
      correct: Correct,
      driverId: Driver,
      truckId: Truck,
      type: Type,
      litres: Number(fuelForm.litres.value),
      country: fuelForm.country.value.trim().toUpperCase(),
      postal: fuelForm.postal.value.trim(),
      full: Number(fuelForm.full.value),
      dtStop: fuelForm.data.value,
      kmStop: Number(fuelForm.km.value),
      tonOut: Number(fuelForm.ton.value),
      fuel_Id: fuel_Id,
      add: 1
    };

    if (checkForms(fuelForm) && fuelDriver.className !== "hidden") {
      send(dataToSend, dataSent, fuelDriver);
      sendfuelDriver.setAttribute("disabled", "disabled");
      fuelDriverTon.classList.add("hidden");
    }

    else {
      alert("Nieprawidłowe dane");
    }
  });

  sendperiodEndDriver.addEventListener("click", function (e) {
    e.preventDefault();

    if (Correct === 1) {
      tripId = LastRoute._id;
    }

    var dataToSend = {
      _id: tripId,
      driverId: Driver,
      truckId: Truck,
      type: Type,
      litres: 0,
      country: periodEndForm.country.value.trim().toUpperCase(),
      postal: periodEndForm.postal.value.trim(),
      dtStop: periodEndForm.data.value,
      kmStop: Number(periodEndForm.km.value),
      tonOut: Number(periodEndForm.ton.value),
      full: 0,
      fuel_Id: 0,
      add: 1
    };

    if (checkForms(periodEndForm) && periodEndForm.className !== "hidden" && tripId !== 0) {
      send(dataToSend, dataSent, periodEndDriver);
      sendperiodEndDriver.setAttribute("disabled", "disabled");
    }

    else {alert("Nieprawidłowe dane");}
  });

  sendchangeDriver.addEventListener("click", function (e) {
    e.preventDefault();

    if (Correct === 1) {
      tripId = LastRoute._id;
    }

    var dataToSend = {
      _id: tripId,
      driverId: Driver,
      truckId: Truck,
      type: Type,
      litres: 0,
      country: changeForm.country.value.trim().toUpperCase(),
      postal: changeForm.postal.value.trim(),
      dtStop: changeForm.data.value,
      kmStop: Number(changeForm.km.value),
      tonOut: Number(changeForm.ton.value),
      full: 0,
      fuel_Id: 0,
      add: 1
    };

    if (checkForms(changeForm) && periodEndForm.className !== "hidden" && tripId !== 0) {
      send(dataToSend, dataSent, changeDriver);
      sendchangeDriver.setAttribute("disabled", "disabled");
    }

    else {alert("Nieprawidłowe dane");}
  });

  function checkForms(data) {
    var inputs = data.querySelectorAll("input"),
        x = 1;

    inputs.forEach(elem => {
      elem.classList.remove("error");

      if (!elem.value) {
        elem.classList.add("error");
        x = 0;
        console.log("1");
      }
    });

    if (Correct === 0 && Number(data.km.value) < LastRoute.kmStop) {
      data.km.classList.add("error");
      x = 0;
      console.log("2");
    }

    if (Number(data.km.value) < 0) {
      data.km.classList.add("3");
      x = 0;
      console.log("tutaj");
    }

    if (Type !==3  && Number(data.ton.value) < 0) {
      data.ton.classList.add("error");
      x = 0;
      console.log("4");
    }

    if (Type === 3 && Number(data.litres.value) < 0) {
      data.litres.classList.add("5");
      x = 0;
      console.log("tutaj");
    }

    if (Correct === 0 && Type === 3 && LastRoute.full === 1 && Number(data.km.value) === LastRoute.kmStop) {
      data.km.classList.add("error");
      x = 0;
      console.log("6");
    }

    return x;
  } 

  function clearDisabled() {
    load.removeAttribute("disabled", "disabled");
    unload.removeAttribute("disabled", "disabled");
    periodEnd.removeAttribute("disabled", "disabled");
    lastRoute.removeAttribute("disabled", "disabled");
    document.querySelector("#fuelDriverQues").textContent = "Czy zatankowano do pełna?";
    document.querySelector("#fuel_0").removeAttribute("disabled", "disabled");
  }

  function dispLastRoute() {

    function createList(dates) {
      dates.forEach(function(elem) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(elem));
      dc.appendChild(li);          
      });
    }

    if (LastRoute.driverId) {
      lastRouteDisp.classList.remove("hidden");
      var list = document.querySelector("#lastRouteUl"),
        dc = document.createDocumentFragment(),
        dates = [];

      if(LastRoute.type === 1) {
        dates = [
        "Typ: Załadunek",
        "Data: " + LastRoute.dtStop,
        "Stan licznika: " + LastRoute.kmStop + " km",
        "Załadowano: " + LastRoute.tonOut + " ton",
        "Kraj: " + LastRoute.country,
        "Kod pocztowy: " + LastRoute.postal
        ];
        createList(dates);         
      } 

      else if(LastRoute.type === 2) {
        dates = [
        "Typ: Rozładunek",
        "Data: " + LastRoute.dtStop,
        "Stan licznika: " + LastRoute.kmStop + " km",
        "Pozostało po rozładunku: " + LastRoute.tonOut + " ton",
        "Kraj: " + LastRoute.country,
        "Kod pocztowy: " + LastRoute.postal
        ];
        createList(dates); 
      }

      else if(LastRoute.type === 3) {
        dates = [
        "Typ: Tankowanie",
        "Data: " + LastRoute.dtStop,
        "Stan licznika: " + LastRoute.kmStop + " km",
        "Zatankowano: " + LastRoute.litres + " litrów",
        "Waga ładunku: " + LastRoute.tonOut + " ton",
        "Kraj: " + LastRoute.country,
        "Kod pocztowy: " + LastRoute.postal,
        "Do pełna: " + (LastRoute.full === 1 ? "Tak" : "Nie")
        ];
        createList(dates);         
      }

      else if(LastRoute.type === 4) {
        dates = [
        "Typ: Zakończenie okresu",
        "Data: " + LastRoute.dtStop,
        "Stan licznika: " + LastRoute.kmStop + " km",        
        "Waga ładunku: " + LastRoute.tonOut + " ton",
        "Kraj: " + LastRoute.country,
        "Kod pocztowy: " + LastRoute.postal        
        ];
        createList(dates); 
      }

      else {
        dates = [
        "Typ: Zmiana kierowcy",
        "Data: " + LastRoute.dtStop,
        "Stan licznika: " + LastRoute.kmStop + " km",        
        "Waga ładunku: " + LastRoute.tonOut + " ton",
        "Kraj: " + LastRoute.country,
        "Kod pocztowy: " + LastRoute.postal        
        ];
        createList(dates);         
      }   

      list.appendChild(dc);
    }
  }
  function send(dataToSend, cb, toHide) {

    var xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.href);
    xhr.setRequestHeader('Content-Type', 'application/json');
    dataToSend._csrf = _csrf;

    xhr.onload = function () {
      if (xhr.responseText !== null && xhr.status >= 200 && xhr.status < 400 && xhr.readyState === 4) {
        var xhrResp = JSON.parse(xhr.responseText);
        cb(xhrResp, toHide);
      } else if (xhr.responseText == 404) {
        cb(404, null);
      } else location.reload();
    };

    xhr.send(JSON.stringify(dataToSend));
  };
  
  function dataSent(param, toHide) {
    tripId = param.tripId;
    LastRoute = param.lastRoute;
    Correct = 0;
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function (elem) {
      elem.value = null;
    });
    toHide.classList.add("hidden");
    toHide.querySelectorAll('button')[1].removeAttribute("disabled");
    logInDriver.classList.remove("hidden");
    lastRouteUl.innerHTML = "";
    dispLastRoute();
    if (param.lastRoute._id === 0) clearDisabled();
  }
});