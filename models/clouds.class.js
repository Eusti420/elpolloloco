class Clouds extends MovableObject {
    y = -300;
    height = 0;
    width = 0;

    constructor() {
        super().loadImage('graphics/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
       
    }
}