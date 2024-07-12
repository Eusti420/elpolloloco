class Coin extends MovableObject {
    height = 100;
    width = 100;
    y = 340;  
    
    IMAGES_WALKING = [
        'graphics/8_coin/coin_1.png',
        'graphics/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
         }, 100);
    }
}