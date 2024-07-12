class Character extends MovableObject {
    height = 260;
    width = 120;
    y = 170;
    speed = 8;
    IMAGES_WALKING = [
        'graphics/2_character_pepe/2_walk/W-21.png',
        'graphics/2_character_pepe/2_walk/W-22.png',
        'graphics/2_character_pepe/2_walk/W-23.png',
        'graphics/2_character_pepe/2_walk/W-24.png',
        'graphics/2_character_pepe/2_walk/W-25.png',
        'graphics/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage('graphics/2_character_pepe/2_walk/W-21.png'); 
        this.loadImages(this.IMAGES_WALKING);
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
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play()
            }

            if(this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play()
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {

            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
       
    }
    
    jump(){

    }
}