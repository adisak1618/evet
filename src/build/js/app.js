$(document).ready(function () {
  $(".card-container .right-cursor").click(function () {
    var currentElm = $( this ).siblings('.scroller');
    currentElm.animate({scrollLeft: Math.floor(currentElm.scrollLeft()/245)*245 + 245}, 500);
    console.log(currentElm.offset().left);
  });
  $(".card-container .left-cursor").click(function () {
    var currentElm = $( this ).siblings('.scroller');
    currentElm.animate({scrollLeft: Math.floor(currentElm.scrollLeft()/245)*245 - 245}, 500);
    console.log(currentElm.offset().left);
  });
});