class StatusBarBottle extends Statusbar {
    percentage = 100;

    IMAGES = [
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 10;
        this.y = 42;
    }

}