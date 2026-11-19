// Current year in the footer.
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
