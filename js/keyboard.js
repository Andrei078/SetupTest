const keys = document.querySelectorAll('.key');
const lastKeyEl = document.getElementById('lastKey');
const keyCodeEl = document.getElementById('keyCode');
const responseTimeEl = document.getElementById('responseTime');

let lastTime = null;

function getKeyElement(code) {
  return document.querySelector(`.key[data-key="${code}"]`);
}

window.addEventListener('keydown', (e) => {
  const now = performance.now();

  if (lastTime !== null) {
    const delta = Math.round(now - lastTime);
    responseTimeEl.textContent = delta + ' ms';
  }

  lastTime = now;

  lastKeyEl.textContent = e.key;
  keyCodeEl.textContent = e.code;

  const keyEl = getKeyElement(e.code);
  if (keyEl) {
    keyEl.classList.add('active', 'tested');
  }
});

window.addEventListener('keyup', (e) => {
  const keyEl = getKeyElement(e.code);
  if (keyEl) {
    keyEl.classList.remove('active');
  }
});

// Reset la refresh
window.addEventListener('load', () => {
  lastKeyEl.textContent = '-';
  keyCodeEl.textContent = '-';
  responseTimeEl.textContent = '- ms';
});