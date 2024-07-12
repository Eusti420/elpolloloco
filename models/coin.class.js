class Coin extends MovableObject {

    IMAGES_COIN = [
        'graphics/8_coin/coin_1.png',
        'graphics/8_coin/coin_2.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 1500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN)
        }, 100);
    }
}