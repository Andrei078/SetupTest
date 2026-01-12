const video = document.getElementById('video');
const cameraSelect = document.getElementById('cameraSelect');
const toggleBtn = document.getElementById('toggleBtn');

const resolutionEl = document.getElementById('resolution');
const fpsEl = document.getElementById('fps');
const qualityEl = document.getElementById('quality');

let stream = null;
let running = false;
let lastTime = performance.now();
let frames = 0;

// Listează camere
async function loadCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cams = devices.filter(d => d.kind === 'videoinput');

  cameraSelect.innerHTML = '';
  cams.forEach((cam, i) => {
    const opt = document.createElement('option');
    opt.value = cam.deviceId;
    opt.textContent = cam.label || `Camera ${i + 1}`;
    cameraSelect.appendChild(opt);
  });
}

// Pornire camera cu Full HD și FPS 60
async function startCamera() {
  if (stream) stopCamera();

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: cameraSelect.value ? { exact: cameraSelect.value } : undefined,
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: { ideal: 60 }
      }
    });

    video.srcObject = stream;
    running = true;

    toggleBtn.textContent = 'Oprește Camera';
    toggleBtn.classList.add('stop');

    video.onloadedmetadata = () => {
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      resolutionEl.textContent = `${settings.width} x ${settings.height}`;
      setQuality(settings.width);
    };

    lastTime = performance.now();
    frames = 0;
    requestAnimationFrame(calcFPS);

  } catch (err) {
    alert('Nu se poate accesa camera: ' + err.message);
  }
}

// Oprire camera
function stopCamera() {
  if (!stream) return;

  stream.getTracks().forEach(t => t.stop());
  video.srcObject = null;
  stream = null;
  running = false;

  toggleBtn.textContent = 'Pornește Camera';
  toggleBtn.classList.remove('stop');

  fpsEl.textContent = '-';
  resolutionEl.textContent = '-';
  qualityEl.textContent = '-';
}

// Calitate
function setQuality(width) {
  if (width >= 1920) qualityEl.textContent = 'Excelentă (Full HD+)';
  else if (width >= 1280) qualityEl.textContent = 'Bună (HD)';
  else qualityEl.textContent = 'Scăzută';
}

// FPS
function calcFPS() {
  if (!running) return;

  frames++;
  const now = performance.now();
  if (now - lastTime >= 1000) {
    fpsEl.textContent = frames + ' FPS';
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(calcFPS);
}

// Toggle Start/Stop
toggleBtn.addEventListener('click', () => {
  if (!running) startCamera();
  else stopCamera();
});

loadCameras();
