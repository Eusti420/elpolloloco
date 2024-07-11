class Character extends MovableObject {
    height = 260;
    width = 120;
    y = 170;
    IMAGES_WALKING = [
        'graphics/2_character_pepe/2_walk/W-21.png',
        'graphics/2_character_pepe/2_walk/W-22.png',
        'graphics/2_character_pepe/2_walk/W-23.png',
        'graphics/2_character_pepe/2_walk/W-24.png',
        'graphics/2_character_pepe/2_walk/W-25.png',
        'graphics/2_character_pepe/2_walk/W-26.png',
    ];

    currentImage = 0;
    
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
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
       
    }
    
    jump(){

    }
}