/**
 * world class where are all necessary objects are implicated which are relevant for the game experience
 * constructor loads the canvas element and 
 */
class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    throwableObject = [];
    

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
    }

    run() {
        setInterval(() => {

            this.checkCollision();
            this.checkThrowObject();
        }, 200);
    };

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit()
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowObject() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle);
        }
    }

/**
 * function draw, creates / "draws" the elements which are added to the game world,
 * inside the class World and calls the necessary functions
 */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.cloud);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => {
            this.draw();
        })
    };

    /**
     * addObjectsToMap() auxiliary function creating forEach loops for the different objects
     * @param {*} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    /**
     * addToMap() auxiliary function which draws the objects and the parameters are given inside, for positioning 
     * @param {*} mo 
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.mirrorImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.reverseMirrorImage(mo);
        }
    };

    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    reverseMirrorImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}