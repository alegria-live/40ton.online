editDriverSel.addEventListener("change", function () {
  if (!this.value) {
    editDriver.name.value = "";
    editDriver.lastName.value = "";
    editDriver.document.value = "";
    return;
  }

  var self = this.value;
  var driver = allDriversArr.find(function (elem) {
    return elem._id === self;
  });
  editDriver.name.value = driver.name;
  editDriver.lastName.value = driver.lastName;
  editDriver.document.value = driver.document;
});
editDriver.addEventListener("submit", function (e) {
  e.preventDefault();
  var dataToSend = {
    newData: {
      "Driver.name": editDriver.name.value,
      "Driver.lastName": editDriver.lastName.value,
      "Driver.document": editDriver.document.value
    },
    id: editDriverSel.value,
    collectionName: sessionUser
  };

  if (checkForms(editDriver)) {
    sendData(dataToSend, 'PUT', '/system/update', afterDriverUp);
  } else {
    messDiv.classList.remove("hidden");
    messText.textContent = "Nie wypełniono wszystkich pól formularza";
    return;
  }
}, false);

function afterDriverUp(msg) {
  getDrivers();
  editDriver.reset();
  editDriver.classList.add("hidden");
}

delDriver.addEventListener("click", function () {
  if (!confirm("Czy usunąć: " + editDriverSel.value + "?")) {
    return;
  } else {
    dataToSend = {
      id: editDriverSel.value,
      collectionName: sessionUser
    };
    sendData(dataToSend, 'DELETE', '/system/update', afterDriverDel);
  }
});

function afterDriverDel() {
  location.reload();
}

editTruckSel.addEventListener("change", function () {
  if (!this.value) {
    editTruck.name.value = "";
    editTruck.norm.value = "";
    editTruck.consum.value = "";
    return;
  }

  var self = this.value;
  var truck = allTrucksArr.find(function (elem) {
    return elem._id === self;
  });
  editTruck.name.value = truck.name;
  editTruck.norm.value = truck.norm;
  editTruck.consum.value = truck.consum;
});
editTruck.addEventListener("submit", function (e) {
  e.preventDefault();
  var dataToSend = {
    newData: {
      "Truck.name": editTruck.name.value,
      "Truck.norm": Number(editTruck.norm.value),
      "Truck.consum": Number(editTruck.consum.value)
    },
    id: editTruckSel.value,
    collectionName: sessionUser
  };

  if (checkForms(editTruck)) {
    sendData(dataToSend, 'PUT', '/system/update', afterTruckUp);
  } else {
    messDiv.classList.remove("hidden");
    messText.textContent = "Nie wypełniono wszystkich pól formularza";
    return;
  }
}, false);

function afterTruckUp(msg) {
  getTrucks();
  editTruck.reset();
  editTruck.classList.add("hidden");
}

delTruck.addEventListener("click", function () {
  if (!confirm("Czy usunąć: " + editTruckSel.value + "?")) {
    return;
  } else {
    dataToSend = {
      id: editTruckSel.value,
      collectionName: sessionUser
    };
    sendData(dataToSend, 'DELETE', '/system/update', afterTruckDel);
  }
});

function afterTruckDel() {
  location.reload();
}

editWorker.elements.lastEmail.addEventListener("change", function () {
  var self = this.value;
  var worker = allWorkersArr.find(function (elem) {
    return elem.email === self;
  });
  editWorker.name.value = worker.name;
  editWorker.lastName.value = worker.lastName;
  editWorker.email.value = worker.email;
});

editWorker.addEventListener("submit", function (e) {
  e.preventDefault();
  var dataToSend = {
    newData: {
      "name": editWorker.name.value,
      "lastName": editWorker.lastName.value,
      "email": editWorker.email.value,
      "password": editWorker.password.value
    },
    id: editWorker.lastEmail.value,
    collectionName: sessionUser
  };

  if (checkForms(editWorker)) {
    sendData(dataToSend, 'PUT', '/api/workers/editWorker', afterWorkerUp);
  } else {
    messDiv.classList.remove("hidden");
    messText.textContent = "Nie wypełniono wszystkich pól formularza";
    return;
  }
}, false);

function afterWorkerUp(msg) {
  if (msg == 402) {
    messDiv.classList.remove("hidden");
    messText.textContent = "W bazie istnieje podany adres email";
    return;
  } else {
    getWorkers();
    editWorker.reset();
    editWorker.classList.add("hidden");
  }
}

delWorker.addEventListener("click", function () {
  if (!confirm("Czy usunąć: " + editWorker.lastName.value + "?")) {
    return;
  } else {
    dataToSend = {
      id: lastEmail.value,
      collectionName: sessionUser
    };
    sendData(dataToSend, 'DELETE', '/api/workers/delWorker', afterWorkerDel);
  }
});

