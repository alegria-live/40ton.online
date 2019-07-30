const sessionUser = (window.location.href)
  .slice(window.location.href.indexOf("?")+1),
  uProgress = document.querySelector("#upload"),
  refresh = document.querySelector("#refresh"),
  messDiv = document.querySelector("#messDiv"),
  messText = document.querySelector("#messText"),
  messBtn = document.querySelector("#messBtn"),
  messPrint = document.querySelector("#messPrint"),
  messSave = document.querySelector("#messSave"),
  instrPhone = document.querySelector("#instrPhone"),
  sh = document.querySelectorAll("[id^='sh']"),
  formDriver = document.querySelector("#newDriver"),
  formTruck = document.querySelector("#newTruck"),
  formWorker = document.querySelector("#newWorker"),
  editDriver = document.querySelector("#editDriver"),
  editDriverSel = document.querySelector("[name='editDriverSel']"),
  delDriver = document.querySelector("[name='delDriver']"),
  editTruck = document.querySelector("#editTruck"),
  gcnIndex = document.cookie.indexOf('_gcn'),
  editTruckSel = document.querySelector("[name='editTruckSel']"),
  delTruck = document.querySelector("[name='delTruck']"),
  theftForm = document.querySelector("#theftForm"),
  theftSel = document.querySelector("[name='theftSel']"),
  editWorker = document.querySelector("#editWorker"),
  lastEmail = document.querySelector("[name='lastEmail']"),
  delWorker = document.querySelector("[name='delWorker']"),
  editFirm = document.querySelector("#editFirm"),
  delFirm = document.querySelector("#delFirm"),
  payBtn = document.querySelector("#payBtn"),
  invoiceBtn = document.querySelector("#invoiceBtn"),
  payment = document.querySelector("#payment"),
  perm = document.querySelector("#perm"),
  driverSel = document.querySelector('[name = "driverSel"]'),
  trucksArrSel = document.querySelector("[name ='trucksArrSel']"),
  manualBtn = document.querySelector("#manualBtn"),
  delRouteBtn = document.querySelector(".delRoute"),
  toPdf = document.querySelectorAll(".toPdf"),
  demoData = '5abe7f8502c2b31f844fcc44',
  targetControl = document.cookie.slice(gcnIndex+5, gcnIndex+29);
let allDriversArr = [],
  allTrucksArr = [],
  allWorkersArr = [],
  downloads = 0;
  
if (perm.innerText == 0) {
  formWorker.elements.submit.setAttribute("disabled", true);
  editWorker.elements.submit.setAttribute("disabled", true);
  delWorker.setAttribute("disabled", true);
  editFirm.elements.submit.setAttribute("disabled", true);
  delFirm.setAttribute("disabled", true);
}

refresh.addEventListener("click", e => {
  e.preventDefault();
  location.reload();
}, false);

messBtn.addEventListener("click", e => {
  messPrint.classList.add("hidden");
  messSave.classList.add("hidden");
  messDiv.classList.add("hidden");
  messDiv.style.setProperty('width', '40%');
  messDiv.style.setProperty('left', '30%');
  messDiv.classList.remove("lower");
  messText.innerHTML = "";
}, false);

function getDrivers() {
  let dataToSend = {
    collectionName: sessionUser
  };
  sendData(dataToSend, 'POST', '/system/getDrivers', allDrivers);
}

getDrivers();

function allDrivers(msg) {
  downloads += 1;
  if (downloads >= 5) {uProgress.parentElement.classList.add("hidden");}
  if (msg.length === 0) {return;}
  

  allDriversArr = msg;
  allDriversArr.sort((a, b) => {return a._id > b._id;});

  editDriverSel.innerHTML = '<option value="">Wybierz kierowcę</option>';
  
  allDriversArr.forEach(elem => {
    let opt = document.createElement("option");
    opt.setAttribute("value", elem._id);
    opt.innerText = elem._id;
    editDriverSel.appendChild(opt);
  });

  driverSel.innerHTML = '<option value="">Wybierz kierowcę</option>';
  
  allDriversArr.forEach(elem => {
    let opt = document.createElement("option");
    opt.setAttribute("value", elem._id);
    opt.innerText = elem._id;
    driverSel.appendChild(opt);
  });
}

