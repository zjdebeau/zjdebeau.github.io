const symbolPlay = '⯈';
const symbolPause = '❚ ❚';
const files = ['Nature-8399', 'River-655', 'Waterfall-941', 'Wave-2737'];

const aside = document.querySelector('aside');
const video = document.querySelector('#vidPlayer');
const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const progress = document.querySelector('#progress');
const progressFilled = document.querySelector('#progressFilled');
const volume = document.querySelector('#volume');
const skipButtons = document.querySelectorAll('[data-skip]');

// 1. Load video thumbnails and add click handlers
files.forEach(file => {
  const img = document.createElement('img');
  img.src = `images/${file}.jpg`;
  img.alt = file;
  img.style.width = "100px";
  img.style.margin = "0 5px";
  
  img.addEventListener('click', () => {
    video.pause();
    video.src = `videos/${file}.mp4`;
    video.load();
    video.play();
    playButton.textContent = symbolPause;
  });

  aside.appendChild(img);
});

// 2. Play/Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.textContent = symbolPause;
  } else {
    video.pause();
    playButton.textContent = symbolPlay;
  }
}
playButton.addEventListener('click', togglePlay);

// 3. Stop Button
stopButton.addEventListener('click', () => {
  video.pause();
  video.currentTime = 0;
  playButton.textContent = symbolPlay;
  updateProgress(); // Reset progress bar
});

// 4. Skip Buttons
skipButtons.forEach(button => {
  button.addEventListener('click', () => {
    const skipValue = parseFloat(button.dataset.skip);
    video.currentTime += skipValue;
  });
});

// 5. Volume Control
volume.addEventListener('input', () => {
  video.volume = volume.value;
});

// 6. Progress Bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', updateProgress);
