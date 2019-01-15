'use strict';
(function () {

  var priceFilter = document.querySelector('.filter__price-range');
  var knobMin = priceFilter.querySelector('.filter__knob--min');
  var knobMax = priceFilter.querySelector('.filter__knob--max');
  var priceMin = document.getElementById('price-min');
  var priceMax = document.getElementById('price-max');
  var scale = priceFilter.querySelector('.filter__price-scale');
  var rangeBar = priceFilter.querySelector('.filter__price-bar');
  var minValue = 0;
  var maxValue = 35000;

  var knobWidth = knobMin.offsetWidth;

  var step = (maxValue / (scale.offsetWidth - knobWidth)) / 100;

  var Coordinate = function (x, constraints) {
    this.x = x;
    this._constraints = constraints;
  };

  Coordinate.prototype.setX = function (x) {
    if (x >= this._constraints.left &&
        x <= this._constraints.right) {
      this.x = x;
    }
  };

  var ScaleRange = function () {
    this.left = 0;
    this.right = scale.offsetWidth - knobWidth;
  };

  ScaleRange.prototype.setRange = function (targetKnob) {
    if (targetKnob === knobMin) {
      this.right = knobMax.offsetLeft;
    }
    if (targetKnob === knobMax) {
      this.left = knobMin.offsetLeft;
    }
  };

  var moveRect = scale.getBoundingClientRect();

  var MoveRange = function (left, right) {
    this.left = left;
    this.right = right;
  };

  MoveRange.prototype.setRange = function (targetKnob) {
    if (targetKnob === knobMin) {
      this.right = moveRect.left + knobMax.offsetLeft + knobWidth / 2;
    }
    if (targetKnob === knobMax) {
      this.left = moveRect.left + knobMin.offsetLeft + knobWidth / 2;
    }
  };

  var onKnobMouseDown = function (evt) {
    // evt.preventDefault();
    var knob = evt.target;
    knobMax.style.zIndex = 0;
    knob.style.zIndex = 1;

    var moveRange = new MoveRange(moveRect.left + knobWidth / 2, moveRect.right - knobWidth / 2);

    var startCoord = new Coordinate(evt.clientX, moveRange);

    var shift = new Coordinate(startCoord.x);

    var scaleRange = new ScaleRange();

    var move = new Coordinate(knob.offsetLeft, scaleRange);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      shift.x = startCoord.x - moveEvt.clientX;
      moveRange.setRange(knob);

      startCoord.setX(moveEvt.clientX);

      scaleRange.setRange(knob);

      move.setX(knob.offsetLeft - shift.x);

      knob.style.left = move.x + 'px';
      rangeBar.style.left = (knobMin.offsetLeft + knobWidth / 2) + 'px';
      rangeBar.style.width = (knobMax.offsetLeft - knobMin.offsetLeft) + 'px';

      if (knob === knobMin) {
        priceMin.value = Math.ceil(knobMin.offsetLeft * step) * 100;
      }
      if (knob === knobMax) {
        priceMax.value = Math.ceil(knobMax.offsetLeft * step) * 100;
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  knobMin.addEventListener('mousedown', onKnobMouseDown);
  knobMax.addEventListener('mousedown', onKnobMouseDown);

  var setInputValue = function (input) {
    var value = parseInt(input.value, 10);
    if (input === priceMin) {
      var max = parseInt(priceMax.value, 10);
      input.value = value < minValue ? minValue : value > max ? max : value;
    } else if (input === priceMax) {
      var min = parseInt(priceMin.value, 10);
      input.value = value < min ? min : value > maxValue ? maxValue : value;
    }
  }

  var onTextInput = function (evt) {
      var input = evt.target;
      var knobID = 'knob-' + input.id.slice(-3);
      var knob = document.getElementById(knobID);
      input.value = input.value.replace(/[^\d]*/, 0);
      setInputValue(input);
      var left = Math.round(input.value / (step * 100));
      knobMax.style.zIndex = 0;
      knob.style.zIndex = 1;
      knob.style.left = left + 'px';
      rangeBar.style.left = (knobMin.offsetLeft + knobWidth / 2) + 'px';
      rangeBar.style.width = (knobMax.offsetLeft - knobMin.offsetLeft) + 'px';
  };

  priceMin.addEventListener('input', onTextInput);
  priceMax.addEventListener('input', onTextInput);

})();
