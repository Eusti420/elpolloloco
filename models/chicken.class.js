class Chicken extends MoveableObject {
    height = 60;
    width = 60;
    y = 370;
    walking_sound = new Audio('audio/chicken.mp3');
    dying_sound = new Audio('audio/chicken_die_sound.mp3');
    
    IMAGES_WALKING = [
        'graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'graphics/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'graphics/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'graphics/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 1400;
        this.speed = 0.4 + Math.random() * 1;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
           this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

    

}