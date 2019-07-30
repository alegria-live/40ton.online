document.addEventListener("DOMContentLoaded", function() {

  let messageDrivers = document.querySelector("#messageDrivers"),
      dOkrRealNorm = document.querySelector("[name='dOkrRealNorm']"),
      dOkrRealNormStart = document.querySelector("[name='dOkrRealNormStart']"),
      dOkrRealNormEnd = document.querySelector("[name='dOkrRealNormEnd']"),
      dOkrRealNormPlot = document.querySelector("#dOkrRealNormPlot"),
      dOkrFuel = document.querySelector("[name='dOkrFuel']"),
      dOkrFuelStart = document.querySelector("[name='dOkrFuelStart']"),
      dOkrFuelEnd = document.querySelector("[name='dOkrFuelEnd']"),
      dOkrFuelPlot = document.querySelector("#dOkrFuelPlot"),
      dTrucksAdd = document.querySelector("[name='dTrucksAdd']"),
      dTrucksDel = document.querySelector("[name='dTrucksDel']"),
      dTrucksStart = document.querySelector("[name='dTrucksStart']"),
      dRealNorm = document.querySelector("[name='dRealNorm']"),
      dRealNormSel = document.querySelector("[name='dRealNormSel']"),
      dRealNormStart = document.querySelector("[name='dRealNormStart']"),
      dRealNormEnd = document.querySelector("[name='dRealNormEnd']"),
      drivers = [];

  function findDrivers() {
    let dataToSend = {
      collectionName: sessionUser
    };
    sendData(dataToSend, 'POST', '/system/findDrivers', addDrivers);
  }

  findDrivers();

  function addDrivers(msg) {
    downloads += 1;

    if (downloads >= 5) {
      uProgress.parentElement.classList.add("hidden");
    }

    if (msg.length) {
      drivers = msg;
      drivers.sort(function (a, b) {
        return a._id > b._id;
      });
      window.drivers = drivers;
      let month2 = Number(Date.now()) - (new Date().getDate() + 60) * 86400000,
          month1 = Number(Date.now()) - new Date().getDate() * 86400000,
          toDay = Number(Date.now());
      dOkrRealNormStart.setAttribute("value", new Date(month2).toISOString().substring(0, 10));
      dOkrRealNormEnd.setAttribute("value", new Date(toDay).toISOString().substring(0, 10));
      dOkrFuelStart.setAttribute("value", new Date(month2).toISOString().substring(0, 10));
      dOkrFuelEnd.setAttribute("value", new Date(toDay).toISOString().substring(0, 10));
      dTrucksStart.setAttribute("value", new Date(month2).toISOString().substring(0, 10));
      createOptionDrivers();
      findLastIntervD([month2, toDay], 0);
      realNormD(msg[0]._id, month2, toDay);
      manyTrucksD(1, msg[0]._id, month2);
      document.getElementById(msg[0]._id).outerHTML = "";
      let opt = document.createElement("option");
      opt.innerText = msg[0]._id;
      opt.setAttribute("id", msg[0]._id);
      dTrucksDel.appendChild(opt);
    } else {
      messageDrivers.classList.remove("hidden");
      return;
    }
  }

  function createOptionDrivers() {
    drivers.forEach(function (elem) {
      let opt = document.createElement("option");
      opt.setAttribute("value", elem._id);
      opt.innerText = elem._id;
      opt.setAttribute("id", elem._id);
      dTrucksAdd.appendChild(opt);
    });
    drivers.forEach(function (elem) {
      let opt = document.createElement("option");
      opt.setAttribute("value", elem._id);
      opt.innerText = elem._id;
      dRealNormSel.appendChild(opt);
    });
    let trucksDates = [];
    drivers.forEach(function (elem) {
      elem.Driver.routes.forEach(function (ele) {
        trucksDates.push(new Date(ele.dtStop).getTime());
      });
    });
    let maxDate = new Date(Math.max.apply(Math, trucksDates));
    let minDate = new Date(Math.min.apply(Math, trucksDates));
    dOkrRealNormStart.setAttribute("max", maxDate.toISOString().substring(0, 10));
    dOkrRealNormStart.setAttribute("min", minDate.toISOString().substring(0, 10));    
    dOkrFuelStart.setAttribute("max", maxDate.toISOString().substring(0, 10));
    dOkrFuelStart.setAttribute("min", minDate.toISOString().substring(0, 10));    
    dTrucksStart.setAttribute("min", minDate.toISOString().substring(0, 10));
    dTrucksStart.setAttribute("max", maxDate.toISOString().substring(0, 10));
  }

  function findLastIntervD(arg, id) {
    let periodFuels = [];
    drivers.forEach(function (elem) {
      let x = elem.Driver.routes.filter(function (ele) {
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
      trucksData.push(elem[0].driver);
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
        label: "Norma: " + routeRatio[0] + ' ' + " Kierowca: " + trucksDataRatio[0],
        data: routeRatio,
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    };
    let dataSets2 = {
      labels: trucksDataReal,
      datasets: [{
        label: "Średnia spalania: " + realData[0] + ' l/100 km ' + " Kierowca: " + trucksDataReal[0],
        data: realData,
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    };
    let options1 = {
      title: "Utrzymanie normy obliczanej dla wagi ładunku. Podsumowanie okresowe od: " + new Date(arg[0]).toLocaleDateString() + " do: " + new Date(arg[1]).toLocaleDateString(),
      target: "dOkrRealNormPlot",
      garaphType: "horizontalBar",
      min: 0.8
    };
    let options2 = {
      title: "Średnie realne zużycie paliwa l/100km. Podsumowanie okresowe od: " + new Date(arg[0]).toLocaleDateString() + " do: " + new Date(arg[1]).toLocaleDateString(),
      target: "dOkrFuelPlot",
      garaphType: "horizontalBar",
      min: 20
    };

    if (id === 0) {
      dOkrRealNormPlot.setAttribute("height", trucksData.length * 10 + 30);
      dOkrFuelPlot.setAttribute("height", trucksData.length * 10 + 30);
      plotGraph3(dataSets1, options1);
      plotGraph3(dataSets2, options2);
    } else if (id === 1) {
      let targ = document.getElementById(options1.target).parentElement;
      let newTarg = targ.innerHTML;
      targ.innerHTML = '';
      targ.innerHTML = newTarg;
      plotGraph3(dataSets1, options1);
    } else {
      let targ = document.getElementById(options2.target).parentElement;
      let newTarg = targ.innerHTML;
      targ.innerHTML = '';
      targ.innerHTML = newTarg;
      plotGraph3(dataSets2, options2);
    }
  }

  dOkrRealNorm.addEventListener("submit", function (e) {
    e.preventDefault();
    let arg = [];
    arg[0] = new Date(dOkrRealNorm.dOkrRealNormStart.value).getTime();
    arg[1] = new Date(dOkrRealNorm.dOkrRealNormEnd.value).getTime();
    findLastIntervD(arg, 1);
  });
  dOkrFuel.addEventListener("submit", function (e) {
    e.preventDefault();
    let arg = [];
    arg[0] = new Date(dOkrFuel.dOkrFuelStart.value).getTime();
    arg[1] = new Date(dOkrFuel.dOkrFuelEnd.value).getTime();
    findLastIntervD(arg, 2);
  });
  dRealNormSel.addEventListener("change", function (e) {
    e.preventDefault();
    let driver = drivers.indexOf(drivers.find(function (el) {
      return el._id === dRealNorm.dRealNormSel.value;
    }));
    let start = new Date(drivers[driver].Driver.routes[0].dtStop);
    let stop = new Date(drivers[driver].Driver.routes[drivers[driver].Driver.routes.length - 1].dtStop);
    dRealNormStart.setAttribute("min", start.toISOString().substring(0, 10));
    dRealNormStart.setAttribute("max", stop.toISOString().substring(0, 10));
    dRealNormEnd.setAttribute("min", start.toISOString().substring(0, 10));
    dRealNormEnd.setAttribute("max", stop.toISOString().substring(0, 10));
  }, false);

  function realNormD(driverData, startDate, endDate) {
    let realData = [],
        routeData = [];
    let driverId = drivers.indexOf(drivers.find(function (elem) {
      return elem._id === driverData;
    }));
    let tempData = drivers[driverId].Driver.routes.filter(function (elem) {
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
      title: "Średnie realne zużycie paliwa w stosunku do normy obliczanej w zależności od wagi ładunku. Dla Kierowcy: " + driverData + " od " + start + " do " + end,
      target: "dRealNormPlot",
      driverId: driverData,
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
    plotGraph4(dataSets, options);
  }

  dRealNorm.addEventListener("submit", function (e) {
    e.preventDefault();
    let driverData = dRealNorm.dRealNormSel.value;
    let startDate = dRealNorm.dRealNormStart.value;
    let endDate = dRealNorm.dRealNormEnd.value;
    realNormD(driverData, startDate, endDate);
  }, false);
  let driversToPlot = {};

  function manyTrucksD(add, arg, dteStart) {
    let dt = dteStart;

    if (add === 2 && !Object.keys(driversToPlot).length) {
      return;
    }

    if (add === 1) {
      let fuelData = [];
      let driver = drivers.find(function (elem) {
        return elem._id == arg;
      });
      driver.Driver.routes.forEach(function (elem) {
        fuelData.push({
          x: new Date(elem.dtStop).getTime(),
          y: elem.ratio
        });
      });
      driversToPlot[arg] = fuelData;
    } else if (add === 0) {
      delete driversToPlot[arg];
    }

    let toPlot = {};

    for (let key in driversToPlot) {
      toPlot[key] = driversToPlot[key].filter(function (elem) {
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
      title: "Porównanie efektywności dla wielu kierowców. Data począkowa: " + new Date(dt).toISOString().substring(0, 10),
      target: "dTrucksPlot",
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
    plotGraph4(dataSets, options);
  }

  dTrucksAdd.addEventListener("change", function () {
    let truck = this.value;
    document.getElementById(this.value).outerHTML = "";
    let opt = document.createElement("option");
    opt.innerText = truck;
    opt.setAttribute("id", truck);
    dTrucksDel.appendChild(opt);
    manyTrucksD(1, truck, new Date(dTrucksStart.value).getTime());
  }, false);
  dTrucksDel.addEventListener("change", function () {
    let truck = this.value;
    manyTrucksD(0, truck, new Date(dTrucksStart.value).getTime());
    document.getElementById(this.value).outerHTML = "";
    let opt = document.createElement("option");
    opt.innerText = truck;
    opt.setAttribute("id", truck);
    dTrucksAdd.appendChild(opt);
  }, false);
  dTrucksStart.addEventListener("change", function () {
    manyTrucksD(2, null, new Date(this.value).getTime());
  });

  function plotGraph3(dataSets, options) {
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

              if (options.target === "dOkrRealNormPlot") {
                word = "Norma: ";
              }

              label = word + " " + tooltipItem.xLabel;
              return label;
            },
            title: function (tooltipItem, data) {
              title = "Kierowca: " + tooltipItem[0].yLabel;
              return title;
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

  function plotGraph4(dataSets, options) {
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

              if (options.target === "dRealNormPlot") {
                media = dataSets.datasets[tooltipItem.datasetIndex].label;
              }

              label = media + ": " + tooltipItem.yLabel;
              return label;
            },
            title: function (tooltipItem, data) {
              let driverToFind = "";

              if (options.driverId) {
                driverToFind = options.driverId;
              } else {
                driverToFind = data.datasets[tooltipItem[0].datasetIndex].label;
              }

              let dateDriver = new Date(tooltipItem[0].xLabel).getTime();
              // let truckRoute = {};
              // trucks.forEach(function (elem) {
              //   elem.Truck.fuel.forEach(function (ele) {
              //     let dateTruck = new Date(ele.dtStop).getTime();

              //     if (ele.driver == driverToFind && dateDriver === dateTruck) {
              //       truckRoute = trucks.find(function (elem) {
              //         return elem._id === ele.truckId;
              //       });
              //       return;
              //     }
              //   });
              // });
              // title = "Pojazd: " + truckRoute._id + " / Kierowca " + driverToFind;
              title = "Kierowca " + driverToFind;
              
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