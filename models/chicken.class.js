class Chicken extends MoveableObject {
    offsetY;
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

    constructor(i) {
        super().loadImage('graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.height = 50;
        this.width = 50;
        this.y = 395;
        this.offsetY = this.y;
        this.x = (Math.random() * 700 + 300) * i + 300;
        this.speed = 0.5 + Math.random() * 1.5;
        this.loadImages(this.IMAGES_WALKING);
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

    chickenOffset() {
        this.offset = {
            width: 50,
            height: 50,
            x: this.x,
            y: this.offsetY
        };
    };

}