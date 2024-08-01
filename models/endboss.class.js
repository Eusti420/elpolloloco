class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -40;
    x = 2500;
    hadFirstContact = false;

    IMAGES_ALERT = [
        'graphics/4_enemie_boss_chicken/2_alert/G5.png',
        'graphics/4_enemie_boss_chicken/2_alert/G6.png',
        'graphics/4_enemie_boss_chicken/2_alert/G7.png',
        'graphics/4_enemie_boss_chicken/2_alert/G8.png',
        'graphics/4_enemie_boss_chicken/2_alert/G9.png',
        'graphics/4_enemie_boss_chicken/2_alert/G10.png',
        'graphics/4_enemie_boss_chicken/2_alert/G11.png',
        'graphics/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'graphics/4_enemie_boss_chicken/1_walk/G1.png',
        'graphics/4_enemie_boss_chicken/1_walk/G2.png',
        'graphics/4_enemie_boss_chicken/1_walk/G3.png',
        'graphics/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'graphics/4_enemie_boss_chicken/3_attack/G13.png',
        'graphics/4_enemie_boss_chicken/3_attack/G14.png',
        'graphics/4_enemie_boss_chicken/3_attack/G15.png',
        'graphics/4_enemie_boss_chicken/3_attack/G16.png',
        'graphics/4_enemie_boss_chicken/3_attack/G17.png',
        'graphics/4_enemie_boss_chicken/3_attack/G18.png',
        'graphics/4_enemie_boss_chicken/3_attack/G19.png',
        'graphics/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'graphics/4_enemie_boss_chicken/4_hurt/G21.png',
        'graphics/4_enemie_boss_chicken/4_hurt/G22.png',
        'graphics/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'graphics/4_enemie_boss_chicken/5_dead/G24.png',
        'graphics/4_enemie_boss_chicken/5_dead/G25.png',
        'graphics/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        let i = 0
        
        setInterval(() => {

            if (i < 10) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
            i++;

            if (world.character.x > 2200 && !hadFirstContact) {
                i = 0;
                hadFirstContact = true;
            }
         }, 150);

         console.log('play Animation', );
    };

}