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
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
    };

    setWorld() {
        this.character.world = this;
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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    };
}