document.addEventListener("DOMContentLoaded", function() {

var orderBtn = document.querySelector("#orderBtn"),
    dc = document.createDocumentFragment(),
    ordersArr = [],
    ordersTable = document.querySelector("#ordersTable"),
    orders = document.querySelector("#orders"),
    ordersBody = document.querySelector("#ordersBody"),
    hideOrders = document.querySelector("#hideOrders");

orderBtn.addEventListener("click", e => {
  e.preventDefault();
  var dataToSend = {
    _id: targetControl
  };
  sendData(dataToSend, "POST", "/system/orders", showOrders);
}, false);

function showOrders(msg) {
  ordersBody.innerHTML = "";
  ordersArr = msg;
  ordersArr.reverse();
  orders.classList.remove("hidden");
  ordersArr.forEach(function (elem) {
    var row = document.createElement("tr");
    var number = document.createElement("td");
    var amount = document.createElement("td");
    var state = document.createElement("td");
    var details = document.createElement("td");
    number.innerText = elem.number;
    amount.innerText = elem.totalToPay + " zł";
    state.innerText = elem.state === 0 ? "Oczekujący" : "Zapłacone";
    details.innerHTML = `<a href="#" name="details" id=${elem.number}>zobacz</a>`;
    row.appendChild(number);
    row.appendChild(amount);
    row.appendChild(state);
    row.appendChild(details);
    dc.appendChild(row);
  });
  ordersBody.appendChild(dc);
  var det = document.querySelectorAll('[name="details"]');
  det.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      e.preventDefault();
      showOrder(e.target.id, e.pageY);
    });
  });
}

hideOrders.addEventListener("click", function () {
  orders.classList.add("hidden");
  messSave.classList.add("hidden");
}, false);

function showOrder(number, y) {
  var order = ordersArr.find(function (elem) {
    return elem.number === number;
  });
  y = y + 20 + "px";
  var rowArr = [];
  rowArrText = "";

  for (var key in order.items) {
    rowArr.push(`<tr><td>${key}</td><td>${order.items[key]} zł</td>
		<td>${order.itemsDays[key]}</td></tr>`);
  }

  messDiv.classList.remove("hidden");
  messSave.classList.remove("hidden");
  messDiv.style.setProperty('width', '70%');
  messDiv.style.setProperty('left', '15%');
  messDiv.style.setProperty('top', y);
  rowArr.forEach(function (elem) {
    rowArrText += elem;
  });
  messText.innerHTML = `
	<div>Klient: ${order.company}.
	 ${order.street},  ${order.post}  ${order.city}, NIP ${order.nip}</div><br>
	<div>Zamówienie nr ${order.number}</div>
	<div>Kwota zamówienia: ${order.totalToPay} zł</div>	
	<div>Stan płatności: ${order.state == 0 ? 'Oczekujące' : 'Opłacone'}</div><hr>
	<table>
		<thead>
			<tr>
		    	<th>Numer pojazdu</th>
		        <th>Cena jednostkowa abonamentu</th>
		        <th>Ilość dni abonamentu</th>
		    </tr>
		</thead>
		<tbody>
			${rowArrText}
		</tbody>        
	</table>`;
  var opt = {
    margin: 20
  };
  document.querySelector("#messSave").addEventListener("click", function () {
    html2pdf().from(document.getElementById("messText")).set(opt).save();
  }, false);
}
});