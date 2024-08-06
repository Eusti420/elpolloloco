class Clouds extends MoveableObject {
   
    constructor(x, y, speed, imagePath) {
        super(x, y, speed);
        this.loadImage(imagePath);
        this.width = 300;
        this.height = 200;
        this.animate();
    };

    animate() {
        this.moveLeft();
    };
};