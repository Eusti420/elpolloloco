canvas = document.getElementById('canvas');

/**
 * Hides the start screen and shows the canvas.
 *
 * @return {undefined} No return value.
 */

function hideStartScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementsByClassName('canvas')[0].classList.remove('d-none');
    if (sound == true) {
        backgroundMusic.play();
        backgroundMusic.volume = 0.05;
        backgroundMusic.loop = true;
        chicken_walk.play();
        chicken_walk.loop = true;
        chicken_walk.volume = 0.2;
    }
};

/**
 * Opens the menu by removing the 'd-none' class from the 'overlay' element.
 *
 * @return {undefined} This function does not return a value.
 */
function openMenu() {
    document.getElementById('overlay').classList.remove('d-none');
};

function closeMenu() {
    document.getElementById('overlay').classList.add('d-none');
}

/**
 * Opens the game menu by removing the 'd-none' class from the 'game-overlay' element.
 * Calls the 'gameOverlay', 'checkButtons', and 'stopGame' functions.
 */
function openGameMenu() {
    document.getElementById('game-overlay').classList.remove('d-none');
    gameOverlay();
    pauseGame();
};

/**
 * Closes the game menu by adding the 'd-none' class to the 'game-overlay' element.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function closeGameMenu() {
    document.getElementById('game-overlay').classList.add('d-none');
};

/**
 * Change the sound of a button based on its current state.
 *
 * @param {string} id - The ID of the button element.
 * @return {void} This function does not return anything.
 */
function changeSound(id) {
    let btn = document.getElementById(id);
    if (btn.src.slice(-12) == "no_sound.svg") {
        sound = false;
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        backgroundMusic.loop = false;
        chicken_walk.pause();
        chicken_walk.currentTime = 0;
        chicken_walk.loop = false;
        btn.src = "assets/img/icons/sound_on.svg";
    } else {
        sound = true;
        backgroundMusic.play();
        backgroundMusic.currentTime = 0;
        backgroundMusic.loop = true;
        chicken_walk.play();
        chicken_walk.currentTime = 0;
        chicken_walk.loop = true;
        btn.src = "assets/img/icons/no_sound.svg";
    }
};



/**
 * A function to change the music based on the ID of the button clicked.
 *
 * @param {string} id - The ID of the button clicked.
 * @return {undefined} This function does not return a value.
 */
/* function changeMusic(id) {
    let btn = document.getElementById(id);
    if (btn.src.slice(-12) == "no_music.svg") {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        backgroundMusic.loop = false;
        chicken_walk.pause();
        chicken_walk.currentTime = 0;
        chicken_walk.loop = false;
        music = false;
        btn.src = "assets/img/icons/music_on.svg";
    } else {
        music = true;
        btn.src = "assets/img/icons/no_music.svg";
    }
}; */



/**
 * Toggles the full screen mode for the canvas.
 *
 * @param {boolean} fullscreen - indicates whether the canvas is currently in full screen mode
 * @param {HTMLCanvasElement} canvas - the canvas element to be displayed in full screen mode
 * @return {void} 
 */
function fullScreen() {
    if (fullscreen == false) {
        enterFullscreen(canvas);
    } else {
        normalScreen();
        canvas.width = "720"
        canvas.height = "480"
        fullscreen = false
    }
};

/**
 * Exits fullscreen mode for the container.
 *
 * @param {Element} container - The container element to exit fullscreen for.
 */
function normalScreen() {
    exitFullscreen(container);
};

/**
 * Enters fullscreen mode for the specified element.
 *
 * @param {HTMLElement} element - The element to enter fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

/**
 * Exits fullscreen mode.
 *
 * @return {void} This function has no return value.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};