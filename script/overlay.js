/**
 * Displays the game over screen and restart button if the character is dead.
 */
function showGameOverScreen() {
    let gameOver = document.getElementById("game-overlay");
    gameOver.innerHTML = /*html*/`
        <div id="game-over">
            <img id="lost" src="assets/img/9_intro_outro_screens/game_over/game over.png" alt="Game Over">
        </div>
        <div id="restart" onclick="restartGame()">
            TRY AGAIN
        </div>
    `;
    gameOver.classList.remove("d-none");
};

/**
 * Displays the winning screen and restart button if the boss is defeated.
 */
function showWinningScreen() {
    let gameOver = document.getElementById("game-overlay");
    gameOver.innerHTML = /*html*/`
        <div id="winning-screen">
            <img id="win" src="assets/img/9_intro_outro_screens/win/win_2.png" alt="You win">
        </div>
        <div id="restart" onclick="restartGame()">
            PLAY AGAIN
        </div>
    `;
    gameOver.classList.remove("d-none");
};

/**
 * Displays the game menu with music, sound, fullscreen buttons, and a restart option.
 */
function showGameMenu() {
    let gameOver = document.getElementById("game-overlay");
    gameOver.innerHTML = /*html*/`
        <div class="menu">
            <img class="menu-btn" onclick="changeMusic('game-music-btn')" id="game-music-btn"
                src="assets/img/icons/no_music.svg" alt="mute game music">
            <img class="menu-btn" onclick="changeSound('game-sound-btn')" id="game-sound-btn"
                src="assets/img/icons/no_sound.svg" alt="mute game sound">
            <img class="menu-btn" onclick="fullScreen(),restartGame()" id="full_screen-btn"
                src="assets/img/icons/fullscreen_icon.svg" alt="">
        </div>
        <div class="polices">
                <a href="./impressum.html">Legal Notice</a>
                <a href="./privat-policy.html">Privacy Police</a>
            </div> 
        <div onclick="restartGame()" class="restart">RESTART</div>
    `;
};

/**
 * Updates the game overlay based on the character and boss status.
 */
function gameOverlay() {
    let gameOver = document.getElementById("game-overlay");
    gameOver.innerHTML = "";
    
    if (!characterAlive) {
        stopGame();
        showGameOverScreen();
    } else if (characterAlive && !bossAlive) {
        stopGame();
        showWinningScreen();
    } else {
        showGameMenu();
    }
};