class Clouds extends MovableObject {
    y = 40;
    width = 720;
    height = 200;
   

    constructor() {
        super().loadImage('graphics/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();

    }

    animate() {
        this.moveLeft();
    }


}