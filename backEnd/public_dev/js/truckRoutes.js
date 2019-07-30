var tripId = null,
    routesArr = [];
    
document.addEventListener("DOMContentLoaded", function() {

var dc = document.createDocumentFragment(),    
    routesBody = document.querySelector("#routesBody"),
    addRouteBt = document.querySelector(".addRouteBtn"),
    delRoute = document.querySelector('.delRoute'),
    manualDiv = document.querySelector("#manualRoutesDiv"),
    actionSel = document.querySelector('[name = "actionSel"]'),
    manualElements = document.querySelector('.manualElements'),
    routesTableMenu = document.querySelector('#routesTableMenu'),
    tableStartDate =document.querySelector('[name = "tableStartDate"]'),
    tableEndDate =document.querySelector('[name = "tableEndDate"]'),
    tableEnd = $('#tableEnd');

trucksArrSel.addEventListener("change", function () {
  truck = this.value;
  var dataToSend = {
    collectionName: sessionUser,
    truckId: this.value
  };

  if (!this.value) {
    addRouteBt.classList.add('hidden');
    delRoute.classList.add('hidden');
    manualRoutesDiv.classList.add('hidden');
    return;
  }

  if (this.value) {
    sendData(dataToSend, "POST", "/system/truckRoutes", showTruckRoutes);
    return;
  }
}, false);

function showTruckRoutes(routes, cut) {
  tripId = routes.length;

  if(!cut) {
    routesArr = routes;
    tableStartDate.value = "";
    tableEndDate.value = "";
  }  

  if (tripId == 0) {
    $('#opt_1').prop('disabled', true);
    $('#opt_2').prop('disabled', true);
    $('#opt_3').prop('disabled', true);
    delRoute.classList.add('hidden');
  }

  if (tripId > 0) {
    $('#opt_1').prop('disabled', false);
    $('#opt_2').prop('disabled', false);
    $('#opt_3').prop('disabled', false);

    if (targetControl !== demoData) {
      delRoute.classList.remove("hidden");
    }
  }

  addRouteBt.classList.remove("hidden");
  routesTableMenu.classList.remove("hidden");
  manualDiv.classList.add("hidden");
  manualElements.classList.add("hidden");
  actionSel.value = "";

  routesBody.innerHTML = "";
  routesArr.reverse();
  var actionType = "";

  routes.forEach(function (elem) {
    switch (elem.type) {
      case 1:
        actionType = "Załadunek";
        break;

      case 2:
        actionType = "Rozładunek";
        break;

      case 3:
        actionType = "Tankowanie";
        break;

      case 4:
        actionType = "Zakończenie okresu";
        break;

      case 5:
        actionType = "Zmiana kierowcy";
        break;
    }

    let row = document.createElement("tr"),
      date = document.createElement("td"),
      driver = document.createElement("td"),
      action = document.createElement("td"),
      country = document.createElement("td"),
      postal = document.createElement("td"),
      weightIn = document.createElement("td"),
      weightOut = document.createElement("td"),
      litres = document.createElement("td"),
      full = document.createElement("td"),
      counter = document.createElement("td");
      comments = document.createElement("td");
    
    date.innerText = elem.dtStop;
    driver.innerText = elem.driverId;
    action.innerText = actionType;
    country.innerText = elem.country ? elem.country : "-";
    postal.innerText = elem.postal ? elem.postal : "-";
    weightIn.innerText = elem.type === 1 ? elem.tonOut + " t." : "";
    weightOut.innerText = elem.type === 2 ? elem.tonIn - elem.tonOut + " t." : "";
    litres.innerText = elem.litres ? elem.litres + " l." : "-";
    counter.innerText = elem.kmStop + " km";
    comments.innerText = " ";
    if(actionType === "Tankowanie"){full.innerText = elem.full ? "Tak" : "Nie";}

    row.appendChild(date);
    row.appendChild(driver);
    row.appendChild(action);
    row.appendChild(country);
    row.appendChild(postal);
    row.appendChild(weightIn);
    row.appendChild(weightOut);
    row.appendChild(litres);
    row.appendChild(full);
    row.appendChild(counter);
    row.appendChild(comments);
    dc.appendChild(row);
  });
  routesBody.appendChild(dc);
  tableEnd.text("Tabela dla pojazdu "+trucksArrSel.value);
}

$(tableStartDate).on("change", e => {  
  let routes = routesArr.filter(elem => {
      return Number(new Date(elem.dtStop)) >= Number(new Date(e.target.value));
    });
  
  if(tableEndDate.value) {
    let routes2 = routes.filter(elem => {
      return Number(new Date(elem.dtStop)) <= Number(new Date(tableEndDate.value));
    });

    routes2.sort((a, b) => {
    return Number(new Date(b.dtStop)) - Number(new Date(a.dtStop));
    });

    showTruckRoutes(routes2, 1);
  }
  else {
    routes.sort((a, b) => {
      return Number(new Date(b.dtStop)) - Number(new Date(a.dtStop));
    });
    showTruckRoutes(routes, 1);
  }  
});

$(tableEndDate).on("change", e => {  
  
  let routes = routesArr.filter(elem => {
      return Number(new Date(elem.dtStop)) <= Number(new Date(e.target.value));
  });
  
  if(tableStartDate.value) {
    let routes2 = routes.filter(elem => {
      return Number(new Date(elem.dtStop)) >= Number(new Date(tableStartDate.value));
    });

    routes2.sort((a, b) => {
    return Number(new Date(b.dtStop)) - Number(new Date(a.dtStop));
    });

    showTruckRoutes(routes2, 1);
  }

  else {routes.sort((a, b) => {
    return Number(new Date(b.dtStop)) - Number(new Date(a.dtStop));
  });
  showTruckRoutes(routes, 1);
  }
});

$(".tableToPdf").on("click", e => {
  let opt = {
    margin: 5,
    filename: trucksArrSel.value +"_"+tableStartDate.value+"_"+tableEndDate.value + ".pdf",
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'l' }
  };
    html2pdf().from(document.getElementById("tabContainer")).set(opt).save();
});
window.showTruckRoutes = showTruckRoutes;
});