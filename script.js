const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playPauseToggle = document.getElementById('play');

// Array of songs in the folder
const songs = [
    {
        name: 'jacinto-1',
        dispkayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        dispkayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        dispkayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    }
];

// check if playing
let isPlaying = false;

function playSong() {
    isPlaying = true;
    playPauseToggle.classList.replace('fa-play', 'fa-pause');
    playPauseToggle.setAttribute('title', 'Pause')
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playPauseToggle.classList.replace('fa-pause', 'fa-play');
    playPauseToggle.setAttribute('title', 'Play')
    audio.pause();
}

// On Load
loadSong(songs[2]);

// Play or pause event listener
playPauseToggle.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.name;
    artist.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration , currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;
        // Calculate the display for the duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching the duraion element to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate the display for the current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }

}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;

}

// Event Listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