function getTrucks() {
  let dataToSend = {
    collectionName: sessionUser
  };
  sendData(dataToSend, 'POST', '/system/getTrucks', allTrucks);
}

getTrucks();

function allTrucks(msg) {
  downloads += 1;
  if (downloads >= 5) {uProgress.parentElement.classList.add("hidden");}
  if (msg.length === 0) {return;}
 

  allTrucksArr = msg;
  allTrucksArr.sort((a, b) => {
    return a._id > b._id;
  });

  editTruckSel.innerHTML = '<option value="">Wybierz pojazd</option>';
  
  allTrucksArr.forEach(elem => {
    let opt = document.createElement("option");
    opt.setAttribute("value", elem._id);
    opt.innerText = elem._id;
    editTruckSel.appendChild(opt);
  });

  trucksArrSel.innerHTML = '<option value="">Wybierz pojazd</option>';
  
  allTrucksArr.forEach(elem => {
    let opt = document.createElement("option");
    opt.setAttribute("value", elem._id);
    opt.innerText = elem._id;
    trucksArrSel.appendChild(opt);
  });
}

function checkForms(data) {
  let inputs = data.querySelectorAll("input"),
      x = 1;      
  inputs.forEach(elem => {
    if (!elem.value) {
      x = 0;
    }
  });
  return x;
}

formTruck.addEventListener("submit", e => {
  e.preventDefault();
  let dataToSend = {
    id: formTruck.id.value.toUpperCase().trim(),
    Truck: {
    name: formTruck.name.value.trim(),
    norm: parseFloat(formTruck.norm.value),
    consum: parseInt(formTruck.consum.value),
    date: Date.now(),
    routes: [],
    fuel: [],
    paid : parseInt((Date.now() + ((new Date().getDate() + 61)*86400000)))
   },
    collectionName: sessionUser
  };

  if (checkForms(formTruck)) {
    sendData(dataToSend, 'POST', '/system/addTruck', addedTruck);
  } else {
    messDiv.classList.remove("hidden");
    messText.textContent = "Nie wypełniono wszystkich pól formularza";
    let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
    messDiv.style.setProperty('top', positionY+"px");
  }
}, false);

function addedTruck(msg) {
  formTruck.reset();
  formTruck.classList.add("hidden");
  getTrucks();
  messDiv.classList.remove("hidden");
  messText.textContent = `Dodano pojazd:  ${msg}`;
  let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
  messDiv.style.setProperty('top', positionY+"px");
}

formDriver.addEventListener("submit", e => {
  e.preventDefault();
  let x = 1;

  if (allDriversArr.length && formDriver.lastName.value === allDriversArr[allDriversArr.length - 1].lastName) {
    x = "a";
  }

  let newId = formDriver.lastName.value + "0" + allDriversArr.length + x;
  
  let dataToSend = {
    id: newId.toLowerCase(),
    Driver: {
    name: formDriver.name.value.trim(),
    lastName: formDriver.lastName.value.trim(),    
    document: formDriver.document.value.trim(),
    date : (new Date()).toLocaleDateString(),
    routes: []
  },
    collectionName: sessionUser
  };

  if (checkForms(formDriver)) {
    sendData(dataToSend, 'POST', '/system/addDriver', addedDriver);
  }

  else {
    messDiv.classList.remove("hidden");
    messText.textContent = "Nie wypełniono wszystkich pól formularza";
    let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
    messDiv.style.setProperty('top', positionY+"px");
  }
}, false);

messPrint.addEventListener("click", e => {
  window.print();
}, false);

