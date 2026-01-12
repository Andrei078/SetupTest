const mouseArea = document.getElementById('mouseArea');
const leftClicksEl = document.getElementById('leftClicks');
const rightClicksEl = document.getElementById('rightClicks');
const scrollEl = document.getElementById('scroll');
const positionEl = document.getElementById('position');
const latencyEl = document.getElementById('latency');

let leftClicks = 0;
let rightClicks = 0;
let scrollCount = 0;
let lastEventTime = null;

function updateLatency() {
  const now = performance.now();
  if (lastEventTime !== null) {
    latencyEl.textContent = Math.round(now - lastEventTime) + ' ms';
  }
  lastEventTime = now;
}

mouseArea.addEventListener('mousemove', (e) => {
  const rect = mouseArea.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);

  positionEl.textContent = `${x}, ${y}`;
});

mouseArea.addEventListener('mousedown', (e) => {
  updateLatency();

  mouseArea.classList.add('active');

  if (e.button === 0) {
    leftClicks++;
    leftClicksEl.textContent = leftClicks;
  }

  if (e.button === 2) {
    rightClicks++;
    rightClicksEl.textContent = rightClicks;
  }
});

mouseArea.addEventListener('mouseup', () => {
  mouseArea.classList.remove('active');
});

mouseArea.addEventListener('wheel', (e) => {
  updateLatency();
  scrollCount += Math.abs(e.deltaY);
  scrollEl.textContent = scrollCount;
});

// Dezactivează meniul click dreapta în zona de test
mouseArea.addEventListener('contextmenu', (e) => e.preventDefault());