var ua = window.navigator.userAgent;

function isIE() {
  if (ua.indexOf("MSIE") > 0 || ua.indexOf("Trident") > 0) {
    alert("System nie działa w przeglądarce Internet Explorer. Prawidłowe działanie zapewniają tylko przeglądarki: Chrome, Firefox lub Edge");
    return;
  }
}

isIE();