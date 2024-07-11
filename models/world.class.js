class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;
    canvas;
    keyboard;
    cloud =[
        new Clouds(),
    ];
   
    backgroundObjects = [
        new BackgroundObject('graphics/5_background/layers/air.png', 0),
        new BackgroundObject('graphics/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('graphics/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('graphics/5_background/layers/1_first_layer/1.png', 0),
        
    ];

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

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.cloud);
        this.addObjectsToMap(this.enemies);

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
            this.ctx.translate(mo.img.width, 0);
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection) {
            this.ctx.restore();
        }
    };
}