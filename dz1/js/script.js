$(document).ready(function () {
  $(".navbar__burger").click(function (event) {
    $(".menu, .navbar__burger").toggleClass("open");
    $("body").toggleClass("lock");
  });
});
