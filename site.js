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

// Class sign-up: build a pre-filled email from the form instead of posting anywhere.
(function () {
  var form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      lines.push(el.name + ': ' + (el.value.trim() || '-'));
    });
    var name = form.elements['Student name'].value.trim();
    var subject = 'Fall Courses 2026 sign-up: ' + name;
    var body = 'Hi PNDS,\n\nI would like to sign up for Fall Courses 2026.\n\n' + lines.join('\n') + '\n';
    window.location.href = 'mailto:pnds.inquiry@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