function addedDriver(msg) {
  formDriver.reset();
  formDriver.classList.add("hidden");
  getDrivers();
  messDiv.classList.remove("hidden");
  messPrint.classList.remove("hidden");
  messDiv.style.setProperty('width', '80%');
  messDiv.style.setProperty('left', '10%');
  messDiv.style.setProperty('top', '3%');
  messText.innerHTML = `
	    <h3>Instrukcja logowania i obsługi panelu kierowcy.</h3>

		<h4>Kierowca: ${msg.name} ${msg.lastName}</h4>

		<h4>Identyfikator kierowcy: ${msg.id}</h4>
		<hr>
		
		<p>W penelu telefonu klknij ikonę 'Panel kierowcy'</p>
		<p>Wybierz odpowiedni typ obsady</p>
		<p>Wprowadź swój identyfikator i zatwierdź</p>
		<p>Wprowadź numer rejestracyjny pojazdu i zatwierdź</p>
		<p>Jeśli jest to pierwszy wpis dla danego pojazdu 
		dostępna będzie wyłącznie opcja tankowania do pełna</p>
		<p>Dostęne opcje:</p>
		<p> - Załadunek</p>
		<p> - Rozładunek</p>
		<p> - Tankowanie</p>
		<p> - Zakończenie okresu</p>
		<p> - Edytuj ostatni wpis</p>
		<p> - Wyloguj</p>
		<p>Wrowadzaj kolejne etapy trasy systematycznie i na bieżąco</p>
		<p>Należy wypełnić wszystkie pola danej opcji aby trasa została zapisana</p>
		<p>Zawsze sprawdzaj prawidłowość ostatniego wpisu</p>
		<p>Opcja 'Edytuj ostatni wpis' pozwala poprawić ewentualny błąd ostatniego zapisu</p>
		<p>'Zakończenie okresu' - kiedy istnieje możliwość, że pojazd będzie prowadzony przez innego kierowcę</p>
		<p>np. przed urlopem lub zakończeniem cyklu.</p>
		<p>Przy zmianie pojazdu automatycznie wystąpi opcja nowego kierowcy dla danego pojazdu</p>
		<p>Po dokonaniu i sprawdzeniu wpisu wybierz opcję 'Wyloguj'</p>
	`;
}

theftSel.addEventListener("change", e => {
  e.preventDefault();
  let truck = trucks.indexOf(trucks.find(function (el) {
    return el._id === theftForm.theftSel.value;
  }));
  let stop = new Date(trucks[truck].Truck.fuel[trucks[truck].Truck.fuel.length - 1].dtStop);
  theftForm.elements.date.setAttribute("max", stop.toISOString().substring(0, 10));
});

theftForm.addEventListener("submit", e => {
  e.preventDefault();
  let dataToSend = {
    _id: theftForm.theftSel.value,
    date: theftForm.date.value,
    collectionName: sessionUser
  };
  sendData(dataToSend, "PUT", '/system/theft', afterTheft);
});

function afterTheft(msg) {
  if (!msg) {return;}
  if (typeof msg === "string" && msg.indexOf("l") != -1) {
    messDiv.classList.remove("hidden");
    messText.textContent = `Trasa została skorygowana.   
		Wyliczona utrata paliwa to ${msg}   Odśwież dane aby 
		system uwzględnił korektę na wykresach`;
    let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
    messDiv.style.setProperty('top', positionY+"px");
    theftForm.reset();
    theftForm.classList.add("hidden");
  }
  else {alert("Błąd połączenia. Spóbuj ponownie");}
}

function getWorkers() {
  let dataToSend = {collectionName: sessionUser};
  sendData(dataToSend, 'POST', '/api/workers/getWorkers', allWorkers);
}

getWorkers();

function allWorkers(msg) {
   downloads += 1;  
  if (downloads >= 5) {uProgress.parentElement.classList.add("hidden");}
  if (!msg) {return;}
  allWorkersArr = msg;

  allWorkersArr.sort((a, b) => {
    return a._id > b._id;
  });

  lastEmail.innerHTML = "<option>Wybierz email</option>";
  
  allWorkersArr.forEach(elem => {
    let opt = document.createElement("option");
    opt.setAttribute("value", elem.email);
    opt.innerText = elem.email;
    lastEmail.appendChild(opt);
  });
}

formWorker.addEventListener("submit", e => {
  e.preventDefault();
  let dataToSend = {
    dataSet: {
      name: formWorker.name.value.trim(),
      lastName: formWorker.lastName.value.trim(),
      email: formWorker.email.value.trim(),
      password: formWorker.password.value
    },
   collectionName: sessionUser
  };

  if (checkForms(formWorker)) {
    sendData(dataToSend, 'POST', '/api/workers/addWorker', addedWorker);
  }
  else {
    messDiv.classList.remove("hidden");
    messText.textContent = "Nie wypełniono wszystkich pól formularza";
    let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
    messDiv.style.setProperty('top', positionY+"px");
    return;
  }
}, false);

