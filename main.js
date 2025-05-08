const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const musicName = document.getElementById('music-name');
const musicAuthor = document.getElementById('music-author');
const musicImg = document.getElementById('music-img');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');

const musics = [
    {
        name: 'Mockingbird',
        author: 'Eminem',
        url: './music/Mockingbird.flac',
        img: './img/mockingbird.jpg',
    },
    {
        name: 'Lovely',
        author: 'Billie Eilish, Khalid',
        url: './music/lovely.m4a',
        img: './img/lovely.jpg',
    },
    {
        name: 'Титры',
        author: 'JONY',
        url: './music/Титры.mp3',
        img: './img/titri.jpg',
    },
    {
        name: 'КАМИН',
        author: 'JONY',
        url: './music/КАМИН.m4a',
        img: './img/w8baian5f6vgmp8w3oqtvxcku.jpg',
    },
    {
        name: 'Idea 10',
        author: 'Gibran Alcocer',
        url: './music/Gibran Alcocer - Idea 10.mp3',
        img: './img/idea10.jpg',
    },
];

let currentMusic = 0;

function listeningMusic(index) {
    audio.src = musics[index].url;
    musicName.textContent = musics[index].name;
    musicAuthor.textContent = musics[index].author;
    musicImg.innerHTML = `<img src="${musics[index].img}" alt="">`
    audio.load();
    audio.play();
}

let state = 1;

play.addEventListener('click', () => {
    if(state === 1) {
        audio.play();
        state = 0;
    } else {
        audio.pause();
        state = 1;
    }
});

next.addEventListener('click', () => {
    currentMusic = (currentMusic + 1) % musics.length;
    listeningMusic(currentMusic);
});

prev.addEventListener('click', () => {
    currentMusic = (currentMusic - 1 + musics.length) % musics.length;
    listeningMusic(currentMusic);
});

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

audio.addEventListener('ended', () => {
    currentMusic = (currentMusic + 1) % musics.length;
    listeningMusic(currentMusic);
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

listeningMusic(currentMusic);




const start = document.querySelector('.start');
const finish = document.querySelector('.finish');

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

audio.addEventListener('loadedmetadata', () => {
    finish.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    start.textContent = formatTime(audio.currentTime);
    progress.value = (audio.currentTime / audio.duration) * 100;
});


const playIcon = play.querySelector('img');

audio.addEventListener('play', () => {
    playIcon.src = './icon/play-icon.png';
});

audio.addEventListener('pause', () => {
    playIcon.src = './icon/pause-icon.png';
});