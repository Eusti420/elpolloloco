class Character extends MoveableObject {
    height = 260;
    width = 120;
    y = 170;
    x = 50;
    speed = 8;
    world;
    healthBar;
    heatth_percentage;
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump_sound.mp3');
    sleeping_sound= new Audio('audio/snoring_pepe_sound.mp3');
    game_over_sound = new Audio('audio/game_over_sound.mp3');
    isJumping = false;
    isThrowing = false;
    isSleeping = false;
    canThrow = true;
    hitChicken = false;
    idleTimeout;
    sleepingTimeout = 4000;
    deadId;

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

    IMAGES_IDLE = [
        'graphics/2_character_pepe/1_idle/idle/I-1.png',
        'graphics/2_character_pepe/1_idle/idle/I-2.png',
        'graphics/2_character_pepe/1_idle/idle/I-3.png',
        'graphics/2_character_pepe/1_idle/idle/I-4.png',
        'graphics/2_character_pepe/1_idle/idle/I-5.png',
        'graphics/2_character_pepe/1_idle/idle/I-6.png',
        'graphics/2_character_pepe/1_idle/idle/I-7.png',
        'graphics/2_character_pepe/1_idle/idle/I-8.png',
        'graphics/2_character_pepe/1_idle/idle/I-9.png',
        'graphics/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEPING = [
        'graphics/2_character_pepe/1_idle/long_idle/I-11.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-12.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-13.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-14.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-15.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-16.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-17.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-18.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-19.png',
        'graphics/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    
    

    constructor() {
        super().loadImage('graphics/2_character_pepe/2_walk/W-21.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_IDLE);
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
                if (sound == true) {
                    this.jumping_sound.volume = 0.8;
                    this.jumping_sound.loop = false;
                    this.jumping_sound.play();
                }

                setTimeout (() => {
                    this.walking_sound.pause();
                    this.jumping_sound.pause();
                    this.jumping_sound.currentTime = 0;
                }, 1000);
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