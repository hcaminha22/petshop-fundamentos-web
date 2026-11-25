// Carrossel com controle temporal, pausa por foco e respeito a movimento reduzido.
const carrossel = document.querySelector('.hero');
if (carrossel) {
  const slides = [...carrossel.querySelectorAll('.slide')];
  const controles = carrossel.querySelector('.carousel-controls');
  const pausa = document.querySelector('#pause');
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
  let indice = 0;
  let pausado = movimentoReduzido.matches;
  let ponteiroDentro = false;
  let focoDentro = false;
  let intervalo;

  function mostrar(proximo) {
    indice = (proximo + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== indice; });
    document.querySelector('#slide-count').textContent = (indice + 1) + ' / ' + slides.length;
  }

  function atualizarTemporizador() {
    clearInterval(intervalo);
    pausa.textContent = pausado ? 'Iniciar apresentação' : 'Pausar apresentação';
    pausa.setAttribute('aria-pressed', String(pausado));
    if (!pausado && !ponteiroDentro && !focoDentro && !document.hidden) {
      intervalo = setInterval(() => mostrar(indice + 1), 7000);
    }
  }

  controles.hidden = false;
  document.querySelector('#previous').addEventListener('click', () => mostrar(indice - 1));
  document.querySelector('#next').addEventListener('click', () => mostrar(indice + 1));
  pausa.addEventListener('click', () => { pausado = !pausado; atualizarTemporizador(); });
  carrossel.addEventListener('mouseenter', () => { ponteiroDentro = true; atualizarTemporizador(); });
  carrossel.addEventListener('mouseleave', () => { ponteiroDentro = false; atualizarTemporizador(); });
  carrossel.addEventListener('focusin', () => { focoDentro = true; atualizarTemporizador(); });
  carrossel.addEventListener('focusout', (evento) => {
    focoDentro = carrossel.contains(evento.relatedTarget);
    atualizarTemporizador();
  });
  document.addEventListener('visibilitychange', atualizarTemporizador);
  movimentoReduzido.addEventListener('change', () => {
    if (movimentoReduzido.matches) pausado = true;
    atualizarTemporizador();
  });
  atualizarTemporizador();
}
