(function($, window, document, undefined) {
  
  var trucksArrSel = $('[name = "trucksArrSel"]'),
      addRouteBtn = $('.addRouteBtn'),
      delRoute = $('.delRoute'),
      manualRoutesDiv = $('#manualRoutesDiv'),
      manualRoutesForm = $('#manualRoutesForm'),
      driverSel = $('[name = "driverSel"]'),
      manualDate = $('[name = "manualDate"]'),
      actionSel = $('[name = "actionSel"]'),
      manualElements = $('.manualElements'),
      manualKm = $('[name = "manualKm"]'),
      country = $('[name = "manualCountry"]'),
      postal = $('[name = "postal"]'),
      tonOut = $('[name = "tonOut"]'),
      litres = $('[name = "litres"]'),
      tonIn = $('[name = "tonIn"]'),
      weight = $('[name = "weight"]'),
      fullSel = $('[name = "fullSel"]'),
      manualBtn = $('#manualBtn'),
      manualCanc = $('#manualCanc'),
      inputs = $('#manualRoutesForm input'),
      Correct = 0;
  addRouteBtn.click(function () {
    manualRoutesDiv.removeClass('hidden');
  });
  actionSel.change(function () {
    if (!this.value) {
      manualElements.addClass('hidden');
      return;
    }

    if (this.value == 1) {
      country.removeClass('hidden');
      postal.removeClass('hidden');
      tonOut.removeClass('hidden');
      tonIn.addClass('hidden');
      litres.addClass('hidden');
      fullSel.addClass('hidden');
      weight.addClass('hidden');
    }

    if (this.value == 2) {
      country.removeClass('hidden');
      postal.removeClass('hidden');
      tonIn.removeClass('hidden');
      tonOut.addClass('hidden');
      litres.addClass('hidden');
      fullSel.addClass('hidden');
      weight.addClass('hidden');
    }

    if (this.value == 3) {
      litres.removeClass('hidden');
      fullSel.removeClass('hidden');
      country.removeClass('hidden');
      postal.removeClass('hidden');
      tonIn.addClass('hidden');
      tonOut.addClass('hidden');
      weight.addClass('hidden');

      if (!routesArr.length) {
        weight.removeClass("hidden");
      }
    }
    if (targetControl !== demoData) {
      manualBtn.removeClass('hidden');
    }
    manualCanc.removeClass('hidden');
    manualElements.removeClass('hidden');
  });

  manualBtn.click(function (e) {
    e.preventDefault();
    var dataToSend = {
      _id: tripId || 0,
      driverId: driverSel.val(),
      truckId: trucksArrSel.val(),
      type: Number(actionSel.val()),
      country: country.val().toUpperCase(),
      postal: postal.val(),
      litres: Number(litres.val()) || 0,
      dtStop: manualDate.val(),
      kmStop: Number(manualKm.val()),
      full: Number(actionSel.val()) === 3 ? Number(fullSel.val()) : 0,
      add: 1
    };

    if (actionSel.val() == 1) {      
      dataToSend.tonOut = Number(tonOut.val());      
      dataToSend.fuel_Id = 0;
    }

    if (actionSel.val() == 2) {      
      dataToSend.tonOut = Number(tonIn.val());      
      dataToSend.fuel_Id = 0;
    }

    if (actionSel.val() == 3) {
      dataToSend.tonOut = Number(weight.val());
      dataToSend.correct = Correct;
      dataToSend.fuel_Id = -1;
    }

    var inputsToCheck = $('#manualRoutesForm input:not(:hidden), [name="driverSel"]');

    if (manualCheck(inputsToCheck)) {
      inputs.val('');
      actionSel.val("");
      manualKm.removeClass("error");
      manualRoutesDiv.addClass('hidden');
      send(dataToSend, "POST", targetControl);
    } else {
      alert("Błędnie wypełnione pole formularza");
    }
  });
  manualCanc.click(function (e) {
    e.preventDefault(e);
    manualRoutesDiv.addClass('hidden');
    manualElements.addClass('hidden');
    inputs.val('');
    actionSel.val("");
    manualKm.removeClass("error");
  });

  function manualCheck(data) {   

    data.each(function (i, elem) {
      $(elem).removeClass('error');
    });

    var x = 1;
    data.each(function (i, e) {
      if (!e.value) {
        $(e).addClass('error');
        x = 0;
      }
    });

    if (routesArr.length && Number(actionSel.val()) === 3 && routesArr[0].full === 1 && Number(manualKm.val()) === routesArr[0].kmStop) {
      x = 0;
      manualKm.addClass("error");
    }

    if (routesArr.length && Number(manualKm.val()) < routesArr[0].kmStop) {
      x = 0;
      manualKm.addClass("error");
    }

    if(routesArr.length && Number(manualKm.val()) < 0){
      x = 0;
      manualKm.addClass("error");
    }

    if(routesArr.length && Number(tonOut.val()) < 0){
      x = 0;
      tonOut.addClass("error");
    }

     if(routesArr.length && Number(tonIn.val()) < 0){
      x = 0;
      tonIn.addClass("error");
    }

    if(routesArr.length && Number(litres.val()) < 0){
      x = 0;
      litres.addClass("error");
    }

    return x;
  }

  delRoute.click(function () {
    if (!confirm("Czy usunąć odcinek trasy ?")) {
      return;
    } else {
      dataToSend = {
        collectionName: sessionUser,
        truckId: trucksArrSel.val(),
        id: routesArr[0]._id,
        fuel_Id: routesArr[0].fuel_Id || 0,
        driverId: routesArr[0].driverId
      };
      send(dataToSend, "DELETE", "delRoute");
    }
  });

  function send(dataToSend, method, target) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, window.location.origin + '/system/owner/' + target);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (xhr.responseText !== null && xhr.status >= 200 && xhr.status < 400 && xhr.readyState === 4) {
        var xhrResp = JSON.parse(xhr.responseText);
        var data = {
          collectionName: sessionUser,
          truckId: xhrResp.truckId
        };
        weight.addClass('hidden');
        actionSel.val("");
        sendData(data, "POST", "/system/truckRoutes", showTruckRoutes);
      } else alert("Błąd połączenia");
    };
    xhr.send(JSON.stringify(dataToSend));
  }
}(jQuery, window, document));