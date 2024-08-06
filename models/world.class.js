/**
 * world class where are all necessary objects are implicated which are relevant for the game experience
 * constructor loads the canvas element and 
 */
class World {
    character = new Character();
    characterBars = [
        new StatusBarHealth(10),
        new StatusBarBottle(),
        new StatusBarCoin()
    ];
    bossHealthBar = new StatusBarEndboss(2800);
    endBoss = new Endboss();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwing_sound = new Audio('audio/throwing_sound.mp3');
    throwableObject = [];
    splashes = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    setWorld() {
        this.character.world = this;
        this.character.healthBar = this.characterBars[0];
        this.endBoss.world = this;
        this.endBoss.healthBar = this.bossHealthBar;
    };
   
    throwing_sound() {

    };

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObject();
        }, 200);
    };

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.character.healthBar.setPercentage(this.character.energy);
            }
        });
    };

    checkThrowObject() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            if (sound == true) {
                this.throwing_sound.volume = 1;
                this.throwing_sound.loop = false;
                this.throwing_sound.play();
            }

            setTimeout(() => {
                this.throwing_sound.pause();
                this.throwing_sound.currentTime = 0;
            }, 1000);
            
        };
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addBackgroundsAndCollectables();
        this.drawEnemies();
        
        
        this.ctx.translate(-this.camera_x, 0);
        this.addBarsToCanvas();
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => {
            this.draw();
        });
    };



    addBarsToCanvas() {
        this.addObjectsToMap(this.characterBars);
        this.addToMap(this.bossHealthBar);
    };

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    addBackgroundsAndCollectables() {
        const {backgroundObjects, clouds, coins, bottles} = this.level;
        this.addObjectsToMap(backgroundObjects);
        this.addObjectsToMap(clouds);
        this.addObjectsToMap(coins);
        this.addObjectsToMap(bottles);
    };

    drawEnemies() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endBoss);
    };

    addToMap(mo) {
        if (mo.otherDirection) {
            this.mirrorImage(mo);
        } 
            mo.draw(this.ctx);

         if (mo.otherDirection) {
            this.reverseMirrorImage(mo);
        }
    };

    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };

    reverseMirrorImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
};