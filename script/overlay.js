/**
 * Displays the game over screen and restart button if the character is dead.
 */
function showGameOverScreen() {
    let gameOver = document.getElementById("game-overlay");
    gameOver.innerHTML = /*html*/`
        <div id="game-over">
            <img id="lost" src="assets/img/9_intro_outro_screens/game_over/game over.png" alt="Game Over">
        </div>
        <div id="restart" onclick="stopGame()">
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
        <div id="restart" onclick="stopGame()">
            PLAY AGAIN
        </div>
    `;
    gameOver.classList.remove("d-none");
    if (sound == true) {
        sound = false;
    }
};

/**
 * Displays the game menu with music, sound, fullscreen buttons, and a restart option.
 */
function showGameMenu() {
    let gameOver = document.getElementById("game-overlay");
    gameOver.innerHTML = /*html*/`
        <div class="menu">
            <div class="dp-flex">
            </div>
                <div class="fd-col"><img class="menu-btn" onclick="closeGameMenu(), resumeGame()" src="assets/img/icons/close_icon.svg" alt="close">close</div>
            </div>   
        </div>
        <div class="polices">
                <a href="./impressum.html">Legal Notice</a>
                <a href="./privat-policy.html">Privacy Police</a>
            </div> 
        <div onclick="stopGame()" class="restart">RESTART</div>
    `;
};

/**
 * Updates the game overlay based on the character and boss status.
 */
function gameOverlay() {
    let gameOver = document.getElementById("game-overlay");
    gameOver.innerHTML = "";
    
    if (!characterAlive) {
        pauseGame();
        showGameOverScreen();
    } else if (characterAlive && !bossAlive) {
        pauseGame();
        showWinningScreen();
    } else {
        showGameMenu();
    }
};