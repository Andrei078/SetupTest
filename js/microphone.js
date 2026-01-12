const micSelect = document.getElementById('micSelect');
const toggleBtn = document.getElementById('toggleBtn');
const volumeBar = document.getElementById('volumeBar');
const volumeLevelEl = document.getElementById('volumeLevel');
const frequencyEl = document.getElementById('frequency');
const latencyEl = document.getElementById('latency');
const qualityEl = document.getElementById('quality');

let audioContext = null;
let analyser = null;
let dataArray = null;
let source = null;
let stream = null;
let running = false;

let lastTime = performance.now();

// INIT: cerere permisiune și listare microfoane
async function initMics() {
  try {
    const tempStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    tempStream.getTracks().forEach(track => track.stop());

    const devices = await navigator.mediaDevices.enumerateDevices();
    const mics = devices.filter(d => d.kind === 'audioinput');

    micSelect.innerHTML = '';
    mics.forEach((mic, i) => {
      const opt = document.createElement('option');
      opt.value = mic.deviceId;
      opt.textContent = mic.label || `Microfon ${i+1}`;
      micSelect.appendChild(opt);
    });
  } catch (err) {
    alert('Nu se poate accesa microfonul: ' + err.message);
  }
}

// Pornire microfon
async function startMic() {
  if (stream) stopMic();

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: micSelect.value ? { exact: micSelect.value } : undefined },
      video: false
    });

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    running = true;
    toggleBtn.textContent = 'Oprește Microfon';
    toggleBtn.classList.add('stop');

    lastTime = performance.now();
    requestAnimationFrame(updateAudio);
  } catch (err) {
    alert('Nu se poate porni microfonul: ' + err.message);
    console.error(err);
  }
}

// Oprire microfon
function stopMic() {
  if (!stream) return;

  stream.getTracks().forEach(t => t.stop());
  if (audioContext) audioContext.close();
  volumeBar.style.width = '0%';
  volumeLevelEl.textContent = '-';
  frequencyEl.textContent = '- Hz';
  latencyEl.textContent = '- ms';
  qualityEl.textContent = '-';

  running = false;
  toggleBtn.textContent = 'Pornește Microfon';
  toggleBtn.classList.remove('stop');
}

// Update volum, frecvență și latență
function updateAudio() {
  if (!running) return;

  // timp latență
  const now = performance.now();
  latencyEl.textContent = Math.round(now - lastTime) + ' ms';
  lastTime = now;

  // volum RMS
  analyser.getByteTimeDomainData(dataArray);
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    let val = (dataArray[i] - 128) / 128;
    sum += val * val;
  }
  let rms = Math.sqrt(sum / dataArray.length);
  let volume = Math.min(rms * 2 * 100, 100);
  volumeBar.style.width = volume + '%';
  volumeLevelEl.textContent = volume.toFixed(0) + '%';

  // frecvența dominantă
  const freqData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqData);
  let maxVal = -Infinity;
  let index = -1;
  for (let i = 0; i < freqData.length; i++) {
    if (freqData[i] > maxVal) {
      maxVal = freqData[i];
      index = i;
    }
  }
  const sampleRate = audioContext.sampleRate;
  const freq = Math.round(index * sampleRate / analyser.fftSize);
  frequencyEl.textContent = freq + ' Hz';

  // calitate estimată
  if (volume > 70 && freq > 1000) qualityEl.textContent = 'Excelentă';
  else if (volume > 40) qualityEl.textContent = 'Bună';
  else qualityEl.textContent = 'Scăzută';

  requestAnimationFrame(updateAudio);
}

toggleBtn.addEventListener('click', () => {
  if (!running) startMic();
  else stopMic();
});

initMics();
