let canvas;
let world;
let keyboard = new Keyboard();

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
    game_music = new Audio('audio/game_sound.mp3');
    game_music.volume = 0.01;
    game_music.loop = true;
    game_music.play();
};

function stopGameSound() {
    game_music.pause();
    this.character.walking_sound = 0;

    console.log('audio volume', this.character.walking_sound);
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