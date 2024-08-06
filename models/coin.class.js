class Coin extends MoveableObject {
    height = 160;
    width = 160;
    y = 300;  
    
    IMAGES_COIN = [
        'graphics/8_coin/coin_1.png',
        'graphics/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 1800;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
         }, 400);
    }
}