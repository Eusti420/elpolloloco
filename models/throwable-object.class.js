class ThrowableObject extends MovableObject {
    

    IMAGES_BOTTLE_GROUND = [
        'graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor(x, y) {
        super().loadImage('graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png'); 
        this.height = 80;
        this.width = 60;
        this.x = x;
        this.y = y;
        this.throw(100, 100);
        
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25);
    }
}