function addedWorker(msg) {
  if (msg == 402) {
    messDiv.classList.remove("hidden");
    messText.textContent = "W bazie istnieje już podany adres email";
    let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
    messDiv.style.setProperty('top', positionY+"px");
  }
  else {
    formWorker.reset();
    formWorker.classList.add("hidden");
    getWorkers();
    messDiv.classList.remove("hidden");
    messText.textContent = "Dodano użytkownika: " + msg;
    let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
    messDiv.style.setProperty('top', positionY+"px");
  }
}

payBtn.addEventListener("click", e => {
  e.preventDefault();
  payment.classList.remove("hidden");
  payments(allTrucksArr);
});

invoiceBtn.addEventListener("click", e => {
  e.preventDefault();
});

instrPhone.addEventListener("click", e => {
  e.preventDefault();
  messDiv.classList.remove("hidden");
  
  let target = `${window.location.origin}/driver/${targetControl}`;

  if (targetControl === demoData) {
    target = `${window.location.origin}/driver/xxxx-xxxx-xxxx`;
  }

  messText.innerHTML = `
	<h4>Ustawianie dostępu do systemu na telefonach kierowców</h4><br>
	
		<p>Z panelu telefonu uruchom przeglądarkę Chrome</p>
		<p>W pasku adresowym wprowadź następujący adres:</p>
		<p><b>${target}</b></p>
		<p>Jeśli adres wprowadzono poprawnie wyświetli się panel wyboru obsady</p>
		<p>Na prawo od paska adresu kliknij Opcje</p>
		<p>Wybierz opcję "Dodaj do ekranu głównego" oraz "Wersja na komputer"</p><br>
		<img src='/img/phoneMin.jpg'><br>
		<p>Na pulpicie zostanie utworzony bezpośredni skrót do aplikacji "Panel kierowcy"</p>
		<p>Wskaż kierowcy gdzie znajduje się skrót do aplikacji</p><br>
	`;
  let positionY = window.innerHeight/2 - messDiv.offsetHeight/2 + window.pageYOffset;   
    messDiv.style.setProperty('top', positionY+"px");
});

function sendData(dataToSend, method, target, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, window.location.origin + target);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.upload.onprogress = e => {
    uProgress.parentElement.style.height = document.body.clientHeight + "px";
    uProgress.parentElement.classList.remove("hidden");   
    
  };

  xhr.onload = function () {
    if (downloads >= 5) {
      uProgress.parentElement.classList.add("hidden");
    }

    if (xhr.status >= 200 && xhr.status < 400 && xhr.readyState === 4) {
      if (xhr.responseText.indexOf("<") == 0) {
        alert("Sesja wygasła. Zaloguj ponownie");
        location = window.location.origin + "/logout";
      } else {        
        cb(JSON.parse(xhr.responseText));
      }
    } else {
      if (xhr.responseText > 400 && xhr.responseText < 410) {
        cb(JSON.parse(xhr.responseText));
      } else {
        alert("Wystąpił błąd połączenia z serwerem");
        location = window.location.origin + "/logout";
      }
    }
  };

  xhr.send(JSON.stringify(dataToSend));
}

sh.forEach(elem => {
  elem.addEventListener("click", e => {
    e.preventDefault();
    let toShow = document.querySelector("#"+e.target.getAttribute("data"));
    toShow.classList.remove("hidden");

    toShow.lastElementChild.addEventListener("click", e => {
        e.preventDefault();
        toShow.classList.add("hidden");
    });
  });  
});

document.querySelector("[href='#headingNine']")
.addEventListener("click", e => {
  e.preventDefault();
  let colapseNine = document.querySelector("#collapseNine");
  colapseNine.classList.add("in");
  colapseNine.setAttribute("aria-expanded", true);
  colapseNine.style.height = "400px";
  window.scrollTo(0, colapseNine.offsetTop);
});

toPdf.forEach(elem => {
    elem.addEventListener("click", e => {
      e.preventDefault();
      let opt = {
                margin: 7,
                filename: "wykres.pdf",
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'l' }
              };
      html2pdf().from(e.target.parentElement. nextElementSibling).set(opt).save();
    });
  });

if (targetControl === demoData) {
  newTruck.outerHTML = "";
  editTruck.outerHTML = "";
  theftForm.outerHTML = "";
  newDriver.outerHTML = "";
  editDriver.outerHTML = "";
  newWorker.outerHTML = "";
  editWorker.outerHTML = "";
  editFirm.outerHTML = "";  
}