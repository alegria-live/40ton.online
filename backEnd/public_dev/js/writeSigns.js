(function () {
  function WriteSigns(text, textArea, interval) {
    if (!(this instanceof WriteSigns)) {
      return new WriteSigns(text, textArea, interval);
    }

    this._textArea = document.querySelector(textArea);
    this._text = text;
    this._interval = interval;
    this._i = 0;

    this._getSigns();
  }

  WriteSigns.prototype._getSigns = function () {
    this._textArea.textContent += this._text.charAt(this._i);
    this._i++;
    self = this;

    if (this._i === this._text.length) {
      self._endPoint(self);
    }

    if (this._i < this._text.length) {
      setTimeout(function () {
        self._getSigns();
      }, 50);
    }
  };

  WriteSigns.prototype._endPoint = function (self) {
    this._textArea.style.display = "inline-block";
    var acceptCookies = document.createElement("i");
    acceptCookies.className = "fa fa-low-vision";
    acceptCookies.style.cursor = "pointer";
    acceptCookies.style.fontSize = "20px";
    acceptCookies.style.color = "red";

    acceptCookies.onclick = function () {
      self._textArea.parentNode.style.display = "none";
    };

    this._textArea.parentNode.appendChild(acceptCookies);
  };

  window.writeSigns = WriteSigns;
})();