let canvas;
let world;
let keyboard = new Keyboard();
let gameMusic = new Audio('audio/game_sound.mp3');
let sound = true;
let music = true;

function startGame() {
    document.getElementById('start-btn').classList.add('d-hide');
    document.getElementById('starting-screen').classList.add('d-hide');
    initLevel();
    init();
    playGameMusic();
};

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

function playGameMusic() {
    gameMusic.volume = 0.01;
    gameMusic.loop = true;
    gameMusic.play();
    document.getElementById('turn-music-on').classList.add('d-hide');
    document.getElementById('turn-music-off').classList.remove('d-hide');
};

function stopGameMusic() {
    gameMusic.pause();
    document.getElementById('turn-music-off').classList.add('d-hide');
    document.getElementById('turn-music-on').classList.remove('d-hide');
};

function stopGameSound() {
    document.getElementById('turn-sound-off').classList.add('d-hide');
    document.getElementById('turn-sound-on').classList.remove('d-hide');
};

function playGameSound() {
    document.getElementById('turn-sound-off').classList.remove('d-hide');
    document.getElementById('turn-sound-on').classList.add('d-hide');
};

function openSettings() {
    let settingsScreen = document.getElementById('settings-screen');
    settingsScreen.classList.remove('d-hide');
    settingsScreen.classList.add('d-block');
};

function closeSettings() {
    let settingsScreen = document.getElementById('settings-screen');
    settingsScreen.classList.remove('d-block');
    settingsScreen.classList.add('d-hide');
};

document.addEventListener("fullscreenchange", function () {
    let exitButton = document.getElementById('exit-fullscreen');
    if (document.fullscreenElement) {
        exitButton.classList.remove('d-hide');
    } else {
        exitButton.classList.add('d-hide');
    }
});

function fullscreen() {
    let fullscreenElement = document.getElementById('fullscreen');
    openFullscreen(fullscreenElement);
};

function exitFullscreen() {
    closeFullscreen();
};

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
};

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
};



window.addEventListener("keydown", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    
    if(e.keyCode == 40) {
        keyboard.DOWN= true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    
    if(e.keyCode == 40) {
        keyboard.DOWN= false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});