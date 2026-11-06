/* FC Soluções Tecnológicas — interações do site */
(function () {
  // Número do WhatsApp que recebe o formulário (só dígitos, com DDI e DDD, ex.: 5548999999999)
  var WHATSAPP = '5548999964841';

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = !reduce && 'IntersectionObserver' in window;

  // No celular o showreel usa a versão 4:5 (o <source media> escolhe o vídeo; aqui troca o poster)
  if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) {
    document.querySelectorAll('video[data-poster-mobile]').forEach(function (v) { v.poster = v.getAttribute('data-poster-mobile'); });
  }

  // Com movimento reduzido, o showreel fica parado no poster
  if (reduce) document.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Quebra o texto do "Olá!" em palavras, para acenderem com a rolagem
  var introEl = document.querySelector('[data-words]');
  var words = [];
  if (introEl) {
    var parts = introEl.textContent.trim().split(/\s+/);
    introEl.textContent = '';
    parts.forEach(function (p, i) {
      var s = document.createElement('span');
      s.className = 'iw';
      s.textContent = p;
      introEl.appendChild(s);
      if (i < parts.length - 1) introEl.appendChild(document.createTextNode(' '));
      words.push(s);
    });
  }

  if (canAnimate) {
    root.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  }

  // Rolagem: barra de progresso, showreel que cresce, texto que acende
  var bar = document.querySelector('.progress');
  var reel = document.querySelector('.reel');
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };
  var ticking = false;

  function onScroll() {
    ticking = false;
    var vh = window.innerHeight || 800;
    var se = document.scrollingElement || document.documentElement;
    var max = se.scrollHeight - se.clientHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? clamp(se.scrollTop / max) : 0) + ')';
    if (!canAnimate) return;
    if (reel) {
      var r = reel.getBoundingClientRect();
      var p = clamp((vh - r.top) / (vh * 0.9));
      reel.style.transform = 'scale(' + (0.82 + 0.18 * p).toFixed(4) + ')';
    }
    if (introEl && words.length) {
      var ri = introEl.getBoundingClientRect();
      var pi = clamp((vh * 0.85 - ri.top) / (ri.height * 1.2 + vh * 0.15));
      var lit = Math.round(pi * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < lit);
    }
  }
  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  onScroll();

  // Brilho do hero segue o mouse: move o círculo só com transform (não redesenha o hero)
  var hero = document.querySelector('.hero');
  var spot = hero && hero.querySelector('.hero__spot');
  if (spot && canAnimate) {
    var placeSpot = function (x, y) { spot.style.transform = 'translate(' + x + 'px,' + y + 'px)'; };
    var hr = hero.getBoundingClientRect();
    placeSpot(hr.width * 0.7, hr.height * 0.3);
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      placeSpot(e.clientX - r.left, e.clientY - r.top);
    });
  }

  // Formulário: escolha do tipo + envio pelo WhatsApp
  var kind = 'Sistema';
  document.querySelectorAll('.pill[data-kind]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pill[data-kind]').forEach(function (b) {
        b.classList.remove('is-on'); b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-on'); btn.setAttribute('aria-pressed', 'true');
      kind = btn.getAttribute('data-kind');
    });
  });

  var form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var msg = 'Olá! Vim pelo site da FC.\n\n' +
        'Tipo de projeto: ' + kind + '\n' +
        'Nome: ' + (d.get('nome') || '') + '\n' +
        (d.get('empresa') ? 'Empresa: ' + d.get('empresa') + '\n' : '') +
        'Contato: ' + (d.get('contato') || '') + '\n\n' +
        (d.get('mensagem') || '');
      var num = WHATSAPP.replace(/\D/g, '');
      window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();
