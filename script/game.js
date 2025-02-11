let canvas;
let world;
let gameStopped = false;
let characterAlive = true;
let bossAlive = true;
let keyboard = new Keyboard();
let intervalIds = [];
let intervals = [];
let backgroundMusic = new Audio("assets/audio/game_sound.mp3");
let chicken_walk = new Audio("assets/audio/chicken.mp3");
let winning_sound = new Audio("assets/audio/game_win_sound.mp3");
let sound = true;
let fullscreen = false;
let mobileControlIds = ["left", "right", "jump", "throw"];

/**
 * Initializes the canvas and sets up the world object.
 */
function init() {
    hideStartScreen();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    pushExtraIntervals();
};

/**
 * Pushes the animation intervals of all enemies in the world to the intervalIds array.
 */
function pushExtraIntervals() {
    world.level.enemies.forEach((e) => { intervalIds.push(e.animation_interval) })
};

/**
 * Executes the given function at regular intervals and stores the interval ID.
 *
 * @param {function} func - The function to be executed at regular intervals.
 * @param {number} time - The time interval in milliseconds between each execution.
 * @return {void} This function does not return a value.
 */
function interval(func, time) {
    let boundFunc = func.bind(this);
    let intervalId = setInterval(boundFunc, time);
    intervalIds.push(intervalId);
    intervals.push({ id: intervalId, func: boundFunc, time: time });

};


function pauseGame() {
    intervals.forEach(intervalObj => clearInterval(intervalObj.id));
    cancelAnimationFrame(world.drawId);
    characterAlive = true;
    bossAlive = true;
    gameStopped = true;
};

function resumeGame() {
    if (gameStopped) {
        // Starte alle Intervalle neu mit ihren ursprünglichen Funktionen und Zeiten
        intervals.forEach(intervalObj => {
            let newIntervalId = setInterval(intervalObj.func, intervalObj.time);
            intervalObj.id = newIntervalId;
        });

        // Setze die Animation fort
        world.drawId = requestAnimationFrame(world.draw.bind(world));
        gameStopped = false;
    }
}

/**
 * Stops the game, initializes the level, and resets it.
 */
function stopGame() {
    for (let i = 0; i < 99999; i++) {
        clearInterval(i);
    }
    intervalIds = [];
    intervals = [];
    cancelAnimationFrame(world.drawId);
    levelInitializer.initializeLevel();
    resetLevel(enemies, background, cloud, coins, bottles);
    characterAlive = true;
    bossAlive = true;
    gameStopped = true;
    if (sound == true) {
        sound = false;
    }
    restartGame();
};

function restartGame() {
    if (!gameStopped) stopGame();
    canvas = document.getElementById('canvas');
    closeGameMenu();
    init();
    gameStopped = false;
};

/**
 * Clears the world by setting the level1 and world variables to null.
 * Removes the 'mousemove' event listener for the canvas, which triggers the showMousePosition function.
 * Removes the 'keydown' and 'keyup' event listeners for the window.
 */
function clearWorld() {
    level1 = null;
    world = null;
    window.removeEventListener("keydown", function () { });
    window.removeEventListener("keyup", function () { });
};

/**
 * Initializes keydown event listener to update keyboard state based on pressed keys.
 */
function initializeKeyDownListener() {
    window.addEventListener("keydown", (event) => {
        switch (event.code) {
            case "ArrowLeft":
                keyboard.KEY_LEFT = true;
                keyboard.KEY_RIGHT = false;
                break;
            case "ArrowRight":
                keyboard.KEY_RIGHT = true;
                keyboard.KEY_LEFT = false;
                break;
            case "ArrowUp":
                keyboard.KEY_UP = true;
                break;
            case "ArrowDown":
                keyboard.KEY_DOWN = true;
                break;
            case "KeyD":
                keyboard.KEY_THROW = true;
                break;
        }
    });
};

/**
 * Initializes keyup event listener to update keyboard state when keys are released.
 */
function initializeKeyUpListener() {
    window.addEventListener("keyup", (event) => {
        switch (event.code) {
            case "ArrowLeft":
                keyboard.KEY_LEFT = false;
                break;
            case "ArrowRight":
                keyboard.KEY_RIGHT = false;
                break;
            case "ArrowUp":
                keyboard.KEY_UP = false;
                break;
            case "ArrowDown":
                keyboard.KEY_DOWN = false;
                break;
            case "KeyD":
                keyboard.KEY_THROW = false;
                break;
        }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    if ('ontouchstart' in document.documentElement) {
        document.body.classList.add('touch-device');
    }
});


/**
 * Executes the necessary actions for mobile interaction.
 */
function mobileListener() {
    initializeKeyDownListener();
    initializeKeyUpListener();
    initializeMobileControlListeners();
    releaseMobileControl();
};

/**
 * Initializes touch event listeners for mobile controls to update keyboard state.
 */
function initializeMobileControlListeners() {
    mobileControlIds.forEach((id) => {
        document.getElementById(id).addEventListener("touchstart", (event) => {
            switch (id) {
                case "left":
                    keyboard.KEY_LEFT = true;
                    break;
                case "right":
                    keyboard.KEY_RIGHT = true;
                    break;
                case "jump":
                    keyboard.KEY_UP = true;
                    break;
                case "throw":
                    keyboard.KEY_THROW = true;
                    break;
            }
            event.preventDefault();
        });
    });
};

/**
 * Releases mobile button states when touchend event is triggered.
 *
 * @param {string} id - The id of the button.
 */
function releaseMobileControl(id) {
    mobileControlIds.forEach((id) => {
        document.getElementById(id).addEventListener("touchend", (event) => {
            switch (id) {
                case "left":
                    keyboard.KEY_LEFT = false;
                    break;
                case "right":
                    keyboard.KEY_RIGHT = false;
                    break;
                case "jump":
                    keyboard.KEY_UP = false;
                    break;
                case "throw":
                    keyboard.KEY_THROW = false;
                    break;
            }
            event.preventDefault();
        });
    });
};