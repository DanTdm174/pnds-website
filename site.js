// Current year in the footer.
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

// Team bios. Without JS every bio shows in full. With JS each card shows a short
// excerpt, and "Read bio" opens the full bio in a dialog, so the cards stay the same height.
(function () {
  var dialog = document.getElementById('bio-dialog');
  var toggles = document.querySelectorAll('.bio-toggle');
  if (!dialog || typeof dialog.showModal !== 'function' || !toggles.length) return;

  document.documentElement.classList.add('js');
  var nameEl = dialog.querySelector('#bio-dialog-name');
  var roleEl = dialog.querySelector('.role');
  var imgEl = dialog.querySelector('img');
  var bodyEl = dialog.querySelector('.bio-dialog-body');
  var opener = null;

  function close() { if (dialog.open) dialog.close(); }

  Array.prototype.forEach.call(toggles, function (btn) {
    var bio = document.getElementById(btn.getAttribute('data-bio'));
    if (!bio) return;
    var card = btn.closest('.member');
    bio.classList.add('is-collapsed');
    btn.hidden = false;

    btn.addEventListener('click', function () {
      var photo = card.querySelector('img');
      nameEl.textContent = card.querySelector('h3').textContent;
      roleEl.textContent = card.querySelector('.role').textContent;
      imgEl.src = photo.currentSrc || photo.src;
      imgEl.alt = photo.alt;
      bodyEl.innerHTML = bio.innerHTML;
      opener = btn;
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('dialog-open');
      dialog.showModal();
      dialog.querySelector('.bio-dialog-inner').scrollTop = 0;
      dialog.querySelector('.bio-dialog-close').focus();
    });
  });

  dialog.querySelector('.bio-dialog-close').addEventListener('click', close);
  // Click on the dimmed backdrop closes it.
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('dialog-open');
    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
      opener.focus();
      opener = null;
    }
  });
})();

// Class sign-up: build a pre-filled email from the form, or copy the details
// for people without an email app.
(function () {
  var form = document.getElementById('signup-form');
  if (!form) return;
  var copyBtn = document.getElementById('signup-copy');
  var status = document.getElementById('signup-status');
  var TO = 'pnds.inquiry@gmail.com';
  var timer = null;

  function details() {
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      lines.push(el.name + ': ' + (el.value.trim() || '-'));
    });
    var name = form.elements['Student name'].value.trim();
    return {
      subject: 'Fall Courses 2026 sign-up: ' + name,
      body: 'Hi PNDS,\n\nI would like to sign up for Fall Courses 2026.\n\n' + lines.join('\n') + '\n'
    };
  }

  function say(msg) {
    status.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ''; }, 6000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var d = details();
    window.location.href = 'mailto:' + TO + '?subject=' +
      encodeURIComponent(d.subject) + '&body=' + encodeURIComponent(d.body);
  });

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  if (copyBtn) {
    copyBtn.hidden = false;
    copyBtn.addEventListener('click', function () {
      if (!form.reportValidity()) return;
      var d = details();
      var text = 'To: ' + TO + '\nSubject: ' + d.subject + '\n\n' + d.body;
      var msg = function (key, fallback) { return (status.getAttribute('data-msg-' + key) || fallback).replace('{email}', TO); };
      var done = function () { say(msg('copied', 'Copied! Paste it into an email to {email}.')); };
      var failed = function () {
        if (fallbackCopy(text)) done();
        else say(msg('failed', 'Couldn’t copy automatically. Please email {email} with the details above.'));
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, failed);
      } else {
        failed();
      }
    });
  }
})();
