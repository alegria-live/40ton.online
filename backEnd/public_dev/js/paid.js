function payments(allTrucksArr) {
  const table = document.querySelector("#payTable");
  let hidePay = document.querySelector("#hidePay");
  let paySubmit = document.querySelector("#paySubmit");
  let pay_accept = document.querySelector("#pay_accept");
  let client = {};
  let sum = {};
  let sumDays = {};
  let totalBasket = 0;
  table.innerHTML = "";
  const dc = document.createDocumentFragment();

  function getClient() {
    let dataToSend = {
      id: targetControl
    };
    sendData(dataToSend, 'POST', '/api/users/findUser', setClient);
  }

  getClient();

  function setClient(msg) {
    client = JSON.parse(JSON.stringify(msg));
  }

  allTrucksArr.sort((a, b) => {
    return a.paid - b.paid;
  });
  allTrucksArr.forEach(e => {
    let date = Number(Date.now()) + 999900000;
    let row = document.createElement("tr");

    let _id = document.createElement("td");

    let data = document.createElement("td");
    let radio1 = document.createElement("td");
    let radio2 = document.createElement("td");
    let radio3 = document.createElement("td");
    let basket = document.createElement("td");
    _id.innerText = e._id;
    data.innerText = new Date(e.paid).toLocaleDateString();
    radio1.innerHTML = `<input type='radio' name=${e._id} value= 48 id='122'>`;
    radio2.innerHTML = `<input type='radio' name=${e._id} value= 80 id='244'>`;
    radio3.innerHTML = `<input type='radio' name=${e._id} value= 96 id='365'>`;
    basket.setAttribute('id', e._id);
    basket.setAttribute('name', 'basket');

    if (Number(e.paid) < date) {
      data.classList.add("redText");
    }

    row.appendChild(_id);
    row.appendChild(data);
    row.appendChild(radio1);
    row.appendChild(radio2);
    row.appendChild(radio3);
    row.appendChild(basket);
    dc.appendChild(row);
  });
  table.appendChild(dc);
  let allRadios = document.querySelectorAll('[type = "radio"]');
  let booRadio;
  let x = 0;
  allRadios.forEach(e => {
    e.onclick = function () {
      if (booRadio == this) {
        this.checked = false;
        booRadio = null;
        delete sum[this.name];
        delete sumDays[this.name];
        document.getElementById(this.name).innerText = "";
        sumBasket();
      } else {
        booRadio = this;
        sum[this.name] = Number(this.value);
        sumDays[this.name] = Number(this.id);
        document.getElementById(this.name).innerText = this.value + " zł";
        sumBasket();
      }
    };
  });

  function sumBasket() {
    let allBasket = 0;

    for (let key in sum) {
      allBasket += sum[key];
    }


    document.querySelector("#total").innerText = `
    Razem ${allBasket} zł + ${(0.23*allBasket).toFixed(2)} VAT =  ${(allBasket*1.23).toFixed(2)} zł`;
    totalBasket = allBasket*1.23;

    if (allBasket) {
      pay_accept.classList.remove("hidden");
    } else {
      pay_accept.classList.add("hidden");
    }
  }

  hidePay.addEventListener("click", e => {
    document.querySelector("#payment").classList.add("hidden");
    pay_accept.classList.add("hidden");
    totalBasket = 0;
    document.querySelector("#total").innerText = "";
  });

  paySubmit.addEventListener("click", e => {
    e.preventDefault();
    let dataToSend = {
      _id: targetControl,
      dataSet: {
        orderId: new Date().getTime() + "_" + targetControl,
        email: client.email,
        name: client.name,
        lastName: client.lastName,
        company: client.company,
        street: client.street,
        post: client.post,
        city: client.city,
        nip: client.nip,
        items: sum,
        itemsDays: sumDays,
        totalToPay: Number(totalBasket),
        state: 0
      }
    }; // sendData(dataToSend, 'POST', '/system/order', afterPay);

    messDiv.classList.add("lower");
    messDiv.classList.remove("hidden");
    messText.textContent = `Wersja testowa. Płatności nie są jeszcze dostępne`;
  }, true);

  function afterPay(msg) {
    pay_accept.classList.add("hidden");
    location = `https://ssl.dotpay.pl/test_payment/?
		id=724909
		&control=${msg.orderId}
		&amount=${msg.totalToPay}
		&currency=PLN
		&description=Zamówienie nr ${msg.number}
		&type=0
		&url=https://40ton.online/payok
		&lang=pl
		&ignore_last_payment_channel=true
		&channel_groups=K,T,P,G,I
		buttontext=Powrót do 40ton.online`;
  }
}