// Current year in the footer.
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

// "Read bio" toggles. Bios are fully visible without JS; with JS, long ones are collapsed.
(function () {
  document.documentElement.classList.add('js');
  var toggles = document.querySelectorAll('.bio-toggle');
  Array.prototype.forEach.call(toggles, function (btn) {
    var bio = document.getElementById(btn.getAttribute('aria-controls'));
    if (!bio) return;
    bio.classList.add('is-collapsed');
    // Leave short bios open: no button if nothing is cut off.
    if (bio.scrollHeight <= bio.clientHeight + 4) {
      bio.classList.remove('is-collapsed');
      return;
    }
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      bio.classList.toggle('is-collapsed', open);
      btn.textContent = open ? 'Read bio' : 'Close bio';
    });
  });
})();
