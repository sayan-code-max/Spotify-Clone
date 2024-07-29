console.log("Welcome to Spotify Music.");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentTimeDisplay = document.getElementById('currentTime');
let totalTimeDisplay = document.getElementById('totalTime');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Pink Lips",             filePath: "songs/1.mp3",   coverPath: "covers/1.jpg", duration: "05:34"},
    {songName: "Katchi Sera",           filePath: "songs/2.mp3",   coverPath: "covers/2.jpg", duration: "04:12"},
    {songName: "Aasa kooda",            filePath: "songs/3.mp3",   coverPath: "covers/3.jpeg", duration: "03:45"},
    {songName: "Deewana kar Raha Hai",  filePath: "songs/4.mp3",   coverPath: "covers/4.jpg", duration: "06:15"},
    {songName: "Sexy Baliye",           filePath: "songs/5.mp3",   coverPath: "covers/5.jpeg", duration: "03:55"},
    {songName: "Pyaar Ki Ek Kahani",    filePath: "songs/6.mp3",   coverPath: "covers/6.jpeg", duration: "04:23"},
    {songName: "Dil Tu Hi Bataa",       filePath: "songs/7.mp3",   coverPath: "covers/7.jpg", duration: "05:01"}
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
});

// Format time in minutes and seconds
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

audioElement.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.innerText = formatTime(audioElement.duration);
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let target = e.target;
        if (audioElement.paused || songIndex !== parseInt(target.id)) {
            makeAllPlays();
            songIndex = parseInt(target.id);
            target.classList.remove('fa-play');
            target.classList.add('fa-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        } else {
            audioElement.pause();
            target.classList.remove('fa-pause');
            target.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

// Automatically play next song when current one ends
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});
