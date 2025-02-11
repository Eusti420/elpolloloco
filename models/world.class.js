class World {
    ctx;
    drawId;
    drawing = false;
    keyboard;
    character = new Character();
    level = level1;
    throwableObjects = [];
    camera_x = 0;
    splashes = [];
    globalAlpha = 1;
    alphaDecrease = 0.01;
    fadingAlpha = 1;
    characterBars = [
        new StatusBarHealth(10),
        new StatusBarBottle(),
        new StatusBarCoins()
    ];
    bossHealthBar = new BossHealth(2800);
    endBoss = new Endboss();
    coin_sound = new Audio("assets/audio/collect_coin.mp3");
    bottle_sound = new Audio("assets/audio/collect_bottle.mp3");
    bossHit_sound = new Audio("assets/audio/boss_hit.mp3");
    hit_sound = new Audio("assets/audio/death_sound.mp3");

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.offsetX = this.canvas.getBoundingClientRect().x;
        this.offsetY = this.canvas.getBoundingClientRect().y;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();

    };

    /**
    * Sets up the world by linking the character and end boss to the world context and their respective health bars.
    */
    setWorld() {
        this.character.world = this;
        this.character.healthBar = this.characterBars[0];
        this.endBoss.world = this;
        this.endBoss.healthBar = this.bossHealthBar;
    };

    /**
    * Draws the game elements on the canvas by resetting entities, initializing the canvas, adding backgrounds and collectables,
    * drawing bars, characters, enemies, splashes, and rotating bottles, and then recursively calls itself using requestAnimationFrame.
    */
    draw() {
        this.resetSurvivingEntities();
        this.initializeCanvas();
        this.addBackgroundsAndCollectables();
        this.addBarsToCanvas();
        this.characterFadeOut();
        this.drawEnemies();
        this.drawSplashes();
        this.drawRotatingBottle();
        this.ctx.translate(-this.camera_x, 0);
        this.drawId = requestAnimationFrame(() => {
            this.draw();
        });

    };

    /**
     * Prepares the canvas for drawing by clearing it, translating the camera,
     * and setting the global alpha.
     */
    initializeCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.globalAlpha = this.globalAlpha;
    };

    /**
    * Adds background objects, clouds, coins, and bottles to the map array from the current level.
    */
    addBackgroundsAndCollectables() {
        const { backgroundObjects, clouds, coins, bottles } = this.level;
        this.addToMapArray(backgroundObjects);
        this.addToMapArray(clouds);
        this.addToMapArray(coins);
        this.addToMapArray(bottles);
    };

    /**
    * Adds character bars to the map array and the boss health bar to the map.
    */
    addBarsToCanvas() {
        this.addToMapArray(this.characterBars);
        this.addToMap(this.bossHealthBar);
    };

    /**
     * Fades out the character on the canvas.
     */
    characterFadeOut() {
        if (this.character.isFadingOut) {
            this.ctx.globalAlpha -= this.alphaDecrease;
            this.addToMap(this.character);
        } else {
            this.addToMap(this.character);
        }

        this.ctx.globalAlpha = 1;
    };

    /**
     * Draws the enemies on the map.
     */
    drawEnemies() {
        this.addToMapArray(this.level.enemies);
        this.addToMap(this.endBoss);
    };

    /**
     * Draws the splashes on the canvas.
     */
    drawSplashes() {
        if (this.splashes.length > 0) {
            this.splashes.forEach((e) => {
                if (e.isFadingOut) {
                    this.ctx.globalAlpha = this.fadingAlpha - this.alphaDecrease;
                    if (this.splashesNearlyGone()) this.removeSplash();
                    else { this.keepFading(e); };
                } else {
                    this.addToMap(e);
                };
            })
        };
    };

    /**
     * Checks if the global alpha value is nearly gone.
     */
    splashesNearlyGone() {
        return (this.ctx.globalAlpha <= 0.02)
    };

    /**
     * Remove the first element from the splashes array, set the global alpha to 1,
     * and set the fading alpha to 1.
     */
    removeSplash() {
        return this.splashes.splice(this.splashes[0], 1),
            this.ctx.globalAlpha = 1, this.fadingAlpha = 1;
    };

    /**
     * Updates the fading alpha value and adds the specified element to the map..
     */
    keepFading(element) {
        this.fadingAlpha -= this.alphaDecrease;
        this.addToMap(element);
        this.ctx.globalAlpha = 1;
    };

    /**
    * Draws the rotating bottle on the canvas if it exists and is not broken.
    */
    drawRotatingBottle() {
        this.ctx.save();
        if (this.throwableObjects[0]) {
            if (!this.throwableObjects[0].broken) {
                this.addToMap(this.throwableObjects[0]);
            }
        };
        this.ctx.restore();
    };

    /**
     * Add multiple objects to the map array.
     */
    addToMapArray(objs) {
        objs.forEach((obj) => {
            this.addToMap(obj);
        });
    };

    /**
     * A function that adds a MovableObject to the map.
     */
    addToMap(MovableObject) {
        try {
            if (MovableObject instanceof ThrowableObject) { this.rotateImage(MovableObject) }
            if (MovableObject.otherDirection) this.flipImage(MovableObject);
            MovableObject.draw(this.ctx)
            if (MovableObject.otherDirection) this.flipImageBack(MovableObject);
        } catch (err) {
            console.log(err, MovableObject)
        };
    };

    /**
     * Flips the image horizontally.
     */
    flipImage(MovableObject) {
        this.ctx.save();
        this.ctx.translate(MovableObject.width, 0);
        this.ctx.scale(-1, 1);
        MovableObject.x = MovableObject.x * -1;
        MovableObject.offset.x = 60 + MovableObject.offset.x * -1;
    };

    flipImageBack(MovableObject) {
        MovableObject.x = MovableObject.x * -1;
        MovableObject.offset.x = 60 + MovableObject.offset.x * -1;
        this.ctx.restore();
    };

    rotateImage(movableObject) {
        const { ctx } = this;
        const { x, y, width, height, rotation } = movableObject;
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(rotation);
        ctx.translate(-(x + width / 2), -(y + height / 2));
    };

    checkCollisions() {
        this.coinCollision();
        this.bottleCollection();
        this.bottleEnemyCollision();
        this.enemyCollision();
        this.endBossCollision();
    };


    coinCollision() {
        setInterval(() => {
            this.takeCoins();
        }, 10);
    };

    takeCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (sound == true) this.coin_sound.play();
                this.handleCoinCollection(coin);
            }
        })
    };

   
    handleCoinCollection(element) {
        this.ctx.clearRect(element.x, element.y, element.width, element.height);
        this.level.coins = this.level.coins.filter(coin => coin !== element);
        this.updateCharacterCoinBar(-10);
    };

    updateCharacterCoinBar(amount) {
        this.characterBars[2].percentage += amount;
        this.characterBars[2].setPercentage(this.characterBars[2].percentage);
    };

    bottleCollection() {
        setInterval(() => {
            this.collectBottles();
        }, 10);
    };

    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.throwableObjects.length < 5) {
                this.ctx.clearRect(bottle.x, bottle.y, bottle.width, bottle.height);
                if (sound) this.bottle_sound.play();
                this.level.bottles.splice(index, 1);
                this.throwableObjects.push(new ThrowableObject());
                this.characterBars[1].percentage -= 20;
                this.characterBars[1].setPercentage(this.characterBars[1].percentage);
            }
        });
    };

    bottleEnemyCollision() {
        setInterval(() => {
            this.bottleCollides();
        }, 10);
    };

    bottleCollides() {
        if (this.throwableObjects.length > 0) {
            let bottle = this.throwableObjects[0];
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && enemy instanceof Chicken) this.handleChickenHit(bottle, enemy);
            })
            if (bottle.isColliding(this.endBoss) && !this.endBoss.invincible) this.handleBossHit(bottle);
        }
    };

    handleChickenHit(bottle, enemy) {
        this.bottleBreak(bottle);
        this.chickenDies(enemy);
    };

    handleBossHit(bottle) {
        this.bottleBreak(bottle);
        this.endBoss.isHit();
        if (sound == true) this.bossHit_sound.play();
    };

    endBossCollision() {
        setInterval(() => {
            this.characterBossInteraction();
        }, 10);
    };

    /**
     * Executes the interaction between the character and the boss.
     */
    characterBossInteraction() {
        if (this.bossBehindCharacter()) {
            this.character.energy = 0;
            this.character.healthBar.setPercentage(0);
        }
        if (this.character.isColliding(this.endBoss)) {
            this.character.isHit();
            if (sound) this.hit_sound.play();
        };
    };

    /**
     * Checks if the boss went past the character.
     */
    bossBehindCharacter() {
        return (this.endBoss.offset.x + this.endBoss.offset.width < this.character.x);
    };

    /**
    * Sets up an interval to handle character-enemy interactions.
    */
    enemyCollision() {
        setInterval(() => {
            this.handleCharacterEnemyInteractions();
        }, 10);
    };

    /**
     * Handles interactions between the character and enemies.
     */
    handleCharacterEnemyInteractions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumping && this.character.jumpingUpon(enemy) && enemy instanceof Chicken) {
                this.handleChickenInteraction(enemy);
            } else if (this.character.isColliding(enemy)) {
                this.character.isHit();
                if (sound) this.hit_sound.play();
            }
        });
    };

    /**
     * Handles the interaction with a chicken, determining if it's a chick or a regular chicken.
     */
    handleChickenInteraction(enemy) {
            this.chickenDies(enemy);
            this.character.speedY = 5;
            this.hitChicken = true;
            this.character.monitorJumpEnd();
        
    };

    /**
    * Handles the death of a chicken enemy by invoking its death method and removing it from the enemies list after a delay.
    */
    chickenDies(enemy) {
        return (enemy.chickenDead(this.level.enemies.indexOf(enemy)),
            setTimeout(() => {
                enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 1000));
    };

    /**
     * Resets the position of any surviving enemies and clouds that have moved off the screen.
     */
    resetSurvivingEntities() {
        const resetPosition = (entity) => {
            if (entity.x + entity.width < 0) {
                entity.x = 2800;
            }
        };

        [...this.level.enemies, ...this.level.clouds].forEach(resetPosition);
    };

    /**
    * Handles the breaking of a bottle by creating a splash effect, breaking the bottle, removing it from the throwable objects list, and adding a new throwable object 
    */
    bottleBreak(bottle) {
        const { x, y } = bottle;
        this.splashes.push(new Splash(x + 10, y + 30));
        bottle.break();
        this.throwableObjects = this.throwableObjects.filter(obj => obj !== bottle);
        this.throwableObjects.push(new ThrowableObject());
    };
};