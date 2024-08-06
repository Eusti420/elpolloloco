class Clouds extends MoveableObject {
   
    constructor(position_x, position_y, speed, imagePath) {
        super(position_x, position_y, speed);
        this.loadImage(imagePath);
        this.width = 300;
        this.height = 200;
        this.animate();
    };

    animate() {
        this.moveLeft();
    };
};