(function () {
  'use strict';

  var SITE = {
    whatsapp: '351263000000',
    instagram: 'https://www.instagram.com/torquelab2025/'
  };

  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  var ano = document.querySelector('[data-year]');
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  var header = document.getElementById('site-header');
  function atualizarHeader() {
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  atualizarHeader();
  window.addEventListener('scroll', atualizarHeader, { passive: true });

  var fechar = document.getElementById('nav-close');
  if (fechar) fechar.addEventListener('click', fecharMenu);

  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  function fecharMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('nav-open');
  }
  function abrirMenu() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('nav-open');
  }
  toggle.addEventListener('click', function () {
    if (nav.classList.contains('is-open')) fecharMenu();
    else abrirMenu();
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', fecharMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharMenu();
  });

  if (!reduzido) {
    var reveal = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && reveal.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveal.forEach(function (el) { io.observe(el); });
    } else {
      reveal.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  var form = document.getElementById('form-agenda');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome = form.elements.nome.value.trim();
      var telefone = form.elements.telefone.value.trim();
      var email = form.elements.email.value.trim();
      var viatura = form.elements.viatura.value.trim();
      var servico = form.elements.servico.value || 'A definir';
      var mensagem = form.elements.mensagem.value.trim();

if (!nome || !telefone) {
        status.textContent = 'Preencha, por favor, o nome e o telefone para podermos responder.';
        status.classList.add('is-ok');
        return;
      }

      var linhas = [
        'Boa tarde. Venho do site da TorqueLab e pretendo agendar um serviço.',
        '---',
        'Nome: ' + nome,
        'Telefone: ' + telefone,
        'Viatura: ' + (viatura || '-'),
        'Serviço: ' + servico,
        'Descrição: ' + (mensagem || '-'),
        '---',
        'Pedido enviado através do site torquelab.pt'
      ];
      var url = 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(linhas.join('\n'));
      window.open(url, '_blank', 'noopener');

      status.textContent = 'A abrir o WhatsApp para concluir o pedido… se não abrir, contacte-nos pelo telefone ' + SITE.whatsapp.replace(/^(351)/, '+351 ');
      status.classList.add('is-ok');
    });

    var email = form.elements.email;
    email.addEventListener('input', function () {
      if (email.value && form.checkValidity && !email.checkValidity()) {
        email.setAttribute('aria-invalid', 'true');
      } else {
        email.removeAttribute('aria-invalid');
      }
    });
  }
})();