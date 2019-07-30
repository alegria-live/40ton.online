document.addEventListener("DOMContentLoaded", function() {

  let messageTrucks = document.querySelector("#messageTrucks"),
      tOkrRealNorm = document.querySelector("[name='tOkrRealNorm']"),
      tOkrRealNormStart = document.querySelector("[name='tOkrRealNormStart']"),
      tOkrRealNormEnd = document.querySelector("[name='tOkrRealNormEnd']"),
      tOkrRealNormPlot = document.querySelector("#tOkrRealNormPlot"),
      tOkrFuel = document.querySelector("[name='tOkrFuel']"),
      tOkrFuelStart = document.querySelector("[name='tOkrFuelStart']"),
      tOkrFuelEnd = document.querySelector("[name='tOkrFuelEnd']"),
      tOkrFuelPlot = document.querySelector("#tOkrFuelPlot"),
      tTrucksAdd = document.querySelector("[name='tTrucksAdd']"),
      tTrucksDel = document.querySelector("[name='tTrucksDel']"),
      tTrucksStart = document.querySelector("[name='tTrucksStart']"),
      tRealNorm = document.querySelector("[name='tRealNorm']"),
      tRealNormSel = document.querySelector("[name='tRealNormSel']"),
      tRealNormStart = document.querySelector("[name='tRealNormStart']"),
      tRealNormEnd = document.querySelector("[name='tRealNormEnd']"),
      toPdf = document.querySelectorAll(".toPdf"),
      trucks = [];

  function findTrucks() {
    let dataToSend = {
      collectionName: sessionUser
    };
    sendData(dataToSend, 'POST', '/system/findTrucks', addTrucks);
  }

  findTrucks();

  function addTrucks(msg) {
    downloads += 1;

    if (downloads >= 5) {
      uProgress.parentElement.classList.add("hidden");
    }

    if (msg.length) {
      trucks = msg;
      window.trucks = trucks;
      let month2 = Number(Date.now()) - (new Date().getDate() + 60) * 86400000,
          month1 = Number(Date.now()) - new Date().getDate() * 86400000,
          toDay = Number(Date.now());
      tOkrRealNormStart.setAttribute("value", new Date(month2).toISOString().substring(0, 10));
      tOkrRealNormEnd.setAttribute("value", new Date(toDay).toISOString().substring(0, 10));
      tOkrFuelStart.setAttribute("value", new Date(month2).toISOString().substring(0, 10));
      tOkrFuelEnd.setAttribute("value", new Date(toDay).toISOString().substring(0, 10));    
      tTrucksStart.setAttribute("value", new Date(month2).toISOString().substring(0, 10));
      createOptionTrucks();
      findLastInterv([month2, toDay], 0);
      realNorm(msg[0]._id, month2, toDay);
      manyTrucks(1, msg[0]._id, month2);
      document.getElementById(msg[0]._id).outerHTML = "";
      let opt = document.createElement("option");
      opt.innerText = msg[0]._id;
      opt.setAttribute("id", msg[0]._id);
      tTrucksDel.appendChild(opt);
    } else {
      messageTrucks.classList.remove("hidden");
      return;
    }
  }
  function createOptionTrucks() {
    trucks.sort(function (a, b) {
      return a._id > b._id;
    });
    trucks.forEach(function (elem) {
      let opt = document.createElement("option");
      opt.setAttribute("value", elem._id);
      opt.innerText = elem._id;
      opt.setAttribute("id", elem._id);
      tTrucksAdd.appendChild(opt);
    });
    trucks.forEach(function (elem) {
      let opt = document.createElement("option");
      opt.setAttribute("value", elem._id);
      opt.innerText = elem._id;
      tRealNormSel.appendChild(opt);
    });
    trucks.forEach(function (elem) {
      let opt = document.createElement("option");
      opt.setAttribute("value", elem._id);
      opt.innerText = elem._id;
      theftSel.appendChild(opt);
    });
    let trucksDates = [];
    trucks.forEach(function (elem) {
      elem.Truck.fuel.forEach(function (ele) {
        trucksDates.push(new Date(ele.dtStop).getTime());
      });
    });
    let maxDate = new Date(Math.max.apply(Math, trucksDates));
    let minDate = new Date(Math.min.apply(Math, trucksDates));    
    tOkrRealNormStart.setAttribute("max", maxDate.toISOString().substring(0, 10));
    tOkrRealNormStart.setAttribute("min", minDate.toISOString().substring(0, 10));   
    tOkrFuelStart.setAttribute("max", maxDate.toISOString().substring(0, 10));
    tOkrFuelStart.setAttribute("min", minDate.toISOString().substring(0, 10));
    tTrucksStart.setAttribute("min", minDate.toISOString().substring(0, 10));
    tTrucksStart.setAttribute("max", maxDate.toISOString().substring(0, 10));
  }

  function findLastInterv(arg, id) {
    let periodFuels = [];
    trucks.forEach(function (elem) {
      let x = elem.Truck.fuel.filter(function (ele) {
        let eleDate = new Date(ele.dtStop).getTime();
        return eleDate >= arg[0] && eleDate <= arg[1];
      });

      if (x.length) {
        periodFuels.push(x);
      }
    });   
    let routeRatio = [],
        realData = [],
        trucksData = [];
    periodFuels.forEach(function (elem, i) {
      let x = 0,
          y = 0,
          z = 0;
      elem.forEach(function (ele) {
        x += ele.ratio * ele.totalRoute;
        y += ele.mediaReal * ele.totalRoute;
        z += ele.totalRoute;
      });
      x = x / z;
      y = y / z;
      routeRatio.push(Number(x.toFixed(2)));
      realData.push(Number(y.toFixed(2)));
      trucksData.push(elem[0].truckId);
    });
    let arrRatioTruck = [],
        arrReal = [];

    for (let i = 0; i < trucksData.length; i++) {
      let a = {},
          b = {};
      a[trucksData[i]] = routeRatio[i];
      b[trucksData[i]] = realData[i];
      arrRatioTruck.push(a);
      arrReal.push(b);
    }

    arrRatioTruck.sort(function (a, b) {
      let keyA = "",
          keyB = "";

      for (let keya in a) {
        keyA = keya;
      }

      for (let keyb in b) {
        keyB = keyb;
      }

      return a[keyA] - b[keyB];
    });
    arrReal.sort(function (a, b) {
      let keyA = "",
          keyB = "";

      for (let keya in a) {
        keyA = keya;
      }

      for (let keyb in b) {
        keyB = keyb;
      }

      return a[keyA] - b[keyB];
    });
    routeRatio = [];
    realData = [];
    let trucksDataRatio = [];
    let trucksDataReal = [];
    arrRatioTruck.forEach(function (elem) {
      for (let key in elem) {
        routeRatio.push(elem[key]);
        trucksDataRatio.push(key);
      }
    });
    arrReal.forEach(function (elem) {
      for (let key in elem) {
        realData.push(elem[key]);
        trucksDataReal.push(key);
      }
    });
    let dataSets1 = {
      labels: trucksDataRatio,
      datasets: [{
        label: "Norma: " + routeRatio[0] + ' ' + " Pojazd: " + trucksDataRatio[0],
        data: routeRatio,
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    };
    let dataSets2 = {
      labels: trucksDataReal,
      datasets: [{
        label: "Średnia spalania: " + realData[0] + ' l/100 km ' + " Pojazd: " + trucksDataReal[0],
        data: realData,
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    };
    let options1 = {
      title: `Utrzymanie normy obliczanej dla wagi ładunku.  Podsumowanie okresowe od: ${new Date(arg[0]).toLocaleDateString()}  do: ${new Date(arg[1]).toLocaleDateString()}`,
      target: "tOkrRealNormPlot",
      garaphType: "horizontalBar",
      min: 0.8
    };
    let options2 = {
      title: "Średnie realne zużycie paliwa l/100km. Podsumowanie okresowe od: " + new Date(arg[0]).toLocaleDateString() + " do: " + new Date(arg[1]).toLocaleDateString(),
      target: "tOkrFuelPlot",
      garaphType: "horizontalBar",
      min: 20
    };

    if (id === 0) {
      tOkrRealNormPlot.setAttribute("height", trucksData.length * 10 + 30);
      tOkrFuelPlot.setAttribute("height", trucksData.length * 10 + 30);
      plotGraph1(dataSets1, options1);
      plotGraph1(dataSets2, options2);
    } else if (id === 1) {
      let targ = document.getElementById(options1.target).parentElement;
      let newTarg = targ.innerHTML;
      targ.innerHTML = '';
      targ.innerHTML = newTarg;
      plotGraph1(dataSets1, options1);
    } else {
      let targ = document.getElementById(options2.target).parentElement;
      let newTarg = targ.innerHTML;
      targ.innerHTML = '';
      targ.innerHTML = newTarg;
      plotGraph1(dataSets2, options2);
    }
  }

  tOkrRealNorm.addEventListener("submit", function (e) {
    e.preventDefault();
    let arg = [];
    arg[0] = new Date(tOkrRealNorm.tOkrRealNormStart.value).getTime();
    arg[1] = new Date(tOkrRealNorm.tOkrRealNormEnd.value).getTime();
    findLastInterv(arg, 1);
  });
  tOkrFuel.addEventListener("submit", function (e) {
    e.preventDefault();
    let arg = [];
    arg[0] = new Date(tOkrFuel.tOkrFuelStart.value).getTime();
    arg[1] = new Date(tOkrFuel.tOkrFuelEnd.value).getTime();    
    findLastInterv(arg, 2);
  });
  tRealNormSel.addEventListener("change", function (e) {
    e.preventDefault();
    let truck = trucks.indexOf(trucks.find(function (el) {
      return el._id === tRealNorm.tRealNormSel.value;
    }));
    let start = new Date(trucks[truck].Truck.fuel[0].dtStop);
    let stop = new Date(trucks[truck].Truck.fuel[trucks[truck].Truck.fuel.length - 1].dtStop);
    tRealNormStart.setAttribute("min", start.toISOString().substring(0, 10));
    tRealNormStart.setAttribute("max", stop.toISOString().substring(0, 10));
    tRealNormEnd.setAttribute("min", start.toISOString().substring(0, 10));
    tRealNormEnd.setAttribute("max", stop.toISOString().substring(0, 10));
  }, false);

  function realNorm(truckData, startDate, endDate) {
    let realData = [],
        routeData = [];
    let truckId = trucks.indexOf(trucks.find(function (elem) {
      return elem._id === truckData;
    }));
    let tempData = trucks[truckId].Truck.fuel.filter(function (elem) {
      let start = new Date(startDate).getTime(),
          stop = new Date(endDate).getTime();
      return new Date(elem.dtStop).getTime() >= start && new Date(elem.dtStop).getTime() <= stop;
    });
    tempData.forEach(function (elem) {
      realData.push({
        x: new Date(elem.dtStop),
        y: Number(elem.mediaReal)
      });
      routeData.push({
        x: new Date(elem.dtStop),
        y: Number(elem.mediaRoute)
      });
    });
    let dataSets = {
      datasets: [{
        label: "Rzeczywista średnia zużycia paliwa",
        data: realData,
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }, {
        label: "Norma zużycia w zależności od wagi ładunku  ",
        data: routeData,
        backgroundColor: ['rgba(105, 159, 64, 0.2)'],
        borderColor: ['rgba(55,99,132,1)'],
        borderWidth: 1
      }]
    };
    let start = new Date(startDate).toISOString().substring(0, 10),
        end = new Date(endDate).toISOString().substring(0, 10);
    let options = {
      title: "Średnie realne zużycie paliwa w stosunku do normy obliczanej w zależności od wagi ładunku. Pojazd: " + truckData + " od " + start + " do " + end,
      target: "tRealNormPlot",
      truckId: truckData,
      garaphType: "line",
      beginY: 22,
      typeX: "time",
      distrX: "linear",
      timeU: "week",
      timeDisp: "MM YYYY"
    };
    let targ = document.getElementById(options.target).parentElement;
    let newTarg = targ.innerHTML;
    targ.innerHTML = '';
    targ.innerHTML = newTarg;
    plotGraph2(dataSets, options);
  }

  tRealNorm.addEventListener("submit", function (e) {
    e.preventDefault();
    let truckData = tRealNorm.tRealNormSel.value;
    let startDate = tRealNorm.tRealNormStart.value;
    let endDate = tRealNorm.tRealNormEnd.value;
    realNorm(truckData, startDate, endDate);
  }, false);
  let trucksToPlot = {};

  function manyTrucks(add, arg, dteStart) {
    let dt = dteStart;

    if (add === 2 && !Object.keys(trucksToPlot).length) {
      return;
    }

    if (add === 1) {
      let fuelData = [];
      let truck = trucks.find(function (elem) {
        return elem._id == arg;
      });
      truck.Truck.fuel.forEach(function (elem) {
        fuelData.push({
          x: new Date(elem.dtStop).getTime(),
          y: elem.ratio
        });
      });
      trucksToPlot[arg] = fuelData;
    } else if (add === 0) {
      delete trucksToPlot[arg];
    }

    let toPlot = {};

    for (let key in trucksToPlot) {
      toPlot[key] = trucksToPlot[key].filter(function (elem) {
        return elem.x >= dt;
      });
    }

    let dataSets = {
      datasets: []
    };

    for (let key in toPlot) {
      let color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
      dataSets.datasets.push({
        label: key,
        data: toPlot[key],
        borderColor: [color],
        borderWidth: 1
      });
    }

    let options = {
      title: "Porównanie efektywności dla wielu pojazdów. Data początkowa: " + new Date(dt).toISOString().substring(0, 10),
      target: "tTrucksPlot",
      garaphType: "line",
      beginY: 0.85,
      typeX: "time",
      distrX: "linear",
      timeU: "week",
      timeDisp: "MM YYYY"
    };
    let targ = document.getElementById(options.target).parentElement;
    let newTarg = targ.innerHTML;
    targ.innerHTML = '';
    targ.innerHTML = newTarg;
    plotGraph2(dataSets, options);
  }

  tTrucksAdd.addEventListener("change", function () {
    let truck = this.value;
    document.getElementById(this.value).outerHTML = "";
    let opt = document.createElement("option");
    opt.innerText = truck;
    opt.setAttribute("id", truck);
    tTrucksDel.appendChild(opt);
    manyTrucks(1, truck, new Date(tTrucksStart.value).getTime());
  }, false);
  tTrucksDel.addEventListener("change", function () {
    let truck = this.value;
    manyTrucks(0, truck, new Date(tTrucksStart.value).getTime());
    document.getElementById(this.value).outerHTML = "";
    let opt = document.createElement("option");
    opt.innerText = truck;
    opt.setAttribute("id", truck);
    tTrucksAdd.appendChild(opt);
  }, false);
  tTrucksStart.addEventListener("change", function () {
    manyTrucks(2, null, new Date(this.value).getTime());
  });

  function plotGraph1(dataSets, options) {
    let title = options.title;
    let ctx = document.getElementById(options.target).getContext('2d');
    let myChart = new Chart(ctx, {
      type: options.garaphType,
      data: dataSets,
      options: {
        tooltips: {
          mode: 'point',
          callbacks: {
            label: function (tooltipItem, data) {
              let word = "Średnia spalania";

              if (options.target === "tOkrRealNormPlot") {
                word = "Norma: ";
              }

              label = word + " " + tooltipItem.xLabel;
              return label;
            },
            title: function (tooltipItem, data) {
              label = "Pojazd: " + tooltipItem[0].yLabel;
              return label;
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: false,
              min: options.min
            }
          }]
        },
        title: {
          display: true,
          text: title
        }
      }
    });
  }

  function plotGraph2(dataSets, options) {
    let title = options.title;
    let ctx = document.getElementById(options.target).getContext('2d');
    let myChart = new Chart(ctx, {
      type: options.garaphType,
      data: dataSets,
      options: {
        tooltips: {
          mode: 'point',
          callbacks: {
            label: function (tooltipItem, data) {
              let media = "Utrzymanie normy ";

              if (options.target === "tRealNormPlot") {
                media = dataSets.datasets[tooltipItem.datasetIndex].label;
              }

              label = media + ": " + tooltipItem.yLabel;
              return label;
            },
            title: function (tooltipItem, data) {
              let truckToFind = "";

              if (options.truckId) {
                truckToFind = options.truckId;
              } else {
                truckToFind = data.datasets[tooltipItem[0].datasetIndex].label;
              }

              let dateTruck = new Date(tooltipItem[0].xLabel).getTime();
             
              title = "Pojazd nr:" + truckToFind;
              return title;
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              min: options.beginY
            }
          }],
          xAxes: [{
            type: options.typeX,
            distribution: options.distrX,
            time: {
              unit: options.timeU,
              displayFormats: {
                month: options.timeDisp
              }
            }
          }]
        },
        title: {
          display: true,
          text: title
        }
      }
    });
  }
});