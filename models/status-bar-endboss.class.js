class StatusBarEndboss extends Statusbar {
    percentage = 100;
    height = 35;
    width = 180;
    x;

    IMAGES = [
        'graphics/7_statusbars/2_statusbar_endboss/blue/blue100.png',
        'graphics/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'graphics/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'graphics/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'graphics/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'graphics/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.y = -40;
    };
}