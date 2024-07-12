class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -40;

    IMAGES_WALKING = [
        'graphics/4_enemie_boss_chicken/2_alert/G5.png',
        'graphics/4_enemie_boss_chicken/2_alert/G6.png',
        'graphics/4_enemie_boss_chicken/2_alert/G7.png',
        'graphics/4_enemie_boss_chicken/2_alert/G8.png',
        'graphics/4_enemie_boss_chicken/2_alert/G9.png',
        'graphics/4_enemie_boss_chicken/2_alert/G10.png',
        'graphics/4_enemie_boss_chicken/2_alert/G11.png',
        'graphics/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
         }, 150);
    }

}