function afterWorkerDel() {
  messDiv.classList.remove("hidden");
  messText.textContent = "Wpis usunięty z bazy";
  editWorker.reset();
  editWorker.classList.add("hidden");
  getWorkers();
}

document.querySelector("#hrefEditFirm").addEventListener("click", e => {
  e.preventDefault();
  editFirm.classList.remove("hidden");
  var dataToSend = {
    id: targetControl
  };
  sendData(dataToSend, 'POST', '/api/users/findUser', userFinded);
}, false);

function userFinded(msg) {
  editFirm.name.value = msg.name;
  editFirm.lastName.value = msg.lastName;
  editFirm.company.value = msg.company;
  editFirm.nip.value = Number(msg.nip);
  editFirm.street.value = msg.street;
  editFirm.city.value = msg.city;
  editFirm.post.value = msg.post;
  editFirm.country.value = msg.country;
  editFirm.email.value = msg.email;
}

editFirm.addEventListener("submit", e => {
  e.preventDefault();
  var dataToSend = {
    dataSet: {
      name: editFirm.name.value,
      lastName: editFirm.lastName.value,
      company: editFirm.company.value,
      nip: editFirm.nip.value,
      street: editFirm.street.value,
      city: editFirm.city.value,
      post: editFirm.post.value,
      country: editFirm.country.value,
      email: editFirm.email.value,
      password: editFirm.password.value
    },
    _id: targetControl
  };

  if (checkInputs()) {
    sendData(dataToSend, 'PUT', '/api/users', afterFirmEdit);
  } else {
    messDiv.classList.remove("hidden");
    messText.textContent = "Zaznaczone pola formularza zostały niepoprawnie wypełnione";
  }
}, false);

function checkInputs(input) {
  var x = 1,
      classError = document.querySelectorAll('[class = "error"]');
  classError.forEach(elem => elem.classList.remove("error"));

  if (!editFirm.name.value) {
    editFirm.name.classList.add("error");
    x = 0;
  }

  if (!editFirm.lastName.value) {
    editFirm.lastName.classList.add("error");
    x = 0;
  }

  if (!editFirm.company.value) {
    editFirm.company.classList.add("error");
    x = 0;
  }

  if (!editFirm.nip.value) {
    editFirm.nip.classList.add("error");
    x = 0;
  }

  if (editFirm.nip.value.length !== 10) {
    editFirm.nip.classList.add("error");
    x = 0;
  }

  if (editFirm.nip.value.indexOf("-") > -1) {
    editFirm.nip.classList.add("error");
    x = 0;
  }

  if (!editFirm.street.value) {
    editFirm.street.classList.add("error");
    x = 0;
  }

  if (!editFirm.city.value) {
    editFirm.city.classList.add("error");
    x = 0;
  }

  if (!editFirm.post.value) {
    editFirm.post.classList.add("error");
    x = 0;
  }

  if (!editFirm.country.value) {
    editFirm.country.classList.add("error");
    x = 0;
  }

  if (editFirm.email.value.indexOf("@") === -1) {
    editFirm.email.classList.add("error");
    x = 0;
  }

  if (editFirm.email.value !== editFirm.email2.value) {
    editFirm.email.classList.add("error");
    editFirm.email2.classList.add("error");
    x = 0;
  }

  if (editFirm.password.value !== editFirm.password2.value) {
    editFirm.password.classList.add("error");
    editFirm.password2.classList.add("error");
    x = 0;
  }

  if (!editFirm.password.value) {
    editFirm.password.classList.add("error");
    x = 0;
  }

  return x;
}

function afterFirmEdit(msg) {
  uProgress.parentElement.classList.add("hidden");

  if (msg === 402) {
    messDiv.classList.remove("hidden");
    messText.textContent = "Podany email istnieje w bazie danych";
    return;
  } else if (msg === 200) {
    messDiv.classList.remove("hidden");
    messText.textContent = "Dane zostały zmienione";
  } else {
    alert("Błąd połączenia z bazą danych");
    return;
  }

  editFirm.reset();
  editFirm.classList.add("hidden");
}

editFirm.lastElementChild.addEventListener("click", function (e) {
  e.preventDefault();
  editFirm.classList.add("hidden");
}, false);
delFirm.addEventListener("click", e => {
  e.preventDefault();

  if (!confirm("UWAGA!!! - Wszystkie dane firmy zostaną bezpowrotnie utracone. Czy usunąć z systemu firmę: " + editFirm.company.value + "?")) {
    return;
  } else {
    dataToSend = {
      _id: targetControl
    };
    sendData(dataToSend, "DELETE", '/api/users', afterDel);
  }
});

function afterDel(msg) {
  if (msg != 200) {
    alert(`Błąd połączenia z bazą danych.
		Spróbuj ponownie`);
  } else {
    window.location = window.location.origin;
  }
}