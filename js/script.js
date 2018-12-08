var switchSlides = function (buttonClass, slideClass, activeSuffix, prevButtonClass, nextButtonClass) {

  var buttons = document.querySelectorAll('.' + buttonClass);
  var prevButton = document.querySelector('.' + prevButtonClass);
  var nextButton = document.querySelector('.' + nextButtonClass);
  var slides = document.querySelectorAll('.' + slideClass);
  var activeButtonClass = buttonClass + '--' + activeSuffix;
  var activeSlideClass = slideClass + '--' + activeSuffix;
  var activeButton = document.querySelector('.' + activeButtonClass);
  var activeSlide = document.querySelector('.' + activeSlideClass);

  var setActiveButton = function (button) {
    if (activeButton) {
      activeButton.classList.remove(activeButtonClass);
    }
    button.classList.add(activeButtonClass);
    activeButton = button;
  }

  var setActiveSlide = function (slide) {
    if (activeSlide) {
      activeSlide.classList.remove(activeSlideClass);
    }
    slide.classList.add(activeSlideClass);
    activeSlide = slide;
  }

  if (!activeButton || !activeSlide) {
    setActiveButton(buttons[0]);
    setActiveSlide(slides[0]);
  }

  if (prevButton) {
    prevButton.addEventListener('click', function() {
      var prevSelector = activeButton.previousElementSibling;
      var prevSlide = activeSlide.previousElementSibling;
      if (!prevSelector) {
        prevSelector = buttons[buttons.length-1];
        prevSlide = slides[slides.length-1];
      }
      setActiveButton(prevSelector);
      setActiveSlide(prevSlide);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function() {
      var nextSelector = activeButton.nextElementSibling;
      var nextSlide = activeSlide.nextElementSibling;
      if (!nextSelector) {
        nextSelector = buttons[0];
        nextSlide = slides[0];
      }
      setActiveButton(nextSelector);
      setActiveSlide(nextSlide);
    });
  }

  var addClickHandler = function (button, slide) {
    button.addEventListener('click', function () {
      if (button !== activeButton) {
        setActiveButton(button);
        setActiveSlide(slide);
      }
    });
  };

  for (var i = 0; i < slides.length; i++) {
    addClickHandler(buttons[i], slides[i]);
  }
};

