class Character extends MovableObject {
    height = 260;
    width = 120;
    y = 10;
    speed = 8;
    world;
    walking_sound = new Audio('audio/walking.mp3');

    IMAGES_WALKING = [
        'graphics/2_character_pepe/2_walk/W-21.png',
        'graphics/2_character_pepe/2_walk/W-22.png',
        'graphics/2_character_pepe/2_walk/W-23.png',
        'graphics/2_character_pepe/2_walk/W-24.png',
        'graphics/2_character_pepe/2_walk/W-25.png',
        'graphics/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'graphics/2_character_pepe/3_jump/J-31.png',
        'graphics/2_character_pepe/3_jump/J-32.png',
        'graphics/2_character_pepe/3_jump/J-33.png',
        'graphics/2_character_pepe/3_jump/J-34.png',
        'graphics/2_character_pepe/3_jump/J-35.png',
        'graphics/2_character_pepe/3_jump/J-36.png',
        'graphics/2_character_pepe/3_jump/J-37.png',
        'graphics/2_character_pepe/3_jump/J-38.png',
        'graphics/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'graphics/2_character_pepe/5_dead/D-51.png',
        'graphics/2_character_pepe/5_dead/D-52.png',
        'graphics/2_character_pepe/5_dead/D-53.png',
        'graphics/2_character_pepe/5_dead/D-54.png',
        'graphics/2_character_pepe/5_dead/D-55.png',
        'graphics/2_character_pepe/5_dead/D-56.png',
        'graphics/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'graphics/2_character_pepe/4_hurt/H-41.png',
        'graphics/2_character_pepe/4_hurt/H-42.png',
        'graphics/2_character_pepe/4_hurt/H-43.png',
    ];

    
    

    constructor() {
        super().loadImage('graphics/2_character_pepe/2_walk/W-21.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
     * % modulo = mathematischer Rest
     * 
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play()
            }

            if(this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft()
                this.otherDirection = true;
                this.walking_sound.play()
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

            } else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }

            else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }}, 50);

           
    };

}