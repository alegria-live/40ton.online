(function($, window, document, undefined) {

  const imgList = $('.img-container img'),
    pointsList = $('#points li'),
    textList = $('.carouselText'),    
    interval = 4000,    
    slideTime = 1000;
    
  let position,
    activeSlide,
    cageWidth = $(".cage").outerWidth(),
    imgListPositionLeft = -cageWidth,
    imgListPositionRight = cageWidth,
    imgListPosition = imgListPositionRight;

  $(window).on("resize", e =>{cageWidth = $(".cage").outerWidth();});

  imgList.each(function (index, element) {
    $(element).attr('data-id-img', index);
  });
  pointsList.each(function (index, element) {
    $(element).attr('data-id-point', index);
  });
  textList.each(function (index, element) {
    $(element).attr('data-id-text', index);
  });
  imgList.css({
    'left': imgListPosition
  });
  $(imgList[0]).css({
    'left': 0
  });
  textList.css({
    'display': 'none'
  });
  $(textList[0]).css({
    'display': 'block'
  });
  activeSlide = $('img[style="left: 0px;"]').data('id-img');
  $(pointsList[activeSlide]).addClass('active');

  function moveSlide(position, direction, next) {
    if (activeSlide == next) {} else {
      $('img:not([style="left: 0px;"])').css({
        'left': position
      });
      $(imgList[activeSlide]).transition({
        "left": direction
      }, slideTime);
      $(imgList[next]).transition({
        "left": 0
      }, slideTime, afterMove);
    }
  }

  function afterMove() {
    $(imgList[activeSlide]).css({
      "left": position
    });
    activeSlide = $('img[style="left: 0px;"]').data('id-img');
    pointsList.removeClass('active');
    $(pointsList[activeSlide]).addClass('active');
    textList.css({
      'display': 'none'
    });
    $(textList[activeSlide]).css({
      'display': 'block'
    });
  }

  var intervalSet = setInterval(slideLeft, interval);

  function slideRight() {
    position = imgListPositionLeft;
    direction = imgListPositionRight;

    if (activeSlide == 0) {
      moveSlide(position, direction, 4);
    } else {
      moveSlide(position, direction, activeSlide - 1);
    }
  }

  function slideLeft() {
    position = imgListPositionRight;
    direction = imgListPositionLeft;

    if (activeSlide == 4) {
      moveSlide(position, direction, 0);
    } else {
      moveSlide(position, direction, activeSlide + 1);
    }
  }

  $('#right, #left, #points').on('mouseover', function () {
    clearInterval(intervalSet);
  });
  $('#right, #left, #points').mouseout(function () {
    intervalSet = setInterval(slideLeft, interval);
  });
  $('#right').click(slideRight);
  $('#left').click(slideLeft);
  $('#points li').on('click', function (e) {
    var currentId = $(this).data('id-point');
    setMove(currentId);
  });

  function setMove(getCurrentId) {
    if (activeSlide < getCurrentId) {
      position = imgListPositionRight;
      direction = imgListPositionLeft;
    } else {
      position = imgListPositionLeft;
      direction = imgListPositionRight;
    }

    moveSlide(position, direction, getCurrentId);
  }
})(jQuery, window, document);