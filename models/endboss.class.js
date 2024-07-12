new class Endboss extends MovableObject {

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
        this.x = 700;
        
    }


}