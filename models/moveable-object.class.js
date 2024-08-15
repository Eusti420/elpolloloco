class MoveableObject extends DrawableObject {
    otherDirection = false;
    accelearion = 1;
    energy = 100;
    gotHurt = false;
    speedY = 0;
    gravityId;
    lastHit;

    /**
     * Initializes a new instance of the constructor.
     *
     * @param {type} x - the x value
     * @param {type} y - the y value
     * @param {type} speed - the speed value
     */
    constructor(x, y, speed) {
        super();
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.default_positionY = this.y;
    };

    /**
     * Animate the element.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    };

    /**
     * Plays an animation using the provided image array.
     */
    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.world.keyboard.KEY_LEFT = false;
    };

    /**
     * Moves the object to the left by decreasing its x-coordinate by the current speed.
     */
    moveLeft() {
        this.x -= this.speed;
    };

    /**
     * Apply gravity to the object.
     *
     * This function applies a gravitational force to the object to simulate its
     * movement in a downward direction. It starts an interval that calls the
     * "this.gravityInterval" function every 1/60th of a second.
     */
    applyGravity() {
        this.gravityId = interval.call(this, this.gravityInterval, 1000 / 60)
    };

    /**
     * Updates the position of the object based on gravity.
     */
    gravityInterval() {
        if (this.isAboveGround(this.default_positionY) || this.speedY > 0) this.keepFalling();
        if (!this.isAboveGround(this.default_positionY)) {
            this.y = this.default_positionY;
            if (this instanceof ThrowableObject) {
                clearInterval(intervalIds.splice(intervalIds.indexOf(this.gravityId), 1))
            } else {
                this.stopFalling();
                if (this instanceof Character) {
                    this.isJumping = false;
                    this.hitChicken = false;
                }
            }
        }
    };

    /**
     * Decreases the y-coordinate of the object based on its speed and acceleration.
     */
    keepFalling() {
        this.y -= this.speedY;
        this.speedY -= this.accelearion;
    };

    /**
     * Stops the falling motion of the object.
     */
    stopFalling() {
        this.speedY = 0;
    };

    /**
     * Check if the object is above the ground.
     */
    isAboveGround(default_positionY) {
        return this.y <= default_positionY;
    };

    /**
     * Checks if this object is colliding with another object.
     *
     * @param {Object} obj - The object to check collision with.
     * @return {boolean} Returns true if there is a collision, false otherwise.
     */
    isColliding(obj) {
        return (
            this.offset.x + this.offset.width > obj.offset.x
            && this.offset.x <= obj.offset.x + obj.offset.width
            && this.offset.y + this.offset.height > obj.offset.y
            && this.offset.y <= obj.offset.y + obj.offset.height
        );
    };

    /**
     * Checks if the object is being jumped upon.
     */
    jumpingUpon(obj) {
        return (
            this.speedY <= 0
            && this.offset.y + this.offset.height > obj.offset.y
            && this.offset.x + this.offset.width > obj.offset.x
            && this.offset.x < obj.offset.x + obj.offset.width
        )
    };

    /**
     * Checks if the entity is hit.
     */
    isHit() {
        if (this.gotHurt) {
            return;
        } else if (!this.gotHurt) {
            this.health_percentage = this.energy -= 20;
            this.gotHurt = true;
            this.triggerDamageResponse();
            if (this instanceof Character) {
                this.refreshIdleTimer();
            }
            if (this.energy <= 0) {
                this.healthBar.setPercentage(0);
            }
        }
    };

    /**
    * Stops the given music by pausing it, resetting its current time, and disabling looping.
    * 
    * @param {HTMLAudioElement} music - The music to be stopped.
    */
    stopMusic(music) {
        music.pause();
        music.currentTime = 0;
        music.loop = false;
    };

    /**
    * Checks if the character is dead based on their energy level.
    * 
    * @returns {boolean} True if the character's energy is 0 or less, otherwise false.
    */
    isDead() {
        return this.energy <= 0;
    };

    /**
     * Triggers the damage response animation if the object is not dead.
     */
    triggerDamageResponse() {
        if (!this.isDead()) {
            this.lastHit = new Date().getTime();
            this.initiateDamageAnimation();
        }
    };

    /**
     * Initiates the damage response animation.
     */
    initiateDamageAnimation() {
        this.hurt_interval = setInterval(() => {
            this.refreshHealthbar();
            if (this.passedTime(this.lastHit)) {
                this.resetHurtState();
                if (this instanceof Endboss) {
                    if (this.energy == 160) this.attack();
                    else if (this.energy == 99) this.attack();
                    else if (this.energy == 38) this.attack();
                    else { this.monitorAngryCharacter() };
                }
            }
        }, 1000 / 25);
    };

    /**
    * Refreshes the health bar by playing the hurt animation and updating the health bar percentage.
    */
    refreshHealthbar() {
        this.playAnimation(this.IMAGES_HURT);
        this.healthBar.setPercentage(this.health_percentage);
    };

    /**
     * Stops the object from taking damage and resets the hurt state.
     */
    resetHurtState() {
        clearInterval(this.hurt_interval);
        this.gotHurt = false;
    };

    /**
    * Performs an attack by reducing energy, clearing all intervals, and initiating a jump.
    */
    attack() {
        this.energy -= 1;
        this.clearAllIntervals();
        this.jump();
    };

    /**
     * Calculates the time passed since the given time in milliseconds.
     *
     * @param {number} time - The starting time in milliseconds.
     * @return {boolean} True if the time passed is greater than 1.5 seconds, false otherwise.
     */
    passedTime(time) {
        let passedTime = new Date().getTime() - time;
        passedTime = passedTime / 1000;
        return (passedTime > 1.5)
    };
};