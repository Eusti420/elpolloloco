class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    constructor(x, y, speed) {
        super();
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.defaul_positionY = this.y;
    }

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0)'graphics/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    };

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else  {
            return this.y < 170;
        }
       
    };


    // character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y <mo.y + mo.height;
    };

    hit() {
        this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
        
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    moveLeft() {
        this.x -= this.speed;
    };

    moveRight() {
        this.x += this.speed;
    };

    jump() {
        this.speedY = 30;
    };

 
}