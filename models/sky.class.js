class Sky extends MoveableObject {
    constructor(position_x, position_y) {
        super(position_x, position_y);
        this.loadImage('graphics/5_background/layers/air.png');
        this.width = 721;
        this.height = 480;
    };
};