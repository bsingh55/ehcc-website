(function () {
  var box = document.getElementById('lightbox'), big = document.getElementById('lightbox-img'), last = null;
  function close() { box.hidden = true; big.removeAttribute('src'); if (last) last.focus(); }
  document.querySelectorAll('[data-zoom]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img'); last = btn;
      big.src = img.currentSrc || img.src; big.alt = img.alt; box.hidden = false;
      document.getElementById('lightbox-close').focus();
    });
  });
  box.addEventListener('click', function (e) { if (e.target !== big) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
})();
document.querySelectorAll('[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = btn.getAttribute('data-copy');
    var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1800); };
    var fallback = function () {
      var el = btn.parentNode.querySelector('.copy-src');
      var r = document.createRange(); r.selectNodeContents(el);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      btn.textContent = 'Selected';
    };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, fallback); } else { fallback(); }
  });
